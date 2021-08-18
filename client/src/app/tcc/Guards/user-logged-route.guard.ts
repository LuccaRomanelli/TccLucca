import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../Services';

@Injectable()
export class UserLoggedRouteGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getAuthToken();
    if (token) {
      this.router.navigate(['home']);
      return false;
    }
    else {
      return true;
    }
  }

}
