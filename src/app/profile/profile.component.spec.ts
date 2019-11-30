import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ProfileComponent} from './profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SidebarProfileComponent} from '../core/sidebar-profile/sidebar-profile.component';
import {ProfileDashboardComponent} from './profile-dashboard/profile-dashboard.component';
import {ProfileDataComponent} from './profile-data/profile-data.component';
import {ProfileChangePasswordComponent} from './profile-change-password/profile-change-password.component';
import {ProfileBecomeGuideComponent} from './profile-become-guide/profile-become-guide.component';
import {ProfileFavoritesComponent} from './profile-favorites/profile-favorites.component';
import {ProfileRatedAttrComponent} from './profile-rated-attr/profile-rated-attr.component';
import {ProfileCheckedAttrComponent} from './profile-checked-attr/profile-checked-attr.component';
import {ProfileStatsComponent} from './profile-stats/profile-stats.component';
import {ProfileTripsComponent} from './profile-trips/profile-trips.component';
import {ProfileAddTripComponent} from './profile-add-trip/profile-add-trip.component';
import {ProfileCheckedAttrDetailComponent} from './profile-checked-attr-detail/profile-checked-attr-detail.component';
import {ProfileTripDetailComponent} from './profile-trip-detail/profile-trip-detail.component';
import {ProfileTripDetailAttrCardComponent} from './profile-trip-detail-attr-card/profile-trip-detail-attr-card.component';
import {ProfileTripQuickFormComponent} from './profile-trip-quick-form/profile-trip-quick-form.component';
import {ProfileTripEditComponent} from './profile-trip-edit/profile-trip-edit.component';
import {ProfileRatedAttrFormComponent} from './profile-rated-attr-form/profile-rated-attr-form.component';
import {ProfileRatedAttrEditComponent} from './profile-rated-attr-edit/profile-rated-attr-edit.component';
import {ProfileNewGuidesComponent} from './profile-new-guides/profile-new-guides.component';
import {MaterialModule} from '../material/material.module';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {RouterModule} from '@angular/router';
import {NgbDatepickerModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {FavoriteService} from '../core/services/favorite.service';


describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent,
        SidebarProfileComponent,
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
        ProfileRatedAttrEditComponent,
        ProfileNewGuidesComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        Ng2SearchPipeModule,
        RouterModule,
        NgbDatepickerModule,
        MatNativeDateModule,
        MatDatepickerModule,
        NgbTimepickerModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should ', () => {
  //   const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
  //   expect(h1).toBeTruthy();
  //   expect(h1.textContent).toContain(0);
  // });
});
