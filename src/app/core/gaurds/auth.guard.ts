import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token')) {
      return true;

    } else {
      let token: any = '';
      if (state.url.includes('token')) {
        token = state.url.split('token=').pop();
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigateByUrl('/');
          return true;
        } else {
          // this.router.navigate(['/login']);
        }
      } else {
        // this.router.navigate(['/login']);
      }

      return false;
    }
  }

}