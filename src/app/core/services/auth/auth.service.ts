import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../http/http.service';
import { JwtHelperService } from "@auth0/angular-jwt";
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService, private router: Router) { }

  logOut() {
    localStorage.clear();
    // this.router.navigate(['/login']);
  }

  isAuthenticated() {
    try {
      const token = JSON.parse(localStorage.getItem('token') || '{}');
      const decodedToken = helper.decodeToken(token);
      const isExpired = helper.isTokenExpired(token);
      return !!decodedToken && !isExpired;
    }
    catch (ex) {
      return false;
    }
  }
}
