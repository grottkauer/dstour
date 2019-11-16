import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {UserService} from './user.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(private userService: UserService,
              public router: Router) { }

  login(username: string, password: string) {
    this.subscribe(username);
    if (this.user != null) {
      if (this.user.password === password) {
        console.log(this.user);
        sessionStorage.setItem('currentUser', JSON.stringify(this.user));
        sessionStorage.setItem('userFirstName', this.user.firstName);
        sessionStorage.setItem('userLastName', this.user.lastName);
        sessionStorage.setItem('userKey', this.user.key);
        sessionStorage.setItem('userRole', this.user.role);
        sessionStorage.removeItem('wrongPassword', 'false');
        this.router.navigate(['/dashboard']);
      } else {
        sessionStorage.setItem('wrongPassword', 'true');
        console.log('Niepoprawne haslo');
      }
    }
  }

  subscribe(login: string) {
    const user$ = this.userService.getUserByLogin(login);
    user$.subscribe(val => this.user = val[0]);
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
