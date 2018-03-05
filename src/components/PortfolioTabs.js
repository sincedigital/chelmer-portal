import React, { Component } from 'react';
import Remote from './Remote.js';

import './PortfolioTabs.css';

class PortfolioTabs extends Component {
	
	state = {
		calculatedWidth: "100%",
		clientPortfolios: null,
		volatileUpdate: false
	};
	
	tabs = [];
	
	constructor(props) {
		super(props);
		this.state.selected = Remote.getCurrentPortfolio();

		
		this.switchPortfolio = this.switchPortfolio.bind(this)
		this.acceptClientPortfolios = this.acceptClientPortfolios.bind(this);
		this.portfolioName = this.portfolioName.bind(this);
		this.componentDidUpdate = this.componentDidUpdate.bind(this);

		Remote.getClientPortfolios(this.acceptClientPortfolios, ()=>{}, ()=>{});
	}
	
	acceptClientPortfolios(data) {		
		const map = new Map();
		data.map(portfolio=>{
			map.set(portfolio.code, portfolio.name);
		});
		this.setState({"clientPortfolios": map, volatileUpdate: true});
	}
	
	switchPortfolio(code) {
		this.setState({"selected": code});
		Remote.setCurrentPortfolio(code);
		this.props.onUpdate();
	}
	
	componentDidMount() {
		const containerWidth = this.container.getBoundingClientRect().width;
		var inner = 0;
		var selectedx1 = 0, selectedx2 = 0;
		this.tabs.map(el=>{
			const selected = el.classList.contains("Selected");
			if (selected)
				selectedx1 = inner;
			inner+=el.getBoundingClientRect().width;
			if (selected)
				selectedx2 = inner;
		});
		
		//Also check the current one is scrolled into view
			
		if (containerWidth < inner) {
			this.setState({calculatedWidth: inner, volatileUpdate: false});
			setTimeout(()=>{if (this.container) this.container.scrollLeft = selectedx1 - 40;}, 400);
		}	
	}
	
	componentDidUpdate() {
		if (this.state.volatileUpdate) {
			this.componentDidMount();
		}
	}
	
	portfolioName(code) {
		if (this.state.clientPortfolios) {
			const name = this.state.clientPortfolios.get(code);
			if (name)
				return name;
		}
		return code;
	}
	
	render() {
		this.tabs = [];

		const portfolioCache = Remote.getAvailablePortfolios();
		const currentPortfolio = this.state.selected;
		const containerClassName = "PortfolioTabsContainer" + (this.state.calculatedWidth !== "100%" ? "" : " NoScroll");
		
		return (<div className="PortfolioTabsOuter" id="PortfolioTabs"><div className={containerClassName} ref={el=>{this.container = el;}}>
			<ul className="PortfolioTabs" style={{width: this.state.calculatedWidth}}>
		{ 
        	Object.keys(portfolioCache).map((key) => {
        		const portfolio = portfolioCache[key];
        		/*jslint eqeq: true */
        		const className = portfolio.portfolioCode == currentPortfolio ? "Selected" : "";
	        	return (<li ref={el=>{if (el != null) this.tabs.push(el);}} key={key} className={className} onClick={e=>this.switchPortfolio(portfolio.portfolioCode)}>{this.portfolioName(portfolio.portfolioCode)}</li>);
	        })
        }
		</ul></div></div>); 
	}
}

export default PortfolioTabs;