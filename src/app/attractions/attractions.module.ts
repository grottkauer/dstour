import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttractionsComponent } from './attractions.component';
import {MaterialModule} from '../material/material.module';
import { AttractionCardComponent } from './attraction-card/attraction-card.component';
import {NewAttractionComponent} from './new-attraction/new-attraction.component';
import { AttractionFormComponent } from './attraction-form/attraction-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import { AttractionDetailComponent } from './attraction-detail/attraction-detail.component';
import {RouterModule} from '@angular/router';
import { AttractionNewQuestionComponent } from './attraction-new-question/attraction-new-question.component';
import { AttractionQuestionFormComponent } from './attraction-question-form/attraction-question-form.component';
import { AttractionProposeQuestionComponent } from './attraction-propose-question/attraction-propose-question.component';
import { AttractionQuizComponent } from './attraction-quiz/attraction-quiz.component';



@NgModule({
  declarations: [
    AttractionsComponent,
    AttractionCardComponent,
    NewAttractionComponent,
    AttractionFormComponent,
    AttractionDetailComponent,
    AttractionNewQuestionComponent,
    AttractionQuestionFormComponent,
    AttractionProposeQuestionComponent,
    AttractionQuizComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule,
    RouterModule
  ],
  entryComponents: [
    NewAttractionComponent,
    AttractionNewQuestionComponent,
    AttractionProposeQuestionComponent,
    AttractionQuizComponent
  ],
  exports: [AttractionsComponent]
})
export class AttractionsModule { }
