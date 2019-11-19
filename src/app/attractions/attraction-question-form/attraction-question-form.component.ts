import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-attraction-question-form',
  templateUrl: './attraction-question-form.component.html',
  styleUrls: ['./attraction-question-form.component.scss'],
  providers: [DatePipe]
})
export class AttractionQuestionFormComponent implements OnInit {

  @Input() editMode = false;

  form: FormGroup;
  answers = [
    { answer: 'a', value: 1 },
    { answer: 'b', value: 2 },
    { answer: 'c', value: 3 },
    { answer: 'd', value: 4 }
  ];
  currentDate = new Date();
  myDate = this.datePipe.transform(this.currentDate, 'dd.MM.yyyy');
  constructor(private formBuilder: FormBuilder,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      question: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answerCorrect: '',
      attrRef: '',
      addDate: this.myDate
    });
  }

}
