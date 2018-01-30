import React, { Component } from 'react';

class LongDate extends Component {
	monthNames = [
	    "January", "February", "March",
	    "April", "May", "June", "July",
	    "August", "September", "October",
	    "November", "December"
	  ];
	
	render() {
		if (!this.props.date) {
			return null;
		}

		var date = this.props.date;
		
		  var day = date.getDate();
		  var monthIndex = date.getMonth();
		  var year = date.getFullYear();

		  var month = this.monthNames[monthIndex];
		return (
			<span>{day} {month} {year}</span>
		);
	}
}

export default LongDate;