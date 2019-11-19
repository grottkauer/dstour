import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Attraction} from '../../models/attraction';
import {map} from 'rxjs/operators';
import {Trip} from '../../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private API_URL = '/trips';

  constructor(private db: AngularFireDatabase) { }

  getTrips(): Observable<Trip[]> {
    return this.db.list<Trip>(this.API_URL).snapshotChanges()
      .pipe(map(response => response.map(item => this.assignKey(item))));
  }

  getTrip(key: string): Observable<Trip> {
    return this.db.object<Trip>(`${this.API_URL}/${key}`).snapshotChanges()
      .pipe(map(item => this.assignKey(item)));
  }

  getTripsByUser(userRef): Observable<Trip[]> {
    return this.db.list<Trip>(this.API_URL, ref => ref.orderByChild('userRef').equalTo(userRef)).snapshotChanges()
      .pipe(map(response => response.map(item => this.assignKey(item))));
  }

  editTrip(key: string, item: Trip) {
    return this.db.object<Trip>(`${this.API_URL}/${key}`).update(item);
  }

  removeTrip(key: string) {
    return this.db.object(`${this.API_URL}/${key}`).remove();
  }

  addTrip(item: Trip) {
    return this.db.list<Trip>(this.API_URL).push(item);
  }

  private assignKey(attraction) {
    return {...attraction.payload.val(), key: attraction.key};
  }
}
