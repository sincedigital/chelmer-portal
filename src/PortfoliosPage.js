import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from './components/Modal.js';

import DateFormat from './components/DateFormat.js';
import NumberFormat from './components/NumberFormat.js';

import Navigation from './components/Navigation.js';
import Loading from './components/Loading.js';
import Footer from './components/Footer.js';
import Remote from './components/Remote.js';
import { Portfolios } from './components/Constants.js';
import { ToAPIDate } from './components/Functions.js';
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
		console.log(date);
		console.log(date.toISOString());
		Remote.getHoldings(
			//TODO make portfolio adjustable
			Portfolios[0].portfolio, 
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
		var theGroups = [];
		var loadedPortfolio = {"parts":[], total:0};
		for (var i=0; i<data.data.length; i++) {
			var datachunk = data.data[i];
			loadedPortfolio.date = new Date(datachunk.asAtDate);
			
			for (var j=0; j<datachunk.holdings.length; j++) {
				var holding = datachunk.holdings[j];
				var group = holding.mkt;
				
				var theGroup = theGroups[group];
				if (theGroup == null) {
					theGroup = {"name": group, "holdings":[], "amount":0, "expanded": false};
					theGroups[group] = theGroup;
				}
				
				theGroup.holdings.push({"name": holding.name, value: holding.baseMv});
				theGroup.amount += holding.baseMv;
				
				loadedPortfolio.total += holding.baseMv;
			}
		}

		for (var key in theGroups) {
			loadedPortfolio.parts.push(theGroups[key]);
		};
	
		//Percentages
		var maxPercentage = 0;
		loadedPortfolio.parts.forEach(function(el) {
  			var perc = (el.amount * 100 / loadedPortfolio.total );
  			if (perc > maxPercentage) {
  				maxPercentage = perc;
  			}
  			el.percentage = perc;
  		});
		loadedPortfolio.parts.forEach(function(el) {
			el.maxPercentage = maxPercentage;
  		});
		
		this.setState({"portfolio": loadedPortfolio, "loading": false, "timeout": false});
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
              <p className="subhead-1"><strong className="bold-text"><span id="date"><DateFormat date={this.state.portfolio.date} fullMonthName={true}/></span> <i id="dateHandler" className="fa fa-calendar-o padding10l" aria-hidden="true" onClick={this.toggleFilters}></i></strong> </p>
              <DateFilters header="View portfolio as at ..." showing={this.state.showDates} onRelative={this.toRelativeDate} onAbsolute={this.toDate} relativeSuffix=" ago" showCurrent={true}/>
            </div>
          </div>
          <div id="portfolio-makeup">
          { this.state.portfolio.parts.map((part, index) => {
        	  return (
        		  <PortfolioMarket data={ part } index={ index } key={ part.name }/>
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