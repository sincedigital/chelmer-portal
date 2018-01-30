import { Chelmer } from './Constants.js';
import Authentication from './Authentication.js';

const Remote = {
	getHoldings: function(id, date, handler, unauthorised) {
		Authentication.checkAuthentication(() => {
			const url = Chelmer.baseUrl + Chelmer.holdings 
				+ "?sessionId=" + Authentication.getSessionToken()
				+ "&requestedOnBehalfOf=" + Authentication.getLoginName()
				+ "&portfoliosCodes=" + id
				+ "&asAtDate=" + date;
				
			console.log(url);
			fetch(url)
				.then((resp)=>{return resp.json();})
				.then((data)=>{
					handler(data);
				});
		}, ()=>{
			unauthorised();
		});
	}
	
	
}

export default Remote;