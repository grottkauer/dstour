import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', '../main/creative.min.css']
})
export class NavbarComponent {

  user = JSON.parse(sessionStorage.getItem('currentUser'));
  isLoggedIn = sessionStorage.getItem('currentUser') !== null;
  // isLoggedIn = this.authService.isLoggedIn();

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    console.log(this.isLoggedIn);
    console.log(sessionStorage.getItem('currentUser'));
    console.log(this.user);
  }

  logout() {
    this.authService.logout();
      // .then(() => this.router.navigate(['/main']));
  }

}
