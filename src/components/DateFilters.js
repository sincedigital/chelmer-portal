import React, { Component } from 'react';
import Calendar from 'react-calendar';
import './DateFilters.css';
import windowSize from 'react-window-size';

class DateFilters extends Component {
	
	state = {};
	constructor(props) {
		super(props);
		
		this.state.calendarShowing = true;
	}
	
	render () {
		const nextIcon = (<i className="fa fa-angle-right"></i>);
		const next2Icon = (<i className="fa fa-angle-double-right"></i>);
		const prevIcon = (<i className="fa fa-angle-left"></i>);
		const prev2Icon = (<i className="fa fa-angle-double-left"></i>);
	
		var outerClassName = "DatesOuter"
		if (this.props.showing) {
			outerClassName += " Showing";
		}
	
		return (
			<div style={{"width": "100%"}}>
			 <div className={outerClassName}>
			  <div className="Dates">
			   <div className="DatesContainer">
			    <div className="DatesCalendar">
			     <h1>{this.props.selectHeader || 'Or select date'}</h1>
			     <div className="calendar-outer">
			      <Calendar value={this.props.range ? null : (this.props.selectedDate || new Date())} locale="en-NZ" maxDate={new Date()} nextLabel={nextIcon} next2Label={next2Icon} prevLabel={prevIcon} prev2Label={prev2Icon} onChange={this.props.onAbsolute} selectRange={this.props.range} returnValue={this.props.range ? "range" : "start"} /></div>
	             </div>
	        <div className="DatesQuickPick">
			<h1>{this.props.header || 'Select Date'}</h1>
			<ul className="range-labels">
			{ this.props.includeToday ? (<li onClick={(e)=>this.props.onRelative(0)}>Today</li>) : "" }
			<li onClick={(e)=>this.props.onRelative(1)}>{this.props.relativePrefix}1 month{this.props.relativeSuffix}</li>
	        <li onClick={(e)=>this.props.onRelative(3)}>{this.props.relativePrefix}3 months{this.props.relativeSuffix}</li>
	        <li onClick={(e)=>this.props.onRelative(6)}>{this.props.relativePrefix}6 months{this.props.relativeSuffix}</li>
	        <li onClick={(e)=>this.props.onRelative(12)}>{this.props.relativePrefix}1 year{this.props.relativeSuffix}</li>
	        <li onClick={(e)=>this.props.onRelative(24)}>{this.props.relativePrefix}2 years{this.props.relativeSuffix}</li>
	        <li onClick={(e)=>this.props.onRelative(36)}>{this.props.relativePrefix}3 years{this.props.relativeSuffix}</li>
	        <li onClick={(e)=>this.props.onRelative(60)}>{this.props.relativePrefix}5 years{this.props.relativeSuffix}</li>
	      </ul>
	      </div>
          </div>
	      </div>
	      </div>
	      </div>
      );
	}
}

export default windowSize(DateFilters);
