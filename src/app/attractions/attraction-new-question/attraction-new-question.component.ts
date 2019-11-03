import {Component, OnInit, ViewChild} from '@angular/core';
import {AttractionQuestionFormComponent} from '../attraction-question-form/attraction-question-form.component';

@Component({
  selector: 'app-attraction-new-question',
  templateUrl: './attraction-new-question.component.html',
  styleUrls: ['./attraction-new-question.component.scss']
})
export class AttractionNewQuestionComponent implements OnInit {

  @ViewChild(`attractionForm`, {static: false}) attractionForm: AttractionQuestionFormComponent;
  constructor() { }

  ngOnInit() {
  }

}
