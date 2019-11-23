import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttractionsComponent } from './attractions.component';
import {MaterialModule} from '../material/material.module';
import { AttractionCardComponent } from './attraction-card/attraction-card.component';
import {NewAttractionComponent} from './new-attraction/new-attraction.component';
import { AttractionFormComponent } from './attraction-form/attraction-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import { AttractionDetailComponent } from './attraction-detail/attraction-detail.component';
import {RouterModule} from '@angular/router';
import { AttractionNewQuestionComponent } from './attraction-new-question/attraction-new-question.component';
import { AttractionQuestionFormComponent } from './attraction-question-form/attraction-question-form.component';
import { AttractionProposeQuestionComponent } from './attraction-propose-question/attraction-propose-question.component';
import { AttractionQuizComponent } from './attraction-quiz/attraction-quiz.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { EditTaskComponent } from './edit-task/edit-task.component';



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
    AttractionQuizComponent,
    EditTaskComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule,
    RouterModule,
    NgbModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  entryComponents: [
    NewAttractionComponent,
    AttractionNewQuestionComponent,
    AttractionProposeQuestionComponent,
    AttractionQuizComponent,
    EditTaskComponent
  ],
  exports: [AttractionsComponent]
})
export class AttractionsModule { }
