import React, { Component } from 'react';

const DateFormat = (props) => {
	const longMonthNames = [
	    "January", "February", "March",
	    "April", "May", "June", "July",
	    "August", "September", "October",
	    "November", "December"
	  ];
	
	const shortMonthNames = [
		"Jan", "Feb", "Mar", "Apr",
		"May", "Jun", "Jul", "Aug",
		"Sep", "Oct", "Nov", "Dec"
	];
	
	if (!props.date) {
		return null;
	}

	var date = props.date;
	
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();
	
	var month = props.fullMonthName ? longMonthNames[monthIndex] : shortMonthNames[monthIndex];
	return (
		<span>{day} {month} {year}</span>
	);
}

export default DateFormat;