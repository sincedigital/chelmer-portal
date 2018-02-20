import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';
import Authentication from './Authentication.js';


class LoginPage extends Component {
	
	state = {
		buttonText: "Login",
		failedLogin: false
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
				//this.setState({"buttonText": 'Invalid username or password. Please try again.'});
				this.setState({"failedLogin": true});
			}
		}).then((data) => {
//			console.log(data);
			if (data && data.tokenId) {
				Authentication.authenticate(data);
				var url = this.state.referrer || '/dashboard';
				if (url === '/login' || url === '/')
					url = '/dashboard';
		
				this.setState({"redirectTo": url});
			}
		});
	}
	
	
  render() {
	  if (this.state.redirectTo) {
		  return (<Redirect to={this.state.redirectTo} />);
	  } 

    return (
    	<div id="login">
    		<form id="loginForm" onSubmit={this.submitForm}>
    			<header>Login</header>
    			{this.state.failedLogin && <div className="alert alert-danger" role="alert">
	  			  Invalid username or password. Please try again.
	  			</div>}
    			<label>Username</label>
    			<input type="text" name="username" id="loginUsername" onChange={(e)=>this.setState({"name": e.target.value})} />
    			<div className="help">Use your Chelmer Fusion username</div>
    			<label>Password</label>
    			<input type="password" name="password" id="loginPassword" onChange={(e)=>this.setState({"pwd": e.target.value})} />
    			<div className="help">Use the password supplied to authenticate to the Fusion portal</div>
    			<button type="submit" id="loginSubmit">{this.state.buttonText}</button> 
    		</form>
    	</div>
    );
  }
}

export default LoginPage;
