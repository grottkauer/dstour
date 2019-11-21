import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {ProposedTask} from '../../models/proposed-task';
import {map} from 'rxjs/operators';
import {Proposition} from '../../models/proposition';

@Injectable({
  providedIn: 'root'
})
export class PropositionService {

  private API_URL = '/propositions';

  constructor(private db: AngularFireDatabase) { }

  getPropositions(): Observable<Proposition[]> {
    return this.db.list<Proposition>(this.API_URL).snapshotChanges()
      .pipe(map(response => response.map(item => this.assignKey(item))));
  }

  getProposition(key: string): Observable<Proposition> {
    return this.db.object<Proposition>(`${this.API_URL}/${key}`).snapshotChanges()
      .pipe(map(item => this.assignKey(item)));
  }

  addProposition(item: Proposition) {
    return this.db.list<Proposition>(this.API_URL).push(item);
  }

  removeProposition(key: string) {
    return this.db.object(`${this.API_URL}/${key}`).remove();
  }

  private assignKey(item) {
    return {...item.payload.val(), key: item.key};
  }
}
