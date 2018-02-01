const ToAPIDate = function(date) {
	
	var year = date.getFullYear();
	var month = "" + (parseInt(date.getMonth())+1);
	if (month.length === 1) {
		month = "0" + month;
	}
	var day = date.getDate();
	if (day.length === 1) {
		day = "0" + day;
	}
	
	return year + "-" + month + "-" + day;
}

export { ToAPIDate };