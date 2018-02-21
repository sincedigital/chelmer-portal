import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from './components/Modal.js';

import DateFormat from './components/DateFormat.js';
import NumberFormat from './components/NumberFormat.js';

import Navigation from './components/Navigation.js';
import Loading from './components/Loading.js';
import Footer from './components/Footer.js';
import Remote from './components/Remote.js';
import { ToAPIDate, PortfolioFromHoldings } from './components/Functions.js';
import PortfolioMarket from './components/portfolio/PortfolioMarket.js';
import DateFilters from './components/DateFilters.js';


import './App.css';

class PortfolioPage extends Component {

	state = {
			loading: true,
			portfolio: {
				date: new Date(),
				parts:[]
			},
			performance: {},	
			showDates: false,
			timeout: false
	};
	
	constructor(props) {
		super(props);
				
		this.toggleFilters = this.toggleFilters.bind(this);
		this.toDate = this.toDate.bind(this);
		this.toRelativeDate = this.toRelativeDate.bind(this);
		this.acceptPortfolio = this.acceptPortfolio.bind(this);
		
		this.toDate(new Date(), true);
	}

	toDate(date, initial) {
		if (!initial) {
			this.setState({"loading": true, "showDates": false});
		}
		Remote.getHoldings(
			ToAPIDate(date),
			this.acceptPortfolio,
			()=>{this.setState({loginRequired: true})},
			()=>{this.setState({"timeout": true})}
		);

	}
	
	toRelativeDate(months) {
		var date = new Date();
		date.setMonth(date.getMonth()-months);
		this.toDate(date);
	}
	
	toggleFilters() {
		this.setState({"showDates": !this.state.showDates});
	}
	
	acceptPortfolio(data) {
		const loadedPortfolio = PortfolioFromHoldings(data);
		
		this.setState({"portfolio": loadedPortfolio, "loading": false, "timeout": false, "performance": {}});

		//And now get performance data
		const date = new Date(loadedPortfolio.date);
		date.setMonth(date.getMonth()-1);
		this.loadPerformanceData(date, loadedPortfolio.date, "one");
		date.setMonth(date.getMonth()-2);
		this.loadPerformanceData(date, loadedPortfolio.date, "three");
		date.setMonth(date.getMonth()-3);
		this.loadPerformanceData(date, loadedPortfolio.date, "six");
		date.setMonth(date.getMonth()-6);
		this.loadPerformanceData(date, loadedPortfolio.date, "twelve");
		date.setMonth(date.getMonth()-12);
		this.loadPerformanceData(date, loadedPortfolio.date, "twentyfour");
		date.setMonth(date.getMonth()-12);
		this.loadPerformanceData(date, loadedPortfolio.date, "thirtysix");
		date.setMonth(date.getMonth()-24);
		this.loadPerformanceData(date, loadedPortfolio.date, "sixty");

	}
	
	loadPerformanceData(startDate, endDate, label) {
		const start = ToAPIDate(startDate);
		const end = ToAPIDate(endDate);
		
		Remote.getPerformance(
				start,
				end,
				(data)=>{this.storePerformance(data, label);},
				()=>{this.setState({loginRequired: true})},
				false
			);

	}
	
	storePerformance(data, label) {
		const performance = this.state.performance;
		performance[label] = data.data;
		this.setState({"performance": performance});
	}
	
  render() {
	  if (this.state.loginRequired) {
		  return (<Redirect to={this.props.match.url} />);
	  }

    return (
      <div>
        <Navigation url={this.props.match.url} />
        <div className="main-content-section">
        	{ this.state.loading === true && this.state.timeout === false ? <Loading /> : null }
            <div className="hero-wrap">
            <div className="main-content">
              <div className="div-block w-clearfix">
                <h1 className="heading-1" id="portfolioTotal"><NumberFormat value={this.state.portfolio.total} prefix={'$'} places={0} /></h1>
                <div className="text-block">NZD</div>
              </div>
              <p className="subhead-1"><strong className="bold-text"><span id="date"><DateFormat date={this.state.portfolio.date} fullMonthName={true}/></span> <i id="dateHandler" className="far fa-calendar-alt padding10l" aria-hidden="true" onClick={this.toggleFilters}></i></strong> </p>
              <DateFilters header="View portfolio as at ..." showing={this.state.showDates} onRelative={this.toRelativeDate} onAbsolute={this.toDate} relativeSuffix=" ago" showCurrent={true}/>
            </div>
          </div>
          <div id="portfolio-makeup">
          { this.state.portfolio.parts.map((part, index) => {
        	  return (
        		  <PortfolioMarket data={ part } index={ index } performance={ this.state.performance } key={ part.name }/>
        	  );	  		
          })}
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

export default PortfolioPage;