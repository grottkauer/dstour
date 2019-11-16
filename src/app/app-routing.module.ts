import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './core/login/login.component';
import {DashboardComponent} from './core/dashboard/dashboard.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {AttractionsComponent} from './attractions/attractions.component';
import {ContactComponent} from './core/contact/contact.component';
import {MainComponent} from './core/main/main.component';
import {AttractionDetailComponent} from './attractions/attraction-detail/attraction-detail.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfileTripDetailComponent} from './profile/profile-trip-detail/profile-trip-detail.component';
import {RoleGuardService} from './core/services/role-guard.service';
import {Er404Component} from './core/er404/er404.component';


const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path: 'main', component: MainComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'attractions', pathMatch: 'full' },
      { path: 'attractions', component: AttractionsComponent },
      { path: 'attractions/:key', component: AttractionDetailComponent},
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [RoleGuardService],
        data: {
          roles: ['Administrator', 'Podróżnik', 'Przewodnik']
        }
      },
      { path: 'profile/trips/1', component: ProfileTripDetailComponent}
    ]
  },
  { path: '404', component: Er404Component},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
