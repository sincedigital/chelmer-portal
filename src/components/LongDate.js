import React, { Component } from 'react';

const LongDate = (props) => {
	const monthNames = [
	    "January", "February", "March",
	    "April", "May", "June", "July",
	    "August", "September", "October",
	    "November", "December"
	  ];
	
	if (!props.date) {
		return null;
	}

	var date = props.date;
	
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();
	
	var month = monthNames[monthIndex];
	return (
		<span>{day} {month} {year}</span>
	);
}

export default LongDate;