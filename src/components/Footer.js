import React from 'react';
import PortfolioTabs from './PortfolioTabs.js';

const Footer = (props) => {
  return (
		<div className="Footer">
		  <div className="footer-top"> 
    		<PortfolioTabs onUpdate={props.onPortfolioChanged} />
		    <div className="footer-bottom-wrap">
		      <div className="legal w-hidden-small w-hidden-tiny">© 2018 SinceDigital. All Rights Reserved.</div>
		    </div>
		  </div>
		  <div className="w-embed">

		  </div>
		 </div>
  );
};

export default Footer;