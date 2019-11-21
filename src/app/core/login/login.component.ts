import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide = true;
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();
  wrongPassword: string;

  credentials = {
    login: '',
    password: ''
  };

  constructor(
    private router: Router,
    private toast: MatSnackBar,
    private authService: AuthService
  ) {}

  login() {
    this.authService.login(this.credentials.login, this.credentials.password);
    this.wrongPassword = sessionStorage.getItem('wrongPassword');
  }

  enterLogin(event) {
    if (event.key === 'Enter') {
      console.log(event);
      this.login();
    }
  }

  register() {
    this.authService.register(this.credentials)
      .then(user => this.toast.open('Konto założone, proszę zaloguj się!', '', {panelClass: 'toast-success'}))
      .catch(error => this.toast.open(error.message, '', {panelClass: 'toast-error'}));
  }

}
