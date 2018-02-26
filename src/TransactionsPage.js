import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Modal from './components/Modal.js';

import DateFormat from './components/DateFormat.js';

import PageWrap from './components/PageWrap.js';
import Remote from './components/Remote.js';

import DateFilters from './components/DateFilters.js';

import NoTransactions from './components/transactions/NoTransactions.js';
import TransactionTable from './components/transactions/TransactionTable.js';

import Select from 'react-select';
import './components/react-select.css';

import './App.css';
import './TransactionsPage.css';

class TransactionsPage extends Component {

	state = {
			loading: true,
			timeout: false,
			loginRequired: false,
			showDates: false,
			transactions: [],
			filteredTransactions: [],
			accounts: [],
			selectedAccounts: []
	};
	
	constructor(props) {
		super(props);
		
		this.acceptTransactions = this.acceptTransactions.bind(this);
		this.toDateRange = this.toDateRange.bind(this);
		this.toRelativeDate = this.toRelativeDate.bind(this);
		this.toDate = this.toDate.bind(this);
		this.toggleDates = this.toggleDates.bind(this);
		this.filterTransactions = this.filterTransactions.bind(this);
		this.portfolioChanged = this.portfolioChanged.bind(this);
		this.load = this.load.bind(this);
		
		this.load(true);
	}

	load(initial) {
		const end = new Date();
		const start = new Date();
		start.setMonth(start.getMonth()-6);
		this.toDateRange(start, end, initial);
	}
	
	toDateRange(start, end, initial) {
		console.log(start + "-" + end);
		if (initial) {
			this.state.startDate = start;
			this.state.endDate = end;
			this.state.loading = true;
			this.state.showDates = false;
		} else {
			this.setState({
				"startDate": start,
				"endDate": end,
				"loading": true,
				"showDates": false
			});
		}
		
		Remote.getTransactions(
			start.toISOString().substring(0, 10),
			end.toISOString().substring(0, 10),
			this.acceptTransactions,
			()=>{this.setState({loginRequired: true})},
			()=>{this.setState({"timeout": true})}
		);
	}
	
	acceptTransactions(data) {
		console.log(data);
		
		//Update the accounts list
		const accounts = new Set();
		data.data.map((transaction,index)=>{
			accounts.add(transaction.asset.name);
			return null;
		});
		const accountList = [];
		accounts.forEach(a=>accountList.push(a));
		accountList.sort();

		const transactions = data.data;
		transactions.sort((a, b) => b.tradeDate.localeCompare(a.tradeDate));

		this.setState({"transactions": transactions, "loading": false, "timeout": false, "accounts": accountList, "filteredTransactions": this.applyFilter({transactions: transactions})});
	}
	
	applyFilter(data) {
		const transactions = data.transactions || this.state.transactions;
		const selectedAccounts = data.selectedAccounts === undefined ? this.state.selectedAccounts : data.selectedAccounts;
		const { accounts } = this.state;

		if (!selectedAccounts || selectedAccounts.length === 0) {
			return transactions;
		}

		const filtered = [];
		
		
		const accountSet = new Set();
		
		//Create a set of account names
		selectedAccounts.split(",").map((idx, index)=>{
			accountSet.add(accounts[idx]);
			return null;
		});
		
		console.log("Accounts by name:");
		console.log(accountSet);
		
		transactions.map((trans,index)=>{
			if (accountSet.has(trans.asset.name)) {
				filtered.push(trans);
			}
			return null;
		});
		
		console.log(filtered);
		return filtered;
	}
	
	toRelativeDate(months) {
		var start = new Date();
		start.setMonth(start.getMonth()-months);
		
		this.toDateRange(start, new Date());
	}
	
	toDate(date) {
		this.toDateRange(date[0], date[1]);
	}
	
	toggleDates() {
		this.setState({"showDates": !this.state.showDates});
	}
	
	filterTransactions(selectedAccounts) {
		this.setState({"selectedAccounts": selectedAccounts, "filteredTransactions": this.applyFilter({selectedAccounts: selectedAccounts})});
	}

	portfolioChanged() {
		this.load();
	}

	render() {
		  if (this.state.loginRequired) {
			  return (<Redirect to={this.props.match.url} />);
		  }
		  
		  const options = [];
		  this.state.accounts.map((acct,index)=>{
			 options.push({label: acct, value: index});
			 return null;
		  });
		  
	    return (
	   	  <PageWrap url={this.props.match.url} loading={this.state.loading === true && this.state.timeout === false} onPortfolioChanged={this.portfolioChanged} timeout={this.state.timeout}>
	            <div className="hero-wrap">
	            <div className="main-content">
	              <div className="div-block w-clearfix">
	                <div className="text-block">NZD</div>
	              </div>
	              <p className="subhead-1"><strong className="bold-text"><span id="date"><DateFormat fullMonthName={true} date={this.state.startDate} /> - <DateFormat fullMonthName={true} date={this.state.endDate} /></span> <i id="dateHandler" className="far fa-calendar-alt padding10l" aria-hidden="true" onClick={this.toggleDates}></i></strong> </p>
	              { this.state.transactions.length === 0 ? "" : <Select
	              	closeOnSelect={false}
	              	multi
	              	rtl={false}
	              	onChange={this.filterTransactions}
	                options={options}
	                placeholder="Filter by instrument"
	                value={this.state.selectedAccounts}
	              	simpleValue
	              	removeSelected={false}
	                /> }
	              <DateFilters showing={this.state.showDates} selectHeader="Or select range" onRelative={this.toRelativeDate} onAbsolute={this.toDate} range={true} relativePrefix="last " header="View transactions for" />
	              { this.state.filteredTransactions.length === 0 ? <NoTransactions /> : <TransactionTable transactions={this.state.filteredTransactions} />}
	            </div>
	          </div>
	      </PageWrap>
	    );
  }
}

export default TransactionsPage;