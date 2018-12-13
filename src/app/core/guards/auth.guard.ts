import { Injectable } from '@angular/core';
import {
  CanActivate, CanActivateChild, CanLoad,
  ActivatedRouteSnapshot, RouterStateSnapshot,
  Route, Router
} from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn) { return true; }

    console.log('access denied');
    this.router.navigate(['/login']);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean | boolean {
    return true;
  }

  canLoad(route: Route): boolean {
    return true;
  }
}
