import React, { Component } from 'react';
import Navigation from './components/Navigation.js';
import Loading from './components/Loading.js';
import Footer from './components/Footer.js';
import './App.css';

class Dashboard extends Component {

  render() {
    return (
      <div className="App">
        <Navigation url={this.props.match.url} />
        <div className="main-content-section">
        	<Loading />
            <div className="hero-wrap">
            <div className="main-content">
              <div className="div-block w-clearfix">
              </div>
            </div>
          </div>
          <div id="dashboard" >
          <div className="w-col w-col-6" >
          	<div className=" w-col-dashboard">
              	<h1>NET WORTH <span className="right">TODAY</span></h1>
              	<h1 className="main">$1,686,915</h1>
              	<div className="row row-positive">
              	<div className="row-date">This month</div>
              	<div className="row-amount">+$694,755</div>
              	<div className="row-percent">+70.02%</div>
              	</div>
              	<div className="row row-negative">
              	<div className="row-date">YEAR TO DATE</div>
              	<div className="row-amount">-$50,755</div>
              	<div className="row-percent">-5.02%</div>
              	</div>
              	</div>
              	<div className=" w-col-dashboard">
              	<h1>INVESTMENTS<span className="right">TODAY</span></h1>
              	<p>Asset allocation</p>
              	
              	<canvas id="assetAllocation" width="300" height="150"></canvas>
              	</div>
              	</div>
              	<div className="w-col w-col-6 ">
              	<div className="w-col-dashboard">
      				<h1>Your gainers</h1>   
      				<canvas id="gainers" width="300" height="200"></canvas>     	

      				<h1>Your losers</h1>
      				<canvas id="losers" width="300" height="200"></canvas>     	
              	</div>
              	</div>
              		
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Dashboard;