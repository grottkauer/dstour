import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Attraction} from '../../models/attraction';
import {map} from 'rxjs/operators';
import {User} from '../../models/user';

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

  getUserByLogin(login): Observable<User[]> {
    return this.db.list<User>(this.API_URL, ref => ref.limitToFirst(1)).snapshotChanges()
      .pipe(map(response => response.map(user => this.assignKey(user))));
  }

  getAttraction(key: string): Observable<User> {
    return this.db.object<User>(`${this.API_URL}/${key}`).snapshotChanges()
      .pipe(map(user => this.assignKey(user)));
  }

  private assignKey(user) {
    return {...user.payload.val(), key: user.key};
  }
}
