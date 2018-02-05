import { Chelmer } from './Constants.js';
import Authentication from './Authentication.js';

const Remote = {
	getHoldings: function(id, date, handler, unauthorised, timeout) {
		const data = this.getHoldingsFromCache(id, date);
		if (data != null) {
			console.log(data);
			//Kind of a hack ... but if we don't breath this returns too fast and react hasn't mounted the page yet
			setTimeout(()=>handler(data), 400);
			return;
		}
		
		const url = Chelmer.baseUrl + Chelmer.holdings 
			+ "?sessionId=" + Authentication.getSessionToken()
			+ "&requestedOnBehalfOf=" + Authentication.getLoginName()
			+ "&portfoliosCodes=" + id
			+ "&requestCost=true"
			+ "&asAtDate=" + date;
		
		this.remoteRequest(url, data=>{this.addHoldingsToCache(id, date, data); handler(data);}, unauthorised, timeout);
	},

	getPerformance: function(id, start, end, handler, unauthorised, timeout) {
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

	getTransactions: function(id, start, end, handler, unauthorised, timeout) {
		const url = Chelmer.baseUrl + Chelmer.transactions 
			+ "?sessionId=" + Authentication.getSessionToken()
			+ "&requestedOnBehalfOf=" + Authentication.getLoginName()
			+ "&portfoliosCodes=" + id
			+ "&startDate=" + start
			+ "&endDate=" + end
			+ "&itemsPerPage=10000"
		
		this.remoteRequest(url, handler, unauthorised, timeout);
	},
	
	getHoldingsFromCache: function(id, date) {
		var cache = this.getCache("holdings-cache");
		const key = id + date;
		return cache[key];
	},
	
	addHoldingsToCache: function(id, date, data) {
		const cache = this.getCache("holdings-cache");
		const key = id + date;
		cache[key] = data;

		this.storeCache("holdings-cache", cache);
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