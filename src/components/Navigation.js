import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

class Navigation extends Component {
	
	state = {}
	
	constructor(props) {
		super(props);
		
		this.toggleMobileNav = this.toggleMobileNav.bind(this);
	}
	
	toggleMobileNav() {
		this.setState({"mobileShowing": !this.state.mobileShowing});
	}
	
	render() {
		const url = this.props.url;
		
		const basicClass = "nav-link w-nav-link";
		
		const dashClass = basicClass + (url === '/dashboard' ? ' active' : '');
		const portClass = basicClass + (url === '/portfolios' ? ' active' : '');
		const trnsClass = basicClass + (url === '/transactions' ? ' active' : '');
		const docsClass = basicClass + (url === '/documents' ? ' active' : '');
		const settClass = basicClass + (url === '/settings' ? ' active' : '');
		
		var navClass = "nav";
		if (this.state.mobileShowing) {
			navClass += " Showing";
		}
		
		return (
				<div>
			<div id="MobileNav">
				<i className="fas fa-bars" onClick={this.toggleMobileNav}></i>
			</div>
			<div data-collapse="small" data-animation="default" data-duration="400" className={navClass}>
			    <div className="nav-container w-container">
			      <nav className="nav-menu w-clearfix w-nav-menu">
			      <img alt="" src="images/logo_dark_220x90.png" className="w-hidden-tiny "/>
			      <div className="nav-links">
			      
			      <Link to="/dashboard" className={ dashClass } ><span className="icon">
				      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="navsvg">
						<g>
						  <path className="svg-icon filled" strokeWidth="1.5" d="M8.571 25.714q0-1.183-.837-2.02t-2.02-.837-2.02.837-.837 2.02.837 2.02 2.02.837 2.02-.837.837-2.02zm4.286-10q0-1.183-.837-2.02t-2.02-.837-2.02.837-.837 2.02.837 2.02 2.02.837 2.02-.837.837-2.02zm9.554 10.737 2.254-8.527q.134-.58-.167-1.083t-.859-.658-1.071.145-.67.882l-2.254 8.527q-1.339.112-2.388.971t-1.406 2.199q-.446 1.719.446 3.259t2.612 1.987 3.259-.446 1.987-2.612q.357-1.339-.134-2.612t-1.607-2.031zm14.732-.737q0-1.183-.837-2.02t-2.02-.837-2.02.837-.837 2.02.837 2.02 2.02.837 2.02-.837.837-2.02zm-14.286-14.286q0-1.183-.837-2.02t-2.02-.837-2.02.837-.837 2.02.837 2.02 2.02.837 2.02-.837.837-2.02zm10 4.286q0-1.183-.837-2.02t-2.02-.837-2.02.837-.837 2.02.837 2.02 2.02.837 2.02-.837.837-2.02zm7.143 10q0 5.826-3.147 10.781-.424.647-1.205.647h-31.295q-.781 0-1.205-.647-3.147-4.933-3.147-10.781 0-4.062 1.585-7.768t4.263-6.384 6.384-4.263 7.768-1.585 7.768 1.585 6.384 4.263 4.263 6.384 1.585 7.768z" />
				 		</g>
					  </svg>
			      </span>DASHBOARD</Link>
			      
			      <Link to="/portfolios" className={ portClass }><span className="icon">
				      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="navsvg">
						<g>
				  		<ellipse ry="14.5" rx="14.5" id="svg_1" cy="20" cx="20" strokeWidth="5" stroke="#fff" fill="#13343b" className="svg-icon"></ellipse>
						<rect id="svg_4" height="4" width="4" y="2" x="18" strokeWidth="5" className="svg-mask"></rect>
						<rect id="svg_5" height="4" width="4" y="25" x="28" strokeWidth="5" className="svg-mask" transform="translate(0) rotate(45 26 30)"></rect>
				 		</g>
					  </svg>
			      </span>PORTFOLIOS</Link>
			      <Link to="/transactions" className={trnsClass}>
			      <span className="icon">
			      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="navsvg">
			 <g>
			  <path className="svg-icon filled" strokeWidth="1.5" d="M28.61 6.962 34.963 11.901 28.61 16.84 28.61 13.37 9.207 13.37 9.207 10.431 28.61 10.431V6.961Z" id="svg_16" />
			  <path className="svg-icon filled" strokeWidth="1.5" d="M11.39 33.038 5.037 28.099 11.39 23.16 11.39 26.63 30.793 26.63 30.793 29.569 11.39 29.569 11.39 33.039Z" id="svg_17"/>
			 </g>
			</svg>
			      
			      </span>
			      TRANSACTIONS</Link>
			      <Link to="/documents" className={docsClass}><span className="icon">
			      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="navsvg">
			 <g>
			  <path className="svg-icon filled" strokeWidth="1.5" d="M35.625 10.625q.313.313 .625.804h-10.536v-10.536q.491.312 .804.625zm-10.625 3.661h12.143v23.571q0 .893-.625 1.518t-1.518.625h-30q-.893 0-1.518-.625t-.625-1.518v-35.714q0-.893.625-1.518t1.518-.625h17.857v12.143q0 .893.625 1.518t1.518.625zm3.571 16.429v-1.429q0-.312-.201-.513t-.513-.201h-15.714q-.312 0-.513.201t-.201.513v1.429q0 .313.201 .513t.513.201h15.714q.313 0 .513-.201t.201-.513zm0-5.714v-1.429q0-.312-.201-.513t-.513-.201h-15.714q-.312 0-.513.201t-.201.513v1.429q0 .313.201 .513t.513.201h15.714q.313 0 .513-.201t.201-.513zm0-5.714v-1.429q0-.312-.201-.513t-.513-.201h-15.714q-.312 0-.513.201t-.201.513v1.429q0 .313.201 .513t.513.201h15.714q.313 0 .513-.201t.201-.513z" id="svg_16" />
			 </g>
			</svg></span>
			      
			      DOCUMENTS</Link>
			      <Link to="/settings" className={settClass}><span className="icon">
			      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="navsvg">
			 <g>
			  <path className="svg-icon filled" strokeWidth="1.5" d="M25.714 20q0-2.366-1.674-4.04t-4.04-1.674-4.04 1.674-1.674 4.04 1.674 4.04 4.04 1.674 4.04-1.674 1.674-4.04zm11.429-2.433v4.955q0 .268-.179.513t-.446.29l-4.129.625q-.424 1.205-.871 2.031.781 1.116 2.388 3.08.223 .268.223 .558t-.201.513q-.603.826-2.21 2.411t-2.098 1.585q-.268 0-.58-.201l-3.08-2.411q-.982.513-2.031.848-.357 3.036-.647 4.152-.156.625-.804.625h-4.955q-.312 0-.547-.19t-.257-.48l-.625-4.107q-1.094-.357-2.009-.826l-3.147 2.388q-.223.201-.558.201-.312 0-.558-.246-2.812-2.545-3.683-3.75-.156-.223-.156-.513 0-.268.179-.513.335-.469 1.138-1.484t1.205-1.574q-.603-1.116-.915-2.21l-4.085-.603q-.29-.045-.469-.279t-.179-.525v-4.955q0-.268.179-.513t.424-.29l4.152-.625q.313-1.027.871-2.054-.893-1.272-2.388-3.08-.223-.268-.223-.536 0-.223.201-.513.58-.804 2.199-2.4t2.109-1.596q.29 0 .58.223l3.08 2.388q.982-.513 2.031-.848.357-3.036.647-4.152.156-.625.804-.625h4.955q.313 0 .547.19t.257.48l.625 4.107q1.094.357 2.009.826l3.17-2.388q.201-.201.536-.201.29 0 .558.223 2.879 2.656 3.683 3.795.156 .179.156 .491 0 .268-.179.513-.335.469-1.138 1.484t-1.205 1.574q.58 1.116.915 2.188l4.085.625q.29.045 .469.279t.179.525z" />
			 </g>
			</svg>
			      </span>
			      
			      SETTINGS</Link>
			      </div>
			      <div className="userlist">
			      <ul>
			      </ul>
			      </div>
			      </nav>
			    </div>
			  </div>
			  </div>
		);
	}
}

export default Navigation;