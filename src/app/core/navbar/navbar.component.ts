import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router'
import {DashboardComponent} from '../dashboard/dashboard.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', '../main/creative.min.css']
})
export class NavbarComponent {

  user = this.authService.user;
  isLoggedIn = this.authService.isLoggedIn();

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/main']));
  }

}
