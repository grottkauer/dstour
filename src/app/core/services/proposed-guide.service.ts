import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProposedGuide} from '../../models/proposed-guide';
import {ProposedTask} from '../../models/proposed-task';

@Injectable({
  providedIn: 'root'
})
export class ProposedGuideService {

  private API_URL = '/proposedGuides';

  constructor(private db: AngularFireDatabase) { }

  getProposedGuides(): Observable<ProposedGuide[]> {
    return this.db.list<ProposedGuide>(this.API_URL).snapshotChanges()
      .pipe(map(response => response.map(item => this.assignKey(item))));
  }

  getProposedGuideByUser(userRef): Observable<ProposedGuide[]> {
    return this.db.list<ProposedGuide>(this.API_URL, ref => ref.orderByChild('userRef').equalTo(userRef)).snapshotChanges()
      .pipe(map(response => response.map(item => this.assignKey(item))));
  }

  addProposedGuide(item: ProposedGuide) {
    return this.db.list<ProposedGuide>(this.API_URL).push(item);
  }

  removeProposedGuide(key: string) {
    return this.db.object(`${this.API_URL}/${key}`).remove();
  }

  private assignKey(item) {
    return {...item.payload.val(), key: item.key};
  }
}
