import React from 'react';
import NumberFormat from 'react-number-format';
import { Palette } from '../Constants.js';

const PortfolioMarket = (props) => {
	const part = props.data;
	var index = props.index;
	var className="portfolio-row";
	if (part.expanded) {
		className += " expanded";
	}

	const size = Palette.length;
	index = index % size;

	var relativeWidth = part.percentage / (part.maxPercentage+15) * 100;

	return (
		<div className={className} data-key={part.name}>
		 <span className="portfolio-row-name">{part.name}</span>
		 <span className="portfolio-row-amount"><NumberFormat value={part.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /></span>
		 <span className="portfolio-row-bar">
		 	<span className="bar" style={{"background-color": Palette[index], "width": relativeWidth.toFixed(1) + "%"}} ></span>
		 	<span className="portfolio-row-bar-perc"><NumberFormat value={part.percentage} displayType={'text'} suffix={'%'} decimalScale={1} fixedDecimalScale={true} /></span>
		 </span>
		</div>
	);	
}

export default PortfolioMarket