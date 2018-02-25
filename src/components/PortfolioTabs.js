import React, { Component } from 'react';
import Remote from './Remote.js';

import './PortfolioTabs.css';

class PortfolioTabs extends Component {
	
	state = {
		calculatedWidth: "100%"	
	};
	
	tabs = [];
	
	constructor(props) {
		super(props);
		this.state.selected = Remote.getCurrentPortfolio();
		
		this.switchPortfolio = this.switchPortfolio.bind(this)

	}
	
	switchPortfolio(code) {
		this.setState({"selected": code});
	}
	
	componentDidMount() {
		const containerWidth = this.container.getBoundingClientRect().width;
		var inner = 0;
		this.tabs.map(el=>inner+=el.getBoundingClientRect().width);
		if (containerWidth < inner)
			this.setState({calculatedWidth: inner});
	}
	
	render() {
		const portfolioCache = Remote.getAvailablePortfolios();
		const currentPortfolio = this.state.selected;
		
		return (<div className="PortfolioTabsOuter"><div className="PortfolioTabsContainer" ref={el=>{this.container = el;}}>
			<ul className="PortfolioTabs" style={{width: this.state.calculatedWidth}}>
		{ 
        	Object.keys(portfolioCache).map((key) => {
        		const portfolio = portfolioCache[key];
        		/*jslint eqeq: true */
        		const className = portfolio.portfolioCode == currentPortfolio ? "Selected" : "";
	        	return (<li ref={el=>{this.tabs.push(el);}} key={key} className={className} onClick={e=>this.switchPortfolio(portfolio.portfolioCode)}>{portfolio.portfolioCode}</li>);
	        })
        }
		</ul></div></div>); 
	}
}

export default PortfolioTabs;