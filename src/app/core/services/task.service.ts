import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Task} from '../../models/task';
import {map} from 'rxjs/operators';
import {Favorite} from '../../models/favorite';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private API_URL = '/tasks';

  constructor(private db: AngularFireDatabase) { }

  getTasks(): Observable<Task[]> {
    return this.db.list<Task>(this.API_URL).snapshotChanges()
      .pipe(map(response => response.map(item => this.assignKey(item))));
  }

  getTask(key: string): Observable<Task> {
    return this.db.object<Task>(`${this.API_URL}/${key}`).snapshotChanges()
      .pipe(map(item => this.assignKey(item)));
  }

  getTasksByAttr(attrRef): Observable<Task[]> {
    return this.db.list<Task>(this.API_URL, ref => ref.orderByChild('attrRef').equalTo(attrRef)).snapshotChanges()
      .pipe(map(response => response.map(item => this.assignKey(item))));
  }

  addTask(item: Task) {
    return this.db.list<Task>(this.API_URL).push(item);
  }

  removeTask(key: string) {
    return this.db.object(`${this.API_URL}/${key}`).remove();
  }

  private assignKey(item) {
    return {...item.payload.val(), key: item.key};
  }
}
