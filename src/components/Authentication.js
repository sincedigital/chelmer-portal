import { Chelmer } from './Constants.js';

const Authentication = {
		isAuthenticated() {
			return sessionStorage.getItem("chelmer-token") != null;
		},
		authenticate(props) {
			sessionStorage.setItem("chelmer-token", props.tokenId)
		},
		login(name, pwd) {
			sessionStorage.setItem("chelmer-username", name);
			return fetch(Chelmer.baseUrl + Chelmer.login, {
				method: 'post',
				headers: {'Content-Type':'application/json'},
				body: JSON.stringify({
					"username": name, 
					"password": pwd
				})
			});
		},
		clearAuthenticationState() {
			sessionStorage.removeItem("chelmer-token");
			sessionStorage.removeItem("chelmer-username");
		},
		checkAuthentication(success, failure) {
			failure = failure || {};
			success = success || {};
			
			if (!this.isAuthenticated()) {
				failure();
				return;
			}
			fetch(Chelmer.baseUrl + Chelmer.sessionValidate + sessionStorage.getItem("chelmer-token"))
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						this.clearAuthenticationState();
						failure();
						return;
					}
				})
				.then((data) => {
					if (!data) {
						this.clearAuthenticationState();
						failure();
					} else if (data.valid && data.valid === true) {
						success();
					} else {
						this.clearAuthenticationState();
						failure();
					}
				});
		},
		getSessionToken() {
			return sessionStorage.getItem("chelmer-token");
		},
		getLoginName() {
			return sessionStorage.getItem("chelmer-username");
		}
};

export default Authentication;