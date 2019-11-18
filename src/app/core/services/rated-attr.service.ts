import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Favorite} from '../../models/favorite';
import {map} from 'rxjs/operators';
import {User} from '../../models/user';
import {Rated} from '../../models/rated';
import {Attraction} from '../../models/attraction';

@Injectable({
  providedIn: 'root'
})
export class RatedAttrService {

  private API_URL = '/ratedAttr';

  constructor(private db: AngularFireDatabase) { }

  getRates(): Observable<Rated[]> {
    return this.db.list<Rated>(this.API_URL).snapshotChanges()
      .pipe(map(response => response.map(item => this.assignKey(item))));
  }

  getRatedByUser(userRef): Observable<Rated[]> {
    return this.db.list<Rated>(this.API_URL, ref => ref.orderByChild('userRef').equalTo(userRef)).snapshotChanges()
      .pipe(map(response => response.map(item => this.assignKey(item))));
  }

  getRated(key: string): Observable<Rated> {
    return this.db.object<Rated>(`${this.API_URL}/${key}`).snapshotChanges()
      .pipe(map(item => this.assignKey(item)));
  }

  editRate(key: string, item: Rated) {
    return this.db.object<Rated>(`${this.API_URL}/${key}`).update(item);
  }

  addRate(item: Rated) {
    return this.db.list<Rated>(this.API_URL).push(item);
  }

  removeRate(key: string) {
    return this.db.object(`${this.API_URL}/${key}`).remove();
  }

  private assignKey(item) {
    return {...item.payload.val(), key: item.key};
  }
}
