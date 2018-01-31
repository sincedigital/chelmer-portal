import React from 'react';
import Calendar from 'react-calendar';

import Modal from '../Modal.js';

const PortfolioDateFilters = (props) => { 
	const nextIcon = (<i className="fa fa-angle-right"></i>);
	const next2Icon = (<i className="fa fa-angle-double-right"></i>);
	const prevIcon = (<i className="fa fa-angle-left"></i>);
	const prev2Icon = (<i className="fa fa-angle-double-left"></i>);

	return (<Modal showing={props.showing}>
		<div className="DatesModal">
		<div className="calendar-outer"><Calendar value={new Date()} maxDate={new Date()} nextLabel={nextIcon} next2Label={next2Icon} prevLabel={prevIcon} prev2Label={prev2Icon} onChange={props.onAbsolute} /></div>
		<ul className="range-labels">
        <li onClick={(e)=>props.onRelative(60)}>5 year ago</li>
        <li onClick={(e)=>props.onRelative(36)}>3 year ago</li>
        <li onClick={(e)=>props.onRelative(24)}>2 year ago</li>
        <li onClick={(e)=>props.onRelative(12)}>1 year ago</li>
        <li onClick={(e)=>props.onRelative(6)}>6 months ago</li>
        <li onClick={(e)=>props.onRelative(3)}>3 months ago</li>
        <li onClick={(e)=>props.onRelative(1)}>1 months ago</li>
        <li onClick={(e)=>props.onRelative(0)}>Current</li>
      </ul>
      </div>
      </Modal>);
}

export default PortfolioDateFilters;
