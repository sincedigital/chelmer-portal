const NumberFormat = (props) => {
	
	const amount = props.value || 0;
	const places = props.places || 0;
	const prefix = props.prefix || '';
	const suffix = props.suffix || '';

	var dollars = "";
	var index = 0;
	if (places > 0) {
		dollars += amount.toFixed(places);
		index = dollars.indexOf(".");
	} else {
		dollars += amount.toFixed(0);
		index = dollars.length;
	}
	
	var negative = false;
	if (dollars.indexOf("-") === 0) {
		negative = true;
		dollars = dollars.substring(1);
	}
	for (var i = index-3; i>0; i-=3) {
		dollars = dollars.substring(0, i) + "," + dollars.substring(i); 
	}
	
	return (negative ? "-" : "") + prefix + dollars + suffix;
}

export default NumberFormat;