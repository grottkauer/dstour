import { Component, OnInit } from '@angular/core';
import {UserAnswerService} from '../../core/services/user-answer.service';
import {UserAnswer} from '../../models/user-answer';
import {TaskService} from '../../core/services/task.service';
import {Task} from '../../models/task';

@Component({
  selector: 'app-profile-checked-attr-detail',
  templateUrl: './profile-checked-attr-detail.component.html',
  styleUrls: ['./profile-checked-attr-detail.component.scss']
})
export class ProfileCheckedAttrDetailComponent implements OnInit {

  searchText;
  heroes = [
    { id: 11, name: 'Mr. Nice', country: 'India' },
    { id: 12, name: 'Narco' , country: 'USA'},
    { id: 13, name: 'Bombasto' , country: 'UK'},
    { id: 14, name: 'Celeritas' , country: 'Canada' },
    { id: 15, name: 'Magneta' , country: 'Russia'},
    { id: 16, name: 'RubberMan' , country: 'China'},
    { id: 17, name: 'Dynama' , country: 'Germany'},
    { id: 18, name: 'Dr IQ' , country: 'Hong Kong'},
    { id: 19, name: 'Magma' , country: 'South Africa'},
    { id: 20, name: 'Tornado' , country: 'Sri Lanka'}
  ];
  user = JSON.parse(sessionStorage.getItem('currentUser'));
  checked = JSON.parse(sessionStorage.getItem('currentChecked'));
  answersTest: any[] = [];
  tasks: Task[];

  constructor(private answerService: UserAnswerService,
              private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
    console.log('answers: ', this.answersTest);
  }

  private loadUserAnswers() {
    let answer: UserAnswer;
    this.answerService.getUserAnswersByUser(this.user.key)
      .subscribe(val => {
        for (let i = 0; i < val.length; i++) {
          answer = val[i];
          let taskByAnswer = this.getTaskByAnswer(this.tasks, answer);
          if (taskByAnswer !== null) {
            console.log('tba: ', taskByAnswer);
            this.getTextOfAnswers(taskByAnswer, answer);
          }
        }
      });
  }

  private loadTasks() {
    this.taskService.getTasksByAttr(this.checked.attrRef)
      .subscribe(val => {
        this.tasks = val;
        this.loadUserAnswers();
      });
  }

  private getTaskByAnswer(tasks: Task[], answer: UserAnswer) {
    for (let i = 0; i < tasks.length; i++) {
      if (answer.taskRef === tasks[i].key) {
        return tasks[i];
      }
    }
    return null;
  }

  private getTextOfAnswers(task: Task, answer: UserAnswer) {
    let correctAnswerText: string;
    let answerText: string;
    if (task.answerCorrect === 1) {
      correctAnswerText = task.answer1;
    } else if (task.answerCorrect === 2) {
      correctAnswerText = task.answer2;
    } else if (task.answerCorrect === 3) {
      correctAnswerText = task.answer3;
    } else {
      correctAnswerText = task.answer4;
    }

    if (+answer.answer === 1) {
      answerText = task.answer1;
    } else if (+answer.answer === 2) {
      answerText = task.answer2;
    } else if (+answer.answer === 3) {
      answerText = task.answer3;
    } else {
      answerText = task.answer4;
    }
    this.answersTest.push({
      answer: answer.answer,
      correctAnswer: answer.correctAnswer,
      question: task.question,
      correctText: correctAnswerText,
      answerUserText: answerText
    });
  }

}
