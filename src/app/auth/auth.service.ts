import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { AUTH_CONFIG } from './auth-config';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  
   chelmer: {
      baseUrl: 'http://chm-qa33-css.chelmer.co.nz:8080/webservice/rest',
      login: '/security/login',
      sessionValidate: '/security/validate/sessions/'
  };
  
  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  constructor(private router: Router, private http: HttpClient) {
    // If authenticated, set local profile property and update login status subject
    // If token is expired, log out to clear any data from localStorage
    if (this.authenticated) {
//      this.userProfile = JSON.parse(localStorage.getItem('profile'));
      this.setLoggedIn(true);
    } else {
      this.logout();
    }
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login(username: string, password: string) {
    console.log('login service login being called with ', username, password);
    return this.http.post<any>('http://chm-qa33-css.chelmer.co.nz:8080/webservice/rest/security/login', {username: username, password: password})
        .map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.tokenId) {
          console.log('got a token', user.tokenId);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', username);
          localStorage.setItem('token', user.tokenId);
        } else {
          console.log('no token', user);
        }
      return user;
    });
  }

  logout() {
    // Remove tokens and profile and update login status subject
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.setLoggedIn(false);
  }

  get authenticated(): boolean {
    // Check if current date is greater than expiration
    return localStorage.getItem('token') != null;
    
//    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
//    return Date.now() < expiresAt;
  }

}
