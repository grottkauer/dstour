import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Attraction} from '../../models/attraction';

@Injectable({
  providedIn: 'root'
})
export class AttractionsService {

  private API_URL = '/attractions';

  constructor(private db: AngularFireDatabase) { }

  getAttractions(): Observable<Attraction[]> {
    return this.db.list<Attraction>(this.API_URL, ref =>
      ref.limitToFirst(1)).snapshotChanges()
      .pipe(map(response => response.map(attraction => this.assignKey(attraction))));
  }

  getAttraction(key: string): Observable<Attraction> {
    return this.db.object<Attraction>(`${this.API_URL}/${key}`).snapshotChanges()
      .pipe(map(attraction => this.assignKey(attraction)));
  }

  editAttraction(key: string, attraction: Attraction) {
    return this.db.object<Attraction>(`${this.API_URL}/${key}`).update(attraction);
  }

  removeAttraction(key: string) {
    return this.db.object(`${this.API_URL}/${key}`).remove();
  }

  addAttraction(attraction: Attraction) {
    return this.db.list<Attraction>(this.API_URL).push(attraction);
  }

  private assignKey(attraction) {
    return {...attraction.payload.val(), key: attraction.key};
  }
}
