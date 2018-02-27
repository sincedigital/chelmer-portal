import React from 'react';

import Modal from './Modal.js';
import Navigation from './Navigation.js';
import Loading from './Loading.js';
import Footer from './Footer.js';

const PageWrap = props=>{
	
	return (
		      <div className="ContentOuter">
		       <div className="ContentWrap">
		        <div className="Content">
		         <Navigation url={props.url} />
		         <div className="main-content-section">
		          { props.loading ? <Loading /> : null }
		          { props.children }
		          </div>
		          </div>
		          <div className="FooterPush"></div>
		         </div>
		         <Footer onPortfolioChanged={props.onPortfolioChanged} />
		         <Modal showing={props.timeout} allowNavigation={true}>
		  	    <h1>Could not contact Chelmer</h1>
		  	    <p>The Chelmer portal is currently down, so we are unable to retrieve your portfolio information.  Please try again later.</p>
		  	   </Modal>
	        </div>

	);
}

export default PageWrap;