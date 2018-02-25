import React, { Component } from 'react';
import windowSize from 'react-window-size';

import Modal from '../Modal.js';
import DataTable from '../DataTable.js';
import NumberFormat from '../NumberFormat.js';
import HoldingPerformance from './HoldingPerformance.js';

import './MarketTable.css';

class MarketTable extends Component {
	
	state = {
			details: false,
			modalContent: ''
	}
	
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
	
		//Set the initial state in case it wasn't expanded (then it won't get prop updates)
		this.state.performance = props.performance;
	}
		
	
	componentWillReceiveProps(props) {
		this.setState({"performance": props.performance});
	}

	/**
	 * Show the currentprice, with a comparison arrow based on the cost price
	 */
	showChange(costPrice, currentPrice) {
		var iconClass;
		var color;
		if (currentPrice >= costPrice) {
			iconClass = "fas fa-play fa-rotate-270";
			color = "green";
		} else {
			iconClass = "fas fa-play fa-rotate-90";
			color = "red";
		}
		return (<div><NumberFormat value={currentPrice} places={2} prefix="$" />&nbsp;<i style={{color: color, fontSize: "10px"}} className={iconClass}></i></div>);
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
		
		const thespan = (<div>{percentage.toFixed(2)}%<span className="bar small" style={{"marginLeft": "10px", "backgroundColor": barColour, "width": relativeWidth+'%'}}></span></div>);
		
		return thespan;
	}
	
	render() {
		
		const part = this.props.data;
		
		const data = part.holdings;

		if (this.props.windowWidth <= 712) {
			return (<div className="Funds">
			{
				data.map((holding, index)=>{
					return (
						<div className="Fund" key={index}>
							<div className="FundName">{holding.name}</div>
							<div className="FundValue"><NumberFormat value={holding.value} places={2} prefix="$" /></div>
							<div className="FundBuy"><i className="fas fa-tags"></i><NumberFormat value={holding.costPrice} places={2} prefix="$" /></div>
							<div className="FundSell"><i className="fas fa-dollar-sign"></i>{this.showChange(holding.costPrice, holding.currentPrice)}</div>
							<div style={{"clear": "both"}}></div>
							<div className="FundPercentage">{this.createBar(holding.value)}</div>
						</div>
					);
				})
			}
			</div>);
		} else {
			
			const columns = [];
			
			//Name
			columns.push({
				header: "ASSET NAME",
				sortable: true,
				initialSorted: true,
				displayFunction: holding => holding.name,
				sorter: (a, b) => a.name.localeCompare(b.name),
				style: {
					width: "578px"
				},
				clickFunction: holding => {this.setState({details: true, name: holding.name, modalContent: (<p>Details to be loaded from API</p>)});}
			});
		
			//Current
			columns.push({
				header: "CURRENT (NZD)",
				headerClassName: "dt-head-right dt-nowrap",
				sortable: true,
				initialSorted: false,
				displayFunction: holding => (<NumberFormat value={holding.value} places={2} prefix="$" />),
				sorter: (a, b) => a.value - b.value,
				style: {
					width: "160px",
					"textAlign": "right"
				}
			});
				
	/*		//Performance
			columns.push({
				header: "PERFORMANCE",
				headerClassName: "dt-head-right",
				sortable: false,
				initialSorted: false,
				displayFunction: holding => (<HoldingPerformance holding={holding} performance={this.state.performance} />),
				style: {
					"width": "380px"
				}
			});*/
			
			columns.push({
				header: "COST PRICE",
				headerClassName: "dt-head-right dt-nowrap",
				sortable: true,
				initialSorted: false, 
				displayFunction: holding => (<NumberFormat value={holding.costPrice} places={2} prefix="$" />),
				sorter: (a, b) => a.costPrice - b.costPrice,
				style: {
					width: "100px",
					"textAlign": "right"
				},
				clickFunction: holding => {this.setState({details: true, name: holding.name, modalContent: (<HoldingPerformance holding={holding} performance={this.state.performance} />)});}
			});
	
			columns.push({
				header: "CURRENT PRICE",
				headerClassName: "dt-head-right dt-nowrap",
				sortable: true,
				initialSorted: false, 
				displayFunction: holding => this.showChange(holding.costPrice, holding.currentPrice),
				sorter: (a, b) => a.currentPrice - b.currentPrice,
				style: {
					width: "100px",
					"textAlign": "right"
				},
				clickFunction: holding => {this.setState({details: true, name: holding.name, modalContent: (<HoldingPerformance holding={holding} performance={this.state.performance} />)});}
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
				<DataTable id="detailsTable" data={data} columns={columns} className="dataTable no-footer light" />	
				{ this.state.details ? (<Modal shouldCloseOnOverlayClick={true} onRequestClose={() => this.setState({details : false})} showing={this.state.details} allowNavigation={true}>
	        	<h1 onClick={() => this.setState({details : false})}>{this.state.name}</h1>
	        	{this.state.modalContent}
	        	</Modal>) : null }
						
					
				</div>
		        
			);
		}
	}
}

export default windowSize(MarketTable);