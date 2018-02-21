import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Navigation from './components/Navigation.js';

import Footer from './components/Footer.js';
import Remote from './components/Remote.js';

import './SettingsPage.css';
import './App.css';

class SettingsPage extends Component {

	state = {
		doSwitch: false,
		loginRequired: false
	};

	constructor(props) {
		super(props);

		this.switchPortfolio = this.switchPortfolio.bind(this);
	}

	switchPortfolio(code) {
		Remote.setCurrentPortfolio(code);
		this.setState({doSwitch: true});
	}
	
  render() {
	  if (this.state.loginRequired) {
		  return (<Redirect to={this.props.match.url} />);
	  }
	  
	  if (this.state.doSwitch) {
		  return (<Redirect to="/dashboard" />);
	  };

	  const portfolioCache = Remote.getAvailablePortfolios();
	  
    return (
      <div className="App">
        <Navigation url={this.props.match.url} />
        <div className="main-content-section">
	       	<div className="hero-wrap">
	        	<div className="main-content">
	        		<div className="div-block w-clearfix">
	        		</div>
	        	</div>
	        </div>
	        <h1>Select Portfolio to View</h1>
	        <ul class="portfolioList">
	        { 
	        	Object.keys(portfolioCache).map((key) => {
	        		const portfolio = portfolioCache[key];
		        	return (<li key={key} onClick={e=>this.switchPortfolio(portfolio.portfolioCode)}>{portfolio.portfolioCode}</li>);
		        })
	        }
	        </ul>
	        </div>
        <Footer />
      </div>
    );
  }
}

export default SettingsPage;