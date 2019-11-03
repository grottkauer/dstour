import {Component, OnInit, ViewChild} from '@angular/core';
import {AttractionQuestionFormComponent} from '../attraction-question-form/attraction-question-form.component';

@Component({
  selector: 'app-attraction-propose-question',
  templateUrl: './attraction-propose-question.component.html',
  styleUrls: ['./attraction-propose-question.component.scss']
})
export class AttractionProposeQuestionComponent implements OnInit {

  @ViewChild(`questionForm`, {static: false}) attractionForm: AttractionQuestionFormComponent;
  constructor() { }

  ngOnInit() {
  }

}
