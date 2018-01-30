import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import LongDate from './components/LongDate.js';

import Navigation from './components/Navigation.js';
import Loading from './components/Loading.js';
import Footer from './components/Footer.js';
import Remote from './components/Remote.js';
import { Portfolios } from './components/Constants.js';

import PortfolioMarket from './components/portfolio/PortfolioMarket.js';

import './App.css';

class PortfolioPage extends Component {

	state = {
			loading: true,
			portfolio: {
				parts:[]
			}
	};
	
	constructor(props) {
		super(props);
		
		Remote.getHoldings(
			//TODO make portfolio adjustable
			Portfolios[0].portfolio, 
			new Date().toISOString().substring(0, 10),
			this.acceptPortfolio.bind(this),
			()=>{this.setState({loginRequired: true})}
		);
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
		
		this.setState({"portfolio": loadedPortfolio, "loading": false});
	}
	
  render() {
	  if (this.state.loginRequired) {
		  return (<Redirect to={this.props.match.url} />);
	  }

    return (
      <div className="App">
        <Navigation url={this.props.match.url} />
        <div className="main-content-section">
        	{ this.state.loading === true ? <Loading /> : null }
            <div className="hero-wrap">
            <div className="main-content">
              <div className="div-block w-clearfix">
                <h1 className="heading-1" id="portfolioTotal"><NumberFormat value={this.state.portfolio.total} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} /></h1>
                <div className="text-block">NZD</div>
              </div>
              <p className="subhead-1"><strong className="bold-text"><span id="date"><LongDate date={this.state.portfolio.date} /></span> <i id="dateHandler" className="fa fa-calendar-o padding10l" aria-hidden="true"></i></strong> </p>

      <ul className="range-labels">
        <li data-months-ago="12" >1 year ago</li>
        <li data-months-ago="6" >6 months ago</li>
        <li data-months-ago="0" className="active selected">Current</li>
      </ul>
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
      </div>
    );
  }
}

export default PortfolioPage;