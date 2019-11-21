import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Task} from '../../models/task';
import {map} from 'rxjs/operators';
import {UserAnswer} from '../../models/user-answer';

@Injectable({
  providedIn: 'root'
})
export class UserAnswerService {

  private API_URL = '/userAnswers';

  constructor(private db: AngularFireDatabase) { }

  getUserAnswers(): Observable<UserAnswer[]> {
    return this.db.list<UserAnswer>(this.API_URL).snapshotChanges()
      .pipe(map(response => response.map(item => this.assignKey(item))));
  }

  getUserAnswer(key: string): Observable<UserAnswer> {
    return this.db.object<UserAnswer>(`${this.API_URL}/${key}`).snapshotChanges()
      .pipe(map(item => this.assignKey(item)));
  }

  getUserAnswersByTask(taskRef): Observable<UserAnswer[]> {
    return this.db.list<UserAnswer>(this.API_URL, ref => ref.orderByChild('taskRef').equalTo(taskRef)).snapshotChanges()
      .pipe(map(response => response.map(item => this.assignKey(item))));
  }

  getUserAnswersByUser(userRef): Observable<UserAnswer[]> {
    return this.db.list<UserAnswer>(this.API_URL, ref => ref.orderByChild('userRef').equalTo(userRef)).snapshotChanges()
      .pipe(map(response => response.map(item => this.assignKey(item))));
  }

  addUserAnswer(item: UserAnswer) {
    return this.db.list<UserAnswer>(this.API_URL).push(item);
  }

  removeUserAnswer(key: string) {
    return this.db.object(`${this.API_URL}/${key}`).remove();
  }

  private assignKey(item) {
    return {...item.payload.val(), key: item.key};
  }
}
