import React, { Component } from 'react';

import DataTable from '../DataTable.js';
import NumberFormat from '../NumberFormat.js';
import DateFormat from '../DateFormat.js';

class TransactionTable extends Component {
	
	state = {}
	
	constructor(props) {
		super(props);
		
		this.state.transactions = props.transactions;
	}
	
	render() {
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
			clickFunction: transaction => console.log(transaction.asset.name)
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
			displayFunction: transaction => DateFormat({"date": new Date(transaction.tradeDate)}),
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
			headerClassName: "dt-head-right",
			sortable: true,
			initialSorted: false,
			displayFunction: transaction => transaction.currency.symbol + transaction.price,
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
			displayFunction: transaction => NumberFormat({"value": transaction.trnAmount, "places": 2, "prefix": transaction.currency.symbol}),
			sorter: (a, b) => a.trnAmount - b.trnAmount,		//Sort is the same as above
			style: {
				width: "108px",
				"textAlign": "right"
			}
		});
			
		return (
			<div id="transactions">
			<DataTable id="detailsTable" data={this.state.transactions} columns={columns} className="transactions dataTable no-footer" />	
			</div>
		);
	}
}

export default TransactionTable;