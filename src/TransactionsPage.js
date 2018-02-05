import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Modal from './components/Modal.js';

import DateFormat from './components/DateFormat.js';

import Navigation from './components/Navigation.js';
import Loading from './components/Loading.js';
import Footer from './components/Footer.js';
import Remote from './components/Remote.js';
import { Portfolios } from './components/Constants.js';

import DateFilters from './components/DateFilters.js';

import NoTransactions from './components/transactions/NoTransactions.js';
import TransactionTable from './components/transactions/TransactionTable.js';

import './App.css';

class TransactionsPage extends Component {

	state = {
			loading: true,
			timeout: false,
			loginRequired: false,
			showDates: false,
			transactions: []
	};
	
	constructor(props) {
		super(props);

		this.state.endDate = new Date();
		var date = new Date();
		date.setMonth(date.getMonth()-6);
		this.state.startDate = date;
		
		this.acceptTransactions = this.acceptTransactions.bind(this);
		this.toDateRange = this.toDateRange.bind(this);
		this.toRelativeDate = this.toRelativeDate.bind(this);
		this.toDate = this.toDate.bind(this);
		this.toggleDates = this.toggleDates.bind(this);
		
		this.toDateRange(this.state.startDate, this.state.endDate, true);
	}
	
	toDateRange(start, end, initial) {
		if (!initial) {
			const state = {
				"startDate": start,
				"endDate": end,
				"loading": true,
				"showDates": false
			}
			this.setState(state);
		}
		
		Remote.getTransactions(
			Portfolios[0].portfolio, 
			start.toISOString().substring(0, 10),
			end.toISOString().substring(0, 10),
			this.acceptTransactions,
			()=>{this.setState({loginRequired: true})},
			()=>{this.setState({"timeout": true})}
		);
	}
	
	acceptTransactions(data) {
		console.log(data);
		this.setState({"transactions": data.data, "loading": false, "timeout": false});
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
	
	render() {
		  if (this.state.loginRequired) {
			  return (<Redirect to={this.props.match.url} />);
		  }

	    return (
	      <div className="App">
	        <Navigation url={this.props.match.url} />
	        <div className="main-content-section">
	        	{ this.state.loading === true && this.state.timeout === false ? <Loading /> : null }
	            <div className="hero-wrap">
	            <div className="main-content">
	              <div className="div-block w-clearfix">
	                <div className="text-block">NZD</div>
	              </div>
	              <p className="subhead-1"><strong className="bold-text"><span id="date"><DateFormat fullMonthName={true} date={this.state.startDate} /> - <DateFormat fullMonthName={true} date={this.state.endDate} /></span> <i id="dateHandler" className="far fa-calendar-alt padding10l" aria-hidden="true" onClick={this.toggleDates}></i></strong> </p>
	              <DateFilters showing={this.state.showDates} onRelative={this.toRelativeDate} onAbsolute={this.toDate} range={true} relativePrefix="last " header="View transactions for" />
	              { this.state.transactions.length === 0 ? <NoTransactions /> : <TransactionTable transactions={this.state.transactions} />}
	            </div>
	          </div>
	        </div>
	        <Footer />
	        <Modal showing={this.state.timeout} allowNavigation={true}>
	        	<h1>Could not contact Chelmer</h1>
	        	<p>The Chelmer portal is currently down, so we are unable to retrieve your portfolio information.  Please try again later.</p>
	        </Modal>
	      </div>
	    );
  }
}

export default TransactionsPage;