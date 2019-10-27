import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {MaterialModule} from '../material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import { ProfileDashboardComponent } from './profile-dashboard/profile-dashboard.component';



@NgModule({
  declarations: [ProfileComponent, ProfileDashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule
  ],
  exports: [ProfileComponent]
})
export class ProfileModule { }
