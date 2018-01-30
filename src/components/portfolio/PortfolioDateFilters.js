import React from 'react';

const PortfolioDateFilters = (props) => { 
	return (<ul className="range-labels">
        <li data-months-ago="12" >1 year ago</li>
        <li data-months-ago="6" >6 months ago</li>
        <li data-months-ago="0" className="active selected">Current</li>
      </ul>);
}

export default PortfolioDateFilters;
