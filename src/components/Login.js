import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './login.css';
import Authentication from './Authentication.js';


class LoginPage extends Component {
	
	state = {
		buttonText: "Login"
	};
	
	constructor(props) {
		super(props);
		this.submitForm = this.submitForm.bind(this);
	
	};
	
	submitForm(event) {
		event.preventDefault();
		
		Authentication
		.login(this.state.name, this.state.pwd)
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				this.setState({"buttonText": 'Invalid username or password. Please try again.'});
			}
		}).then((data) => {
			console.log(data);
			if (data.tokenId) {
				console.log("Got a token.  Authenticating");
				Authentication.authenticate(data);
				console.log("Redirect is " + this.state.referrer);
				var url = this.state.referrer || '/dashboard';
				if (url === '/login' || url === '/')
					url = '/dashboard';
		
				this.setState({"redirectTo": url});
			}
		});
		console.log("submitted");
	}
	
	
  render() {
	  if (this.state.redirectTo) {
		  return (<Redirect to={this.state.redirectTo} />);
	  } 

    return (
    	<div id="login">
    		<form id="loginForm" onSubmit={this.submitForm}>
    			<header>Login</header>
    			<label>Username <span>*</span></label>
    			<input type="text" name="username" id="loginUsername" onChange={(e)=>this.setState({"name": e.target.value})} />
    			<div className="help">Use your Chelmer Fusion username</div>
    			<label>Password <span>*</span></label>
    			<input type="password" name="password" id="loginPassword" onChange={(e)=>this.setState({"pwd": e.target.value})} />
    			<div className="help">Use the password supplied to authenticate to the Fusion portal</div>
    			<button type="submit" id="loginSubmit">{this.state.buttonText}</button> 
    		</form>
    	</div>
    );
  }
}

export default LoginPage;
