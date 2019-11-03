import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-attraction-question-form',
  templateUrl: './attraction-question-form.component.html',
  styleUrls: ['./attraction-question-form.component.scss']
})
export class AttractionQuestionFormComponent implements OnInit {

  @Input() editMode = false;

  form: FormGroup;
  answers = [
    { answer: 'a' },
    { answer: 'b' },
    { answer: 'c' },
    { answer: 'd' }
  ];
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      question: '',
      odpA: '',
      odpB: '',
      odpC: '',
      odpD: '',
      poprawna: ''
    });
  }

}
