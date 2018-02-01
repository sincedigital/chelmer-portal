import React, { Component } from 'react';

import DataTable from '../DataTable.js';
import NumberFormat from '../NumberFormat.js';

class MarketTable extends Component {
	
	state = {}
	
	constructor(props) {
		super(props);
		
		this.state.data = this.props.data;
		this.createBar = this.createBar.bind(this);
		this.calculatePercentage = this.calculatePercentage.bind(this);
		
		//Work out the max percentage
		var maxPercentage = 0;
		this.props.data.holdings.map(holding=>{
			maxPercentage = Math.max(maxPercentage, this.calculatePercentage(holding.value));
			return 0;
		});
		
		this.maxPercentage = maxPercentage * 2;
	}		
	
	formatDollars(amount) {
		/*
		amount = amount || 0;
		var dollars = amount.toFixed(2) + "";
		
		var index = dollars.indexOf(".");
		for (var i = index-3; i>0; i-=3) {
			dollars = dollars.substring(0, i) + "," + dollars.substring(i); 
		}
		
		return "$" + dollars;
		*/
		return NumberFormat({"value": amount, "places": 2, prefix: "$"});
	}
	
	calculatePercentage(amount) {
		const part = this.props.data;
		const partPercentage = part.percentage;
		const partAmount = part.amount;

		return amount / partAmount * partPercentage;

	}
	createBar(amount) {
		const percentage = this.calculatePercentage(amount);
		
		const relativeWidth = percentage / this.maxPercentage * 100;
		const barColour = this.props.barColour;
		
		console.log("Bar colour is " + this.props.barColour);
		
		const thespan = (<div>{percentage.toFixed(2)}%<span className="bar" style={{"marginLeft": "10px", "backgroundColor": barColour, "width": relativeWidth+'%'}}></span></div>);
		
		return thespan;
	}
	
	render() {
		const part = this.props.data;
				
		const data = part.holdings;
		
		const columns = [];
		
		//Name
		columns.push({
			header: "ASSET NAME",
			sortable: true,
			initialSorted: true,
			displayFunction: holding => holding.name,
			sorter: (a, b) => a.name.localeCompare(b.name),
			style: {
				width: "878px"
			}
		});
	
		//Current
		columns.push({
			header: "CURRENT (NZD)",
			headerClassName: "dt-head-right",
			sortable: true,
			initialSorted: false,
			displayFunction: holding => this.formatDollars(holding.value),
			sorter: (a, b) => a.value - b.value,
			style: {
				width: "260px",
				"textAlign": "right"
			}
		});
			
		//Percentage
		columns.push({
			header: "% OF PORTFOLIO",
			sortable: true,
			initialSorted: false,
			displayFunction: holding => this.createBar(holding.value),
			sorter: (a, b) => a.value - b.value,		//Sort is the same as above
			style: {
				width: "278px"
			}
		});
			
		return (
			<div>
			<DataTable id="detailsTable" data={data} columns={columns} className="dataTable no-footer" />	
			</div>
		);
	}
}

export default MarketTable;