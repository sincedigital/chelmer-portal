import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Navigation from './components/Navigation.js';
//import Loading from './components/Loading.js';
import Footer from './components/Footer.js';

import './App.css';

class TransactionsPage extends Component {

	/*
	state = {
			loading: true,
			portfolio: []
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
		var loadedPortfolio = {"parts":theGroups, total:0};
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
		
		//Percentages
		var maxPercentage = 0;
		loadedPortfolio.parts.forEach(function(el) {
  			var perc = (el.amount * 100 / loadedPortfolio.total );
  			if (perc > maxPercentage) {
  				maxPercentage = perc;
  			}
  		});
		console.log(loadedPortfolio);
		this.setState({"portfolio": loadedPortfolio, "loading": false});
	}
	
	*/
  render() {
	  if (this.state.loginRequired) {
		  return (<Redirect to={this.props.match.url} />);
	  }

    return (
      <div className="App">
        <Navigation url={this.props.match.url} />
		<div className="hero-wrap">
		<div className="main-content">
			<div className="div-block w-clearfix">
				<h1 className="heading-1" id="portfolioTotal">Transactions</h1>

			</div>
			<p className="subhead-1">
				Explanatory text?
			</p>

		</div>
	</div>
	<div id="transactions">
	<table id="detailsTable" className="dataTable no-footer width100" role="grid">
		<thead>
			<tr>
				<th>Description</th>
				<th>Type</th>
				<th>Date</th>
				<th>Quantity</th>
				<th>Local Amount</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td className="sell"><span className="headline">BXB.AU</span><span className="descriptor">Brambles Ltd</span></td>
				<td>Shares Contract</td>
				<td>30 May 2016</td>
				<td>-3,000</td>
				<td>-</td>
			</tr>
		</tbody>
	</table>
	<div id="row-header">
	<span>Description</span>
	</div>
	
	</div>


        <Footer />
      </div>
    );
  }
}

export default TransactionsPage;