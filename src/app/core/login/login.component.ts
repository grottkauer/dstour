import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {User} from '../../models/user';

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
    private authService: AuthService,
    private userService: UserService
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
    const user$ = {
      email: '',
      login: this.credentials.login,
      password: this.credentials.password,
      firstName: '',
      lastName: '',
      role: 'Podróżnik'
    };
    let userByLogin: User[];
    this.userService.getUserByLogin(this.credentials.login)
      .subscribe(val => {
        userByLogin = val;
        if (val.length > 0) {
          console.log(userByLogin);
          this.toast.open('Użytkownik o podanym loginie już istnieje!', '', {panelClass: 'toast-error'});
        } else {
          console.log(val.length);
          this.userService.addUser(user$).then(this.onToastSuccess.bind(this));
        }
      });
  }

  private onToastSuccess() {
    this.toast.open('Konto założone, proszę zaloguj się!', '', {panelClass: 'toast-success'});
  }
}
