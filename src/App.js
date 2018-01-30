import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AuthenticatedRoute from './components/AuthenticatedRoute.js';
import Login from './components/Login.js';
import Dashboard from './Dashboard.js';
import PortfolioPage from './PortfoliosPage.js';
import TransactionsPage from './TransactionsPage.js';
import DocumentsPage from './DocumentsPage.js';
import SettingsPage from './SettingsPage.js';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
      	<Switch>
         <Route path="/login" component={Login} />
         <AuthenticatedRoute path="/dashboard" component={Dashboard} />
         <AuthenticatedRoute path="/portfolios" component={PortfolioPage} />
         <AuthenticatedRoute path="/transactions" component={TransactionsPage} />
         <AuthenticatedRoute path="/documents" component={DocumentsPage} />
         <AuthenticatedRoute path="/settings" component={SettingsPage} />
         <Route exact path='/'>
	      	<Redirect to="/dashboard" />
	     </Route>
	    </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;