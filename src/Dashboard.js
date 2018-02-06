import React, { Component } from 'react';
import { PieChart, Pie, Cell, Legend, Sector } from 'recharts';
import './App.css';

import NumberFormat from './components/NumberFormat.js';

import Modal from './components/Modal.js';
import Navigation from './components/Navigation.js';
import Loading from './components/Loading.js';
import Footer from './components/Footer.js';
import Remote from './components/Remote.js';
import { Portfolios, Palette, Markets } from './components/Constants.js';
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
		this.activateSegment = this.activateSegment.bind(this);
		this.drawHighlight = this.drawHighlight.bind(this);
		
		this.load();
	}

	load() {
		const now = new Date();
		
		Remote.getHoldings(
			//TODO make portfolio adjustable
			Portfolios[0].portfolio, 
			ToAPIDate(now),
			this.acceptPortfolio,
			()=>{this.setState({loginRequired: true})},
			()=>{this.setState({"timeout": true})}
		);
		
		const month = new Date();
		month.setDate(1);
		
		Remote.getPerformance(
			Portfolios[0].portfolio, 
			ToAPIDate(month),
			ToAPIDate(now),
			this.acceptMTDPerformance,
			()=>{this.setState({loginRequired: true})},
			()=>{this.setState({"timeout": true})}
		);
		
		const year = new Date();
		year.setMonth(0);
		year.setDate(1);
		
		Remote.getPerformance(
			Portfolios[0].portfolio, 
			ToAPIDate(year),
			ToAPIDate(now),
			this.acceptYTDPerformance,
			()=>{this.setState({loginRequired: true})},
			()=>{this.setState({"timeout": true})}
		);

		
	}
	
	acceptPortfolio(data) {
		this.setState({"portfolio": PortfolioFromHoldings(data), "loading": false, "timeout": false});
	}

	acceptMTDPerformance(data) {
		const length = data.data.length;
		this.setState({"mtd": data.data[length-1]});
	}
	
	acceptYTDPerformance(data) {
		const length = data.data.length;
		this.setState({"ytd": data.data[length-1]});
	}
	
	activateSegment(data, index) {
		this.setState({"activeSegment": index});
	}
	
	drawHighlight(props) {
		const { cx, cy, innerRadius, outerRadius, startAngle, endAngle,
		    fill, payload, stroke } = props;
		    
		    
		return (<g>
			<Sector 
				cx={cx}
			    cy={cy}
			    startAngle={startAngle}
			    endAngle={endAngle}
			    innerRadius={outerRadius + 6}
			    outerRadius={outerRadius + 10}
			    fill={fill} />
			<Sector 
				cx={cx}
			    cy={cy}
			    startAngle={startAngle}
			    endAngle={endAngle}
			    innerRadius={innerRadius}
			    outerRadius={outerRadius}
			    fill={fill}
				stroke={stroke}
			/>
			<text x={30} y={210} textAnchor="left" fill={fill} style={{"fontSize": "16px"}}>{payload.name}</text>
			<text x={30} y={230} textAnchor="left" fill="white" ><NumberFormat value={payload.percentage} places={1} suffix="%" /> of portfolio</text>
			<text x={30} y={250} textAnchor="left" fill="white" >Current value <NumberFormat value={payload.holdingValue} places={2} prefix="$" /></text>
		</g>);
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
				 colour: colour
			 });
			 return null;
		 });
		 return null;
	  });
	  
	 return (
      <div className="App">
        <Navigation url={this.props.match.url} />
        <div className="main-content-section">
        	{ this.state.loading === true && this.state.timeout === false ? <Loading /> : null }
           	<div className="hero-wrap">
            	<div className="main-content">
            		<div className="div-block w-clearfix">
            		</div>
            	</div>
            </div>
            <div id="dashboard">
            	<div id="left">
            	<div id="networth">
            		<h1>Net Worth</h1>
            		<h2>Today</h2>
            		<div className="headline"><NumberFormat places={2} value={this.state.portfolio.total} prefix="$" /></div>
            		<div className="networth-table">
            			<div>This Month</div>
            			<div>{thisMonthProfitLoss}</div>
            			<div>{thisMonthPercentage}</div>
            		</div>
            		<div className="networth-table">
	        			<div>YTD</div>
	        			<div>{thisYearProfitLoss}</div>
	        			<div>{thisYearPercentage}</div>
	        		</div>
            	</div>
            	</div>
            	<div id="assetgraph">
            		<PieChart width={400} height={300}>
            			<Pie data={pieData} nameKey="name" dataKey="percentage" cx="50%" cy="30%" startAngle={450} endAngle={90} innerRadius={50} outerRadius={60} legendType="square">
            				{ pieData.map((entry, index)=>(
            					<Cell key={"cell-" + index}	fill={entry.colour} />
            				))}
            			</Pie>
            			<Pie data={outerPie} nameKey="name" dataKey="percentage" cx="50%" cy="30%" startAngle={450} endAngle={90} innerRadius={70} outerRadius={80} legendType="none" onMouseEnter={this.activateSegment} activeIndex={this.state.activeSegment} activeShape={this.drawHighlight}>
	        				{ outerPie.map((entry, index)=>(
	        					<Cell key={"ocell-" + index} fill={entry.colour} />
	        				))}
	        			</Pie>
        				<Legend layout="vertical" align="right" verticalAlign="top"/>
            		</PieChart>
            	</div>
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

export default Dashboard;