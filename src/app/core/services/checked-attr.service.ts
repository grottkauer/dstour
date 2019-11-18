import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Rated} from '../../models/rated';
import {map} from 'rxjs/operators';
import {CheckedAttr} from '../../models/checkedAttr';

@Injectable({
  providedIn: 'root'
})
export class CheckedAttrService {

  private API_URL = '/checkedAttr';

  constructor(private db: AngularFireDatabase) { }

  getCheckedAttrs(): Observable<CheckedAttr[]> {
    return this.db.list<CheckedAttr>(this.API_URL).snapshotChanges()
      .pipe(map(response => response.map(item => this.assignKey(item))));
  }

  getCheckedAttrByUser(userRef): Observable<CheckedAttr[]> {
    return this.db.list<CheckedAttr>(this.API_URL, ref => ref.orderByChild('userRef').equalTo(userRef)).snapshotChanges()
      .pipe(map(response => response.map(item => this.assignKey(item))));
  }

  getCheckedAttr(key: string): Observable<CheckedAttr> {
    return this.db.object<CheckedAttr>(`${this.API_URL}/${key}`).snapshotChanges()
      .pipe(map(item => this.assignKey(item)));
  }

  private assignKey(item) {
    return {...item.payload.val(), key: item.key};
  }
}
