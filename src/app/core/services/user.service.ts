import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Attraction} from '../../models/attraction';
import {map} from 'rxjs/operators';
import {User} from '../../models/user';
import {Rated} from '../../models/rated';
import {Task} from '../../models/task';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = '/users';

  constructor(private db: AngularFireDatabase) { }

  getUsers(): Observable<User[]> {
    return this.db.list<User>(this.API_URL).snapshotChanges()
      .pipe(map(response => response.map(user => this.assignKey(user))));
  }

  getRates(): Observable<Rated[]> {
    return this.db.list<Rated>(this.API_URL, ref => ref.child('ratedAttr')).snapshotChanges()
      .pipe(map(response => response.map(item => this.assignKey(item))));
  }

  getUserByLogin(login): Observable<User[]> {
    return this.db.list<User>(this.API_URL, ref => ref.orderByChild('login').equalTo(login)).snapshotChanges()
      .pipe(map(response => response.map(user => this.assignKey(user))));
  }

  getUserByPassword(password): Observable<User[]> {
    return this.db.list<User>(this.API_URL, ref => ref.orderByChild('password').equalTo(password)).snapshotChanges()
      .pipe(map(response => response.map(user => this.assignKey(user))));
  }

  getUser(key: string): Observable<User> {
    return this.db.object<User>(`${this.API_URL}/${key}`).snapshotChanges()
      .pipe(map(user => this.assignKey(user)));
  }

  editUser(key: string, item: User) {
    return this.db.object<User>(`${this.API_URL}/${key}`).update(item);
  }

  addUser(item) {
    return this.db.list<User>(this.API_URL).push(item);
  }

  private assignKey(user) {
    return {...user.payload.val(), key: user.key};
  }
}
