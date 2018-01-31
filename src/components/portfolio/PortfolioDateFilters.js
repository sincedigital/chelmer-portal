import React from 'react';
import Calendar from 'react-calendar';

const PortfolioDateFilters = (props) => { 
	const nextIcon = (<i className="fa fa-angle-right"></i>);
	const next2Icon = (<i className="fa fa-angle-double-right"></i>);
	const prevIcon = (<i className="fa fa-angle-left"></i>);
	const prev2Icon = (<i className="fa fa-angle-double-left"></i>);

	return (<div><ul className="range-labels">
        <li data-months-ago="12" >1 year ago</li>
        <li data-months-ago="6" >6 months ago</li>
        <li data-months-ago="0" className="active selected">Current</li>
      </ul><Calendar value={new Date()} maxDate={new Date()} nextLabel={nextIcon} next2Label={next2Icon} prevLabel={prevIcon} prev2Label={prev2Icon} className="portal-calendar" /></div>);
}

export default PortfolioDateFilters;
