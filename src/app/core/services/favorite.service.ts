import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {map} from 'rxjs/operators';
import {Rated} from '../../models/rated';
import {Favorite} from '../../models/favorite';
import {Attraction} from '../../models/attraction';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private API_URL = '/favorites';

  constructor(private db: AngularFireDatabase) { }

  getFavorites(): Observable<Favorite[]> {
    return this.db.list<Favorite>(this.API_URL).snapshotChanges()
      .pipe(map(response => response.map(item => this.assignKey(item))));
  }

  getFavoritesByUser(userRef): Observable<Favorite[]> {
    return this.db.list<Favorite>(this.API_URL, ref => ref.orderByChild('userRef').equalTo(userRef)).snapshotChanges()
      .pipe(map(response => response.map(item => this.assignKey(item))));
  }

  getFavorite(key: string): Observable<User> {
    return this.db.object<Favorite>(`${this.API_URL}/${key}`).snapshotChanges()
      .pipe(map(item => this.assignKey(item)));
  }

  addFavorite(item) {
    return this.db.list<Favorite>(this.API_URL).push(item);
  }

  removeFavorite(key: string) {
    return this.db.object(`${this.API_URL}/${key}`).remove();
  }

  private assignKey(item) {
    return {...item.payload.val(), key: item.key};
  }
}
