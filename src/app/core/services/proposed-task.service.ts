import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProposedTask} from '../../models/proposed-task';
import {Rated} from '../../models/rated';

@Injectable({
  providedIn: 'root'
})
export class ProposedTaskService {

  private API_URL = '/proposedTasks';

  constructor(private db: AngularFireDatabase) { }

  getProposedTasks(): Observable<ProposedTask[]> {
    return this.db.list<ProposedTask>(this.API_URL).snapshotChanges()
      .pipe(map(response => response.map(item => this.assignKey(item))));
  }

  getProposedTask(key: string): Observable<ProposedTask> {
    return this.db.object<ProposedTask>(`${this.API_URL}/${key}`).snapshotChanges()
      .pipe(map(item => this.assignKey(item)));
  }

  getProposedTaskByAttr(attrRef): Observable<ProposedTask[]> {
    return this.db.list<ProposedTask>(this.API_URL, ref => ref.orderByChild('attrRef').equalTo(attrRef)).snapshotChanges()
      .pipe(map(response => response.map(item => this.assignKey(item))));
  }

  addProposedTask(item: ProposedTask) {
    return this.db.list<ProposedTask>(this.API_URL).push(item);
  }

  removeProposedTask(key: string) {
    return this.db.object(`${this.API_URL}/${key}`).remove();
  }

  private assignKey(item) {
    return {...item.payload.val(), key: item.key};
  }
}
