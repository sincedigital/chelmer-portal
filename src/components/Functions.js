const ToAPIDate = function(date) {
	
	var year = date.getFullYear();
	var month = "" + (parseInt(date.getMonth(), 10)+1);
	if (month.length === 1) {
		month = "0" + month;
	}
	var day = "" + date.getDate();
	if (day.length === 1) {
		day = "0" + day;
	}
	
	return year + "-" + month + "-" + day;
}

const PortfolioFromHoldings = function(data) {
	var theGroups = [];
	var loadedPortfolio = {"parts":[], total:0};
	for (var i=0; i<data.data.length; i++) {
		var datachunk = data.data[i];
		loadedPortfolio.date = new Date(datachunk.asAtDate);
		
		for (var j=0; j<datachunk.holdings.length; j++) {
			var holding = datachunk.holdings[j];
			var group = holding.mkt;
			
			var theGroup = theGroups[group];
			if (theGroup == null) {
				theGroup = {"name": group, "holdings":[], "amount":0, "expanded": false};
				theGroups[group] = theGroup;
			}
			
			theGroup.holdings.push({"name": holding.name, value: holding.baseMv});
			theGroup.amount += holding.baseMv;
			
			loadedPortfolio.total += holding.baseMv;
		}
	}

	for (var key in theGroups) {
		loadedPortfolio.parts.push(theGroups[key]);
	};

	//Percentages
	var maxPercentage = 0;
	loadedPortfolio.parts.forEach(function(el) {
			var perc = (el.amount * 100 / loadedPortfolio.total );
			if (perc > maxPercentage) {
				maxPercentage = perc;
			}
			el.percentage = perc;
		});
	loadedPortfolio.parts.forEach(function(el) {
		el.maxPercentage = maxPercentage;
		});
	return loadedPortfolio;

}
export { ToAPIDate, PortfolioFromHoldings };