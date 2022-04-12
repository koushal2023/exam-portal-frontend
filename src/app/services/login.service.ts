import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // we use subject here because as we are going from login page to dashboard page our isLoggedIn is not updated because 
  // our window will not get refereshed and OnInit method will not run to set isLoggedIn property globally we will use subject 
  // because All the subscribers, who subscribe to the subject will receive the same instance of the subject & hence the same values

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  // current user : which is loggedIn
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }
  // generate token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // login user:set token in localStorage
  public loginUser(token: any) {
    localStorage.setItem("token", token);
    return true;
  }

  // isLogin : to check user it logged in or not 
  public isLoggedIn() {
    let tokenStr = localStorage.getItem("token");
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  //logout : it basically remove token from localstorage
  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  // to get the token from localStorage
  public getToken() {
    return localStorage.getItem("token");
  }

  // to set user details in localstorage
  // json.stringify convert json into string
  public setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  // json.parse will convert the data into json
  public getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  // get user role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
