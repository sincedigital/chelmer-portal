import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Authentication from './Authentication.js';
import { TransactionsIcon, DocumentsIcon } from './Icons.js';
import './Navigation.css';

class Navigation extends Component {
	
	state = {
	}
	
	constructor(props) {
		super(props);
		
		this.toggleMobileNav = this.toggleMobileNav.bind(this);
		this.logout = this.logout.bind(this);
	}
	
	toggleMobileNav() {
		this.setState({"mobileShowing": !this.state.mobileShowing});
	}
	
	logout(e) {
		Authentication.logout();

		//Force a redraw
		this.setState({"logout": true});
	}
	
	render() {
		const url = this.props.url;
		
		const basicClass = "nav-link w-nav-link";
		
		const dashClass = basicClass + (url === '/dashboard' ? ' active' : '');
		const portClass = basicClass + (url === '/portfolios' ? ' active' : '');
		const trnsClass = basicClass + (url === '/transactions' ? ' active' : '');
		const docsClass = basicClass + (url === '/documents' ? ' active' : '');
		const settClass = basicClass + (url === '/settings' ? ' active' : '');
		const userClass = basicClass;
		
		var navClass = "nav";
		if (this.state.mobileShowing) {
			navClass += " Showing";
		}
		
		return (
				<div>
			<div id="MobileNav">
				<img src="images/chelmer-name-mobile.png" className="nav-logo-mobile" />
				<i className="fas fa-bars" onClick={this.toggleMobileNav}></i>
			</div>
			<div data-collapse="small" data-animation="default" data-duration="400" className={navClass}>
			    <div className="nav-container w-container">
			      <nav className="nav-menu w-clearfix w-nav-menu">
			      <img alt="" src="images/chelmer-name-large.png" className="nav-logo"/>
			      <div className="nav-links">
			      
			      <Link to="/dashboard" className={ dashClass } ><span className="icon">
				      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="navsvg">
						<g>
						  <path className="svg-icon filled" stroke="none" d="m 17.142858,15.441958 c -2.48872,0 -4.50753,2.0188 -4.50753,4.50753 0,2.48871 2.01881,4.50752 4.50753,4.50752 2.48872,0 4.50753,-2.01881 4.50753,-4.50752 0,-0.34363 -0.0455,-0.67714 -0.12129,-0.99805 3.2998,-3.83795 8.40866,-9.8222799 11.13743,-13.2319899 0.93486,-1.16731 -0.0935,-2.27147 -1.29364,-1.29364 -3.44383,2.80457 -9.39149,7.8704999 -13.21558,11.1412299 -0.32595,-0.0758 -0.66578,-0.12508 -1.01445,-0.12508 z m 15.23563,-5.16696 -2.7793,3.63586 c 0.3032,1.09903 0.48007,2.25372 0.48007,3.45135 0,7.14533 -5.79357,12.93639 -12.9364,12.93639 -7.14283,0 -12.9364004,-5.79106 -12.9364004,-12.93639 0,-7.14284 5.7935704,-12.9363999 12.9364004,-12.9363999 2.66308,0 5.13413,0.80727 7.19082,2.18682 l 3.20377,-2.45084 c -2.86015,-2.2588195 -6.46314,-3.61689947 -10.39459,-3.61689947 -9.2879304,0 -16.81731044,7.52938947 -16.81731044,16.81731937 0,9.28792 7.52938004,16.81731 16.81731044,16.81731 9.28793,0 16.81731,-7.52939 16.81731,-16.81731 0,-2.5355 -0.57607,-4.93201 -1.58168,-7.08721 z" />
				 		</g>
					  </svg>
			      </span>DASHBOARD</Link>
			      
			      <Link to="/portfolios" className={ portClass }><span className="icon">
				      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="navsvg">
						<g>
				  		<path className="svg-icon filled" stroke="none" d="m 20.338027,0.38075846 0,5.33789004 a 11.743024,11.743024 0 0 1 9.97657,11.5956995 11.743024,11.743024 0 0 1 -0.72071,4.00586 l 4.50782,2.69726 a 16.920055,17.038376 0 0 0 1.39062,-6.71093 16.920055,17.038376 0 0 0 -15.1543,-16.92577954 z m -3.91406,0.041 A 16.920055,17.038376 0 0 0 1.650527,17.306528 a 16.920055,17.038376 0 0 0 16.92188,17.0371 16.920055,17.038376 0 0 0 13.5918,-6.92187 l -4.4961,-2.69336 a 11.743024,11.743024 0 0 1 -9.0957,4.32813 11.743024,11.743024 0 0 1 -11.74414,-11.74219 11.743024,11.743024 0 0 1 9.5957,-11.5410195 l 0,-5.35156004 z"/>
				 		</g>
					  </svg>
			      </span>PORTFOLIOS</Link>
			      <Link to="/transactions" className={trnsClass}>
			      <span className="icon">
			      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="navsvg">
			      <TransactionsIcon className="svg-icon filled" />
			</svg>
			      
			      </span>
			      TRANSACTIONS</Link>
			      <Link to="/documents" className={docsClass}><span className="icon">
			      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="navsvg">
			      <DocumentsIcon className="svg-icon filled" />
			</svg></span>
			      
			      DOCUMENTS</Link>

			      <Link to="/login" onClick={this.logout} className={userClass}><span className="icon">
			      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="navsvg">
			 <g>
			  <path className="svg-icon filled" strokeWidth="0" transform="translate(1, 0)" style={{stroke: "none"}} d="M 17.143856,0.60048882 A 16.762098,16.762098 0 0 0 0.38015567,17.362209 16.762098,16.762098 0 0 0 17.143856,34.123929 16.762098,16.762098 0 0 0 33.905556,17.362209 16.762098,16.762098 0 0 0 17.143856,0.60048882 Z m 0,4.99218998 a 4.8503094,4.8503094 0 0 1 4.8496,4.8515602 4.8503094,4.8503094 0 0 1 -4.8496,4.84961 4.8503094,4.8503094 0 0 1 -4.8516,-4.84961 4.8503094,4.8503094 0 0 1 4.8516,-4.8515602 z m 0.008,12.7050802 a 25.963419,53.580208 0 0 1 10.9355,5.05078 23.049511,49.780891 0 0 1 -10.9355,6.01172 23.049511,49.780891 0 0 1 -10.9551003,-5.99219 25.963419,53.580208 0 0 1 10.9551003,-5.07031 z" />
			 </g>
			</svg>
			      </span>
			      LOGOUT</Link>
			      
			      
			          
			      </div>
			      </nav>
			    </div>
			  </div>
			  </div>
		);
	}
}

export default Navigation;