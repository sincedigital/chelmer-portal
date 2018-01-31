import { Chelmer } from './Constants.js';
import Authentication from './Authentication.js';

const Remote = {
	getHoldings: function(id, date, handler, unauthorised, timeout) {
		
		const url = Chelmer.baseUrl + Chelmer.holdings 
			+ "?sessionId=" + Authentication.getSessionToken()
			+ "&requestedOnBehalfOf=" + Authentication.getLoginName()
			+ "&portfoliosCodes=" + id
			+ "&asAtDate=" + date;
		
		this.remoteRequest(url, handler, unauthorised, timeout);
	},

	remoteRequest: function(url, handler, unauthorised, timeout) {
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