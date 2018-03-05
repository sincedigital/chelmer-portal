import React, { Component } from 'react';
import './App.css';

import NumberFormat from './components/NumberFormat.js';

import PageWrap from './components/PageWrap.js';
import Remote from './components/Remote.js';
import NetWorth from './components/dashboard/NetWorth.js';
import AssetGraph from './components/dashboard/AssetGraph.js';
import AllocationGraph from './components/dashboard/AllocationGraph.js';
import Notifications from './components/dashboard/Notifications.js';

import { Palette, UnderShades, Markets } from './components/Constants.js';
import { ToAPIDate, PortfolioFromHoldings } from './components/Functions.js';

import './Dashboard.css';

class Dashboard extends Component {

	state = {
		loading: true,
		portfolio: {
			date: new Date(),
			parts:[]
		},
		timeout: false,
		activeSegment: -1
	};
	
	constructor(props) {
		super(props);
		
		this.load = this.load.bind(this);
		
		this.acceptPortfolio = this.acceptPortfolio.bind(this);
		this.acceptMTDPerformance = this.acceptMTDPerformance.bind(this);
		this.acceptYTDPerformance = this.acceptYTDPerformance.bind(this);
		this.loadPerformance = this.loadPerformance.bind(this);
		this.portfolioChanged = this.portfolioChanged.bind(this);
		
		this.load();
	}

	load() {
		Remote.getHoldings(
			ToAPIDate(new Date()),
			this.acceptPortfolio,
			()=>{this.setState({loginRequired: true})},
			()=>{this.setState({"timeout": true})}
		);
		
		const portfolio = Remote.getCurrentPortfolio();
		if (portfolio) {
			this.loadPerformance;
		} else {
			//Non-UI
			this.state.performanceLoadRequested = false;
		}
	}
	
	loadPerformance() {
		//Non-UI
		this.state.performanceLoadRequested = true;
		
		const now = new Date();
		const month = new Date();
		month.setDate(1);

		Remote.getPerformance(
			ToAPIDate(month),
			ToAPIDate(now),
			this.acceptMTDPerformance,
			()=>{this.setState({loginRequired: true})},
			()=>{}
		);
		
		const year = new Date();
		year.setMonth(0);
		year.setDate(1);
		
		Remote.getPerformance(
			ToAPIDate(year),
			ToAPIDate(now),
			this.acceptYTDPerformance,
			()=>{this.setState({loginRequired: true})},
			()=>{}
		);
	}
	
	acceptPortfolio(data) {
		this.setState({"portfolio": PortfolioFromHoldings(data), "loading": false, "timeout": false});
		if (!this.state.performanceLoadRequested) 
			this.loadPerformance();
	}

	portfolioChanged() {
		this.setState({"loading": true});
		this.load();
	}
	
	acceptMTDPerformance(data) {
		const length = data.data.length;
		this.setState({"mtd": data.data[length-1]});
	}
	
	acceptYTDPerformance(data) {
		const length = data.data.length;
		this.setState({"ytd": data.data[length-1]});
	}
		
  render() {
	  const wait = (<i className="fas fa-circle-notch fa-spin"></i>);
	  
	  var thisMonthProfitLoss = "";
	  var thisMonthPercentage = "";
	  var thisYearProfitLoss = "";
	  var thisYearPercentage = "";
	  
	  if (!this.state.mtd) {
		  thisMonthProfitLoss = wait;
		  thisMonthPercentage = wait;
	  } else {
		  const change = this.state.mtd.grossEndValue - this.state.mtd.grossStartValue; 
		  thisMonthProfitLoss = (<NumberFormat value={change} places={2} prefix="$" explicitPositive={true} />);
		  thisMonthPercentage = (<NumberFormat value={change/this.state.mtd.grossStartValue*100} places={2} suffix="%" explicitPositive={true} />);
	  }
	  
	  if (!this.state.ytd) {
		  thisYearProfitLoss = wait;
		  thisYearPercentage = wait;
	  } else {
		  const change = this.state.ytd.grossEndValue - this.state.ytd.grossStartValue; 
		  thisYearProfitLoss = (<NumberFormat value={change} places={2} prefix="$" explicitPositive={true} />);
		  thisYearPercentage = (<NumberFormat value={change/this.state.ytd.grossStartValue*100} places={2} suffix="%" explicitPositive={true} />);
	  }
	  
	  const pieData = [];
	  const outerPie = [];
	  
	  this.state.portfolio.parts.map((entry, index)=>{
		 const colour = Palette[index % Palette.length];
		 const undershade = UnderShades[index % Palette.length];
		 pieData.push({
			 name: Markets[entry.name],
			 percentage: entry.percentage,
			 value: entry.total,
			 colour: colour
		 }); 
		 
		 entry.holdings.map((holding, innerIndex)=>{
			 outerPie.push({
				 name: holding.name,
				 percentage: holding.percentage,
				 "holdingValue": holding.value,
				 colour: colour,
				 undershade: undershade
			 });
			 return null;
		 });
		 return null;
	  });
	  
	 return (
		 <PageWrap url={this.props.match.url} loading={this.state.loading === true && this.state.timeout === false} onPortfolioChanged={this.portfolioChanged} timeout={this.state.timeout}>
		  <div id="dashboard">
           <div id="left">
            <NetWorth total={this.state.portfolio.total} thisMonthProfitLoss={thisMonthProfitLoss} thisMonthPercentage={thisMonthPercentage} thisYearProfitLoss={thisYearProfitLoss} thisYearPercentage={thisYearPercentage} />
            <AssetGraph innerPie={pieData} outerPie={outerPie} />
           </div>
           <div id="right">
            <AllocationGraph mandate={80} actual={72.4} />
            <Notifications />
           </div>
          </div>
         </PageWrap>
	 );
  }
}

export default Dashboard;