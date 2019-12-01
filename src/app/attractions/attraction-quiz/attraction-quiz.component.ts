import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../core/services/task.service';
import {Task} from '../../models/task';
import {UserAnswerService} from '../../core/services/user-answer.service';
import {CheckedAttrService} from '../../core/services/checked-attr.service';
import {DatePipe} from '@angular/common';
import {FavoriteService} from '../../core/services/favorite.service';

@Component({
  selector: 'app-attraction-quiz',
  templateUrl: './attraction-quiz.component.html',
  styleUrls: ['./attraction-quiz.component.scss'],
  providers: [DatePipe]
})
export class AttractionQuizComponent implements OnInit {

  i = 0;
  heroes = [
    { id: 11, q: 'Mr. Nice', o1: 'India', o2: 'ss' },
    { id: 12, q: 'Mr. dvsa', o1: 'dd', o2: 'ss'},
    { id: 13, q: 'sca. Nice', o1: 'cs', o2: 'sccs'},
    { id: 14, q: 'Mr. hcgj', o1: 'Indjfia', o2: 'ss'},
    { id: 15, q: 'Mr. Nice', o1: 'fjwe', o2: 'ss'},
    { id: 16, q: 'Mr. vdas', o1: 'd', o2: 'ss'},
    { id: 17, q: 'Mr. Nice', o1: 'jf', o2: 'ss'}
  ];
  quizlength = this.heroes.length;
  isCompleted = 0;
  user = JSON.parse(sessionStorage.getItem('currentUser'));
  attraction = JSON.parse(sessionStorage.getItem('currentAttr'));
  tasks: Task[];
  selectedAnswer: number;
  selectedAnswers: any[] = [];
  task: Task;
  checkedAttr;
  testResult: any[] = [];
  currentDate = new Date();
  myDate = this.datePipe.transform(this.currentDate, 'dd.MM.yyyy');

  constructor(private taskSevice: TaskService,
              private answersService: UserAnswerService,
              private checkedAttrService: CheckedAttrService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.taskSevice.getTasksByAttr(this.attraction.key)
      .subscribe(val => {
        this.tasks = val;
        this.quizlength = this.tasks.length;
        console.log(this.tasks);
      });
  }

  next() {
    ++this.i;
    console.log(this.task);
    this.selectedAnswer = +this.selectedAnswer;
    console.log(this.selectedAnswer);
    let taskKey = '';
    let answerCorrect = -2;
    if (!this.task) {
      taskKey = 'Brak pytania';
      answerCorrect = -2;
      this.selectedAnswer = -1;
    } else {
      taskKey = this.task.key;
      answerCorrect = this.task.answerCorrect;
    }
    this.selectedAnswers.push({
      answer: this.selectedAnswer,
      userRef: this.user.key,
      taskRef: taskKey,
      correctAnswer: answerCorrect
    });
    // get text of answers
    this.getTextOfAnswers(answerCorrect);
    console.log(this.selectedAnswers);
    this.selectedAnswer = -1;
  }
  previous() {
    --this.i;
    this.selectedAnswers.pop();
    this.testResult.pop();
    console.log(this.selectedAnswers);
  }

  radioChangeHandler(event: any, task: Task) {
    this.task = task;
    console.log(this.task);
    this.selectedAnswer = event.target.value;
  }

  private getTextOfAnswers(answerCorrect: number) {
    let correctAnswerText: string;
    let answerText: string;
    let quest = '';
    if (answerCorrect === 1) {
      correctAnswerText = this.task.answer1;
    } else if (answerCorrect === 2) {
      correctAnswerText = this.task.answer2;
    } else if (answerCorrect === 3) {
      correctAnswerText = this.task.answer3;
    } else if (answerCorrect === 4) {
      correctAnswerText = this.task.answer4;
    } else {
      correctAnswerText = 'Brak odpowiedzi';
      quest = 'Brak pytania';
    }

    if (this.selectedAnswer === 1) {
      answerText = this.task.answer1;
    } else if (this.selectedAnswer === 2) {
      answerText = this.task.answer2;
    } else if (this.selectedAnswer === 3) {
      answerText = this.task.answer3;
    } else if (this.selectedAnswer === 4) {
      answerText = this.task.answer4;
    } else {
      answerText = 'Brak odpowiedzi';
    }
    if (quest !== '') {
      this.testResult.push({
        answer: this.selectedAnswer,
        correctAnswer: answerCorrect,
        question: quest,
        correctText: correctAnswerText,
        answerUserText: answerText
      });
    } else {
      this.testResult.push({
        answer: this.selectedAnswer,
        correctAnswer: answerCorrect,
        question: this.task.question,
        correctText: correctAnswerText,
        answerUserText: answerText
      });
    }
  }

  generatemark() {
    this.selectedAnswer = +this.selectedAnswer;
    this.selectedAnswers.push({
      answer: this.selectedAnswer,
      userRef: this.user.key,
      taskRef: this.task.key,
      correctAnswer: this.task.answerCorrect
    });
    console.log(this.selectedAnswers);
    // get text of answers
    this.getTextOfAnswers(this.task.answerCorrect);

    let correctAnswers = 0;
    for (let i = 0; i < this.selectedAnswers.length; i++) {
      this.answersService.addUserAnswer(this.selectedAnswers[i]);
      if (this.selectedAnswers[i].answer === this.selectedAnswers[i].correctAnswer) {
        correctAnswers++;
      }
    }
    this.checkedAttr = {
      attrName: this.attraction.name,
      attrRef: this.attraction.key,
      checkDate: this.myDate,
      points: Math.round(((correctAnswers / this.selectedAnswers.length) * 100) * 100) / 100,
      tasksCount: this.selectedAnswers.length,
      userRef: this.user.key,
      login: this.user.login
    };
    this.checkedAttrService.addCheckedAttr(this.checkedAttr);
    console.log(this.checkedAttr);
    this.isCompleted = 1;

  }

}
