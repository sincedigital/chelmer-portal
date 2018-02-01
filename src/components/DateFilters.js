import React from 'react';
import Calendar from 'react-calendar';
import './DateFilters.css';

const DateFilters = (props) => { 
	const nextIcon = (<i className="fa fa-angle-right"></i>);
	const next2Icon = (<i className="fa fa-angle-double-right"></i>);
	const prevIcon = (<i className="fa fa-angle-left"></i>);
	const prev2Icon = (<i className="fa fa-angle-double-left"></i>);

	var className = "Dates"
	if (props.showing) {
		className += " Showing";
	}

	return (
		<div className="DatesOuter">
		<div className={className}>
		<div className="calendar-outer">
		<Calendar value={props.range ? null : (props.selectedDate || new Date())} locale="en-NZ" maxDate={new Date()} nextLabel={nextIcon} next2Label={next2Icon} prevLabel={prevIcon} prev2Label={prev2Icon} onChange={props.onAbsolute} selectRange={props.range} returnValue={props.range ? "range" : "start"} /></div>
		<h1>{props.header || 'Select Date'}</h1>
		<ul className="range-labels">
        <li onClick={(e)=>props.onRelative(1)}>{props.relativePrefix}1 month{props.relativeSuffix}</li>
        <li onClick={(e)=>props.onRelative(3)}>{props.relativePrefix}3 months{props.relativeSuffix}</li>
        <li onClick={(e)=>props.onRelative(6)}>{props.relativePrefix}6 months{props.relativeSuffix}</li>
        <li onClick={(e)=>props.onRelative(12)}>{props.relativePrefix}1 year{props.relativeSuffix}</li>
        <li onClick={(e)=>props.onRelative(24)}>{props.relativePrefix}2 years{props.relativeSuffix}</li>
        <li onClick={(e)=>props.onRelative(36)}>{props.relativePrefix}3 years{props.relativeSuffix}</li>
        <li onClick={(e)=>props.onRelative(60)}>{props.relativePrefix}5 years{props.relativeSuffix}</li>
        { props.includeCurrent ? (<li onClick={(e)=>props.onRelative(0)}>{props.relativePrefix}Current</li>) : null }
      </ul>
      </div>
      </div>
      );
}

export default DateFilters;
