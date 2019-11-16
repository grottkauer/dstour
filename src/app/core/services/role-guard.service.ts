import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public router: Router,
              public authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.roles;
    console.log('sesja: ' + sessionStorage.getItem('userRole'));
    console.log('oczekiwana: ' + expectedRole);
    console.log('indexOf: ' + expectedRole.indexOf(sessionStorage.getItem('userRole')));
    if (expectedRole.indexOf(sessionStorage.getItem('userRole')) === -1) {
      this.router.navigate(['/404']);
      return false;
    }
    return true;
  }
}
