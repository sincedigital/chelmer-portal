import React, { Component } from 'react';
import Remote from './Remote.js';

import './PortfolioTabs.css';

class PortfolioTabs extends Component {
	
	state = {};
	constructor(props) {
		super(props);
		this.state.selected = Remote.getCurrentPortfolio();
		
		this.switchPortfolio = this.switchPortfolio.bind(this)
	}
	
	switchPortfolio(code) {
		this.setState({"selected": code});
	}
	
	render() {
		const portfolioCache = Remote.getAvailablePortfolios();
		const currentPortfolio = this.state.selected;
		
		return (<ul className="PortfolioTabs">
		{ 
        	Object.keys(portfolioCache).map((key) => {
        		const portfolio = portfolioCache[key];
        		/*jslint eqeq: true */
        		const className = portfolio.portfolioCode == currentPortfolio ? "Selected" : "";
	        	return (<li key={key} className={className} onClick={e=>this.switchPortfolio(portfolio.portfolioCode)}>{portfolio.portfolioCode}</li>);
	        })
        }
		</ul>); 
	}
}

export default PortfolioTabs;