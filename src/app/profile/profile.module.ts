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



@NgModule({
  declarations: [ProfileComponent, ProfileDashboardComponent, ProfileDataComponent, ProfileChangePasswordComponent, ProfileBecomeGuideComponent, ProfileFavoritesComponent, ProfileRatedAttrComponent, ProfileCheckedAttrComponent, ProfileStatsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  exports: [ProfileComponent]
})
export class ProfileModule { }
