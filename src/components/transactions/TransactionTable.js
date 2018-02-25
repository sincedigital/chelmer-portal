import React, { Component } from 'react';

import windowSize from 'react-window-size';
import DataTable from '../DataTable.js';
import NumberFormat from '../NumberFormat.js';
import DateFormat from '../DateFormat.js';

import './TransactionTable.css';

class TransactionTable extends Component {
	
	state = {}
	
	constructor(props) {
		super(props);
		
		this.state.transactions = props.transactions;
	}
	
	componentWillReceiveProps(props) {
		this.setState({"transactions": props.transactions});
	}

	unicodeCheck(str) {
		return str.replace(/\\u(\w\w\w\w)/g,function(a,b) {
		    var charcode = parseInt(b,16);
		    return String.fromCharCode(charcode);
		  });
	}
	
	render() {
		if (this.props.windowWidth <= 712) {
			return (<div className="Transactions">
				{
					this.state.transactions.map((transaction, index)=>(<div className="Transaction" key={index}>
							<div className="TransactionDate"><DateFormat date={new Date(transaction.tradeDate.substring(0, 10))} /></div>
							<div className="TransactionAmount"><NumberFormat value={transaction.trnAmount} places={2} prefix={transaction.currency.isoCode + " " + transaction.currency.symbol} /></div>
							<div className="TransactionAccount">{transaction.asset.name}</div>
							<div className="TransactionType"><i className="fas fa-angle-double-right"></i>{transaction.trnType.name}</div>
							<div className="TransactionStatus"><i className={transaction.trnStatus.name === "Settled" ? "far fa-folder" : "far fa-folder-open"}></i>{transaction.trnStatus.name}</div>
							<div className="TransactionUnitCost"><i className="fas fa-tags"></i>{transaction.currency.symbol + transaction.price}</div>
					</div>))
				}
			</div>);
		}
		
		const columns = [];
		
		//Name
		columns.push({
			header: "ASSET NAME",
			sortable: true,
			initialSorted: false,
			displayFunction: transaction => transaction.asset.name,
			sorter: (a, b) => a.asset.name.localeCompare(b.asset.name),
			style: {
				width: "678px"
			},
			className: transaction => transaction.documents.length > 0 ? "WithDocument" : "",
			clickActive: transaction => transaction.documents.length > 0,
			clickFunction: transaction => window.open(transaction.documents[0].path)
		});
	
		//Type
		columns.push({
			header: "TYPE",
			sortable: true,
			initialSorted: false,
			displayFunction: transaction => transaction.trnType.name,
			sorter: (a, b) => a.trnType.name.localeCompare(b.trnType.name),
			style: {
				width: "100px"
			}
		});

		//Status
		columns.push({
			header: "STATUS",
			sortable: true,
			initialSorted: false,
			displayFunction: transaction => transaction.trnStatus.name,
			sorter: (a, b) => a.trnStatus.name.localeCompare(b.trnStatus.name),
			style: {
				width: "100px"
			}
		});
		
		//Date
		columns.push({
			header: "DATE",
			sortable: true,
			initialSorted: true,
			displayFunction: transaction => DateFormat({"date": new Date(transaction.tradeDate.substring(0, 10))}),
			sorter: (a, b) => b.tradeDate.localeCompare(a.tradeDate),
			style: {
				width: "100px",
				whiteSpace: "nowrap",
				textAlign: "right"
			}
		});
		
		//Currency
		columns.push({
			header: "",
			sortable: false,
			initialSorted: false,
			displayFunction: transaction => transaction.currency.isoCode,
			sorter: (a, b) => a.currency.isoCode.localeCompare(b.currency.isoCode),
			style: {
				width: "60px"
			}
		});

		//Price
		columns.push({
			header: "UNIT PRICE",
			headerClassName: "dt-head-right dt-nowrap",
			sortable: true,
			initialSorted: false,
			displayFunction: transaction => this.unicodeCheck(transaction.currency.symbol) + transaction.price,
			sorter: (a, b) => a.price - b.price,
			style: {
				width: "80px",
				"textAlign": "right"
			}
		});
			
		//Amount
		columns.push({
			header: "AMOUNT",
			headerClassName: "dt-head-right",
			sortable: true,
			initialSorted: false,
			displayFunction: transaction => NumberFormat({"value": transaction.trnAmount, "places": 2, "prefix": this.unicodeCheck(transaction.currency.symbol)}),
			sorter: (a, b) => a.trnAmount - b.trnAmount,		//Sort is the same as above
			style: {
				width: "108px",
				"textAlign": "right"
			}
		});
			
		return (
			<div id="transactions">
			<DataTable id="detailsTable" data={this.state.transactions} columns={columns} className="transactions dataTable no-footer light" />	
			</div>
		);
	}
}

export default windowSize(TransactionTable);