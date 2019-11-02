import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {MaterialModule} from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import { ProfileDashboardComponent } from './profile-dashboard/profile-dashboard.component';
import { ProfileDataComponent } from './profile-data/profile-data.component';
import { ProfileChangePasswordComponent } from './profile-change-password/profile-change-password.component';
import { ProfileBecomeGuideComponent } from './profile-become-guide/profile-become-guide.component';
import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';
import { ProfileRatedAttrComponent } from './profile-rated-attr/profile-rated-attr.component';
import { ProfileCheckedAttrComponent } from './profile-checked-attr/profile-checked-attr.component';
import { ProfileStatsComponent } from './profile-stats/profile-stats.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { ProfileTripsComponent } from './profile-trips/profile-trips.component';
import { ProfileAddTripComponent } from './profile-add-trip/profile-add-trip.component';
import { ProfileCheckedAttrDetailComponent } from './profile-checked-attr-detail/profile-checked-attr-detail.component';
import {ProfileTripDetailComponent} from './profile-trip-detail/profile-trip-detail.component';
import { ProfileTripDetailAttrCardComponent } from './profile-trip-detail-attr-card/profile-trip-detail-attr-card.component';
import {RouterModule} from '@angular/router';
import { ProfileTripQuickFormComponent } from './profile-trip-quick-form/profile-trip-quick-form.component';
import { ProfileTripEditComponent } from './profile-trip-edit/profile-trip-edit.component';
import { ProfileRatedAttrFormComponent } from './profile-rated-attr-form/profile-rated-attr-form.component';
import { ProfileRatedAttrEditComponent } from './profile-rated-attr-edit/profile-rated-attr-edit.component';



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileDashboardComponent,
    ProfileDataComponent,
    ProfileChangePasswordComponent,
    ProfileBecomeGuideComponent,
    ProfileFavoritesComponent,
    ProfileRatedAttrComponent,
    ProfileCheckedAttrComponent,
    ProfileStatsComponent,
    ProfileTripsComponent,
    ProfileAddTripComponent,
    ProfileCheckedAttrDetailComponent,
    ProfileTripDetailComponent,
    ProfileTripDetailAttrCardComponent,
    ProfileTripQuickFormComponent,
    ProfileTripEditComponent,
    ProfileRatedAttrFormComponent,
    ProfileRatedAttrEditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule,
    FormsModule,
    Ng2SearchPipeModule,
    RouterModule
  ],
  entryComponents: [
    ProfileTripEditComponent,
    ProfileRatedAttrEditComponent
  ],
  exports: [ProfileComponent]
})
export class ProfileModule { }
