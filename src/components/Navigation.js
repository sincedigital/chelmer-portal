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

		const basicClass = "fg-n nav-link w-nav-link";

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
				<Link to="/dashboard">
					<img src="images/chelmer-name-mobile.png" className="nav-logo-mobile" />
				</Link>
				<i className="fas fa-bars" onClick={this.toggleMobileNav}></i>
			</div>
			<div data-collapse="small" data-animation="default" data-duration="400" className={navClass}>
			    <div className="nav-container w-container">
			      <nav className="nav-menu w-clearfix w-nav-menu">
					  <div className="logo-container">
						  <Link to="/dashboard">
						  <img alt="" src="images/chelmer-name-large.png" className="nav-logo"/>
						  </Link>
					  </div>
			      <div className="nav-links">

			      <Link to="/dashboard" className={ dashClass } ><span className="icon">
				      <img alt="" src="images/chelmer_icons-01.png" className="nav-icon"/>
			      </span><p>DASHBOARD</p></Link>

			      <Link to="/portfolios" className={ portClass }><span className="icon">
				        <img alt="" src="images/chelmer_icons-02.png" className="nav-icon"/>
			      </span><p>PORTFOLIOS</p></Link>
			      <Link to="/transactions" className={trnsClass}>
			      <span className="icon">
  			  		<img alt="" src="images/chelmer_icons-03.png" className="nav-icon"/>
			      </span>
			      <p>TRANSACTIONS</p></Link>
			      <Link to="/documents" className={docsClass}><span className="icon">
			        <img alt="" src="images/chelmer_icons-04.png" className="nav-icon"/></span>
			      <p>DOCUMENTS</p></Link>
			      <Link to="/login" onClick={this.logout} className={userClass}><span className="icon">
			       <img alt="" src="images/chelmer_icons-05.png" className="nav-icon"/>
			      </span>
			      <p>LOGOUT</p></Link>



			      </div>
			      </nav>
			    </div>
			  </div>
			  </div>
		);
	}
}

export default Navigation;
