import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  base_url = environment.DEVELOPMENT_API;
  private _loginUrl = this.base_url + '/auth/login/'
  private _registerUrl = this.base_url + '/auth/register/'
  private _refreshTokenUrl = this.base_url + '/auth/login/refresh/'
  private _userProfile = this.base_url + '/auth/user-profile/'


  constructor(private http: HttpClient, private _router: Router) { }


  // login
  loginUser(user): Observable<any> {
    return this.http.post<any>(this._loginUrl, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  // Logout
  logoutUser(): void {
    localStorage.clear();
    this._router.navigate(['/']);
  }

      // check if the user is logged in
  loggedIn(): boolean {
    if (localStorage.getItem('access_token') === null || localStorage.getItem('access_token') === undefined) {
      return false;
    } else{
      return true;
    }
  }

  // register
  UserRegistration(user) {
    return this.http.post<any>(this._registerUrl, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  getNewAccessToken(){
    const body = {
      refresh: localStorage.getItem('refresh_token')
    }
   return this.http.post(this._refreshTokenUrl, body)
  }

  userProfile() {
    return this.http.get(this._userProfile)
  }
}
