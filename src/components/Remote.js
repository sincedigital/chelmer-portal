import { Chelmer } from './Constants.js';
import Authentication from './Authentication.js';

const Remote = {
	getHoldings: function(date, handler, unauthorised, timeout) {
		const requestedId = this.getCurrentPortfolio();
		console.log("ID from local: " + requestedId);
		if (requestedId) {
			const data = this.getHoldingsFromCache(requestedId, date);
			if (data != null) {
				console.log(data);
				//Kind of a hack ... but if we don't breath this returns too fast and react hasn't mounted the page yet
				setTimeout(()=>handler(data), 400);
				return;
			}
		}

		const url = Chelmer.baseUrl + Chelmer.holdings 
			+ "?sessionId=" + Authentication.getSessionToken()
			+ "&requestedOnBehalfOf=" + Authentication.getLoginName()
			+ "&requestCost=true"
			+ "&asAtDate=" + date;
		
		this.remoteRequest(url, data=>{
			var id = this.getCurrentPortfolio();

			if (!id) {
				id = data.data[0].portfolioCode;
				this.setCurrentPortfolio(id);
			}
			handler(this.addHoldingsToCache(date, data, id));
		}, unauthorised, timeout);
	},

	getPerformance: function(start, end, handler, unauthorised, timeout) {
		const id = this.getCurrentPortfolio();
		const data = this.getPerformanceFromCache(id, start, end);
		if (data != null) {
			console.log(data);
			//Kind of a hack ... but if we don't breath this returns too fast and react hasn't mounted the page yet
			setTimeout(()=>handler(data), 400);
			return;
		}

		const url = Chelmer.baseUrl + Chelmer.performance 
			+ "?sessionId=" + Authentication.getSessionToken()
			+ "&requestedOnBehalfOf=" + Authentication.getLoginName()
			+ "&portfolioCode=" + id
			+ "&startDate=" + start
			+ "&endDate=" + end
			+ "&currencyCode=NZD"
			+ "&reportingGroup=Asset%20Class";
		
		this.remoteRequest(url, data=>{this.addPerformanceToCache(id, start, end, data); handler(data);}, unauthorised, timeout);
	},

	getTransactions: function(start, end, handler, unauthorised, timeout) {
		const url = Chelmer.baseUrl + Chelmer.transactions 
			+ "?sessionId=" + Authentication.getSessionToken()
			+ "&requestedOnBehalfOf=" + Authentication.getLoginName()
			+ "&portfoliosCodes=" + this.getCurrentPortfolio()
			+ "&startDate=" + start
			+ "&endDate=" + end
			+ "&itemsPerPage=10000"
		
		this.remoteRequest(url, handler, unauthorised, timeout);
	},
	
	getCurrentPortfolio: function() {
		return localStorage.getItem(this.getCurrentPortfolioStorageName());
	},
	
	getCurrentPortfolioStorageName: function() {
		return Authentication.getLoginName() + ".current-portfolio";
	},
	
	setCurrentPortfolio(portfolioCode) {
		localStorage.setItem(this.getCurrentPortfolioStorageName(), portfolioCode);
	},
	
	getHoldingsFromCache: function(id, date) {
		var cache = this.getCache("holdings-cache");
		const key = id + date;
		return cache[key];
	},
	
	getAvailablePortfolios: function() {
		return this.getCache("holdings-cache");
	},
	
	/**
	 * Returns the portfolio with the given id
	 */
	addHoldingsToCache: function(date, data, id) {
		const cache = this.getCache("holdings-cache");
		var toReturn = null;
		data.data.map((portfolio, idx)=>{
			const key = portfolio.portfolioCode + date;
			cache[key] = portfolio;
			if (portfolio.portfolioCode == id) {
				toReturn = portfolio;
			}
			return null;
		});

		this.storeCache("holdings-cache", cache);
		return toReturn;
	},
	
	getPerformanceFromCache: function(id, start, end) {
		var cache = this.getCache("performance-cache");
		const key = id + start + end;
		console.log("key is " + key);
		return cache[key];
	},
	
	addPerformanceToCache: function(id, start, end, data) {
		const cache = this.getCache("performance-cache");
		const key = id + start + end;
		cache[key] = data;

		this.storeCache("performance-cache", cache);
	},
	
	getCache: function(name) {
		var cache = sessionStorage.getItem(name);
		if (cache == null) {
			return {};
		}
		return JSON.parse(cache);
	},
	
	storeCache: function(name, cache) {
		sessionStorage.setItem(name, JSON.stringify(cache));
	},
	
	remoteRequest: function(url, handler, unauthorised, timeout) {
		if (!timeout) {
			Authentication.checkAuthentication(() => {
				console.log(url);
				fetch(url)
				.then((resp)=>{return resp.json();})
				.then((data)=>{
					handler(data);
				});
			}, ()=>{
				unauthorised();
			});
		} else {
			Authentication.checkAuthentication(() => {
				console.log(url);
				this.timeout(20000, fetch(url))
				.then((resp)=>{return resp.json();})
				.then((data)=>{
					handler(data);
				}).catch(e=>{
					if (timeout) timeout(e);
				});
			}, ()=>{
				unauthorised();
			});
		}
	},
	
	timeout: function(millis, promise) {
	  return new Promise(function(resolve, reject) {
	    setTimeout(function() {
	      reject(new Error("timeout"))
	    }, millis)
	    promise.then(resolve, reject)
	  })
	}
	
	
}

export default Remote;