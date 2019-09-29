import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttractionsComponent } from './attractions.component';
import {MaterialModule} from '../material/material.module';
import { AttractionCardComponent } from './attraction-card/attraction-card.component';
import {NewAttractionComponent} from './new-attraction/new-attraction.component';
import { AttractionFormComponent } from './attraction-form/attraction-form.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [AttractionsComponent, AttractionCardComponent, NewAttractionComponent, AttractionFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [NewAttractionComponent],
  exports: [AttractionsComponent]
})
export class AttractionsModule { }
