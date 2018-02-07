import React, { Component } from 'react';
import NumberFormat from '../NumberFormat.js';
import { Palette, Markets } from '../Constants.js';
import MarketTable from './MarketTable.js';

import './PortfolioMarket.css';

class PortfolioMarket extends Component {
	
	state = {}
	
	constructor(props) {
		super(props);
		
		this.toggleDetails = this.toggleDetails.bind(this);
		this.state.expanded = this.props.data.expanded;
		
		this.state.performance = props.performance;
	}
	
	componentWillReceiveProps(props) {
		this.setState({"performance": props.performance});
	}
	
	toggleDetails() {
		var expanded = this.state.expanded;
		expanded = !expanded;
		this.setState({"expanded": expanded});
	}
 	
	render() {
		const part = this.props.data;
		var index = this.props.index;
		var className="portfolio-row";
		if (part.expanded) {
			className += " expanded";
		}
	
		const size = Palette.length;
		index = index % size;
	
		var relativeWidth = part.percentage / (part.maxPercentage+15) * 100;
	
		return (
			<div>	
			<div className={className} data-key={part.name} data-colour-index={index} onClick={this.toggleDetails}>
			 <span className="portfolio-row-name">{Markets[part.name]}</span>
			 <span className="portfolio-row-amount"><NumberFormat value={part.amount} places={0} prefix={'$'} /></span>
			 <span className="portfolio-row-bar">
			 	<span className="bar" style={{"backgroundColor": Palette[index], "width": relativeWidth.toFixed(1) + "%"}} ></span>
			 	<span className="portfolio-row-bar-perc"><NumberFormat value={part.percentage} suffix={'%'} places={1} /></span>
			 </span>
			</div>
			{ this.state.expanded ? (<MarketTable data={this.props.data} barColour={Palette[index]} performance={this.state.performance} />) : null }
			</div>
		);
	}
}

export default PortfolioMarket;