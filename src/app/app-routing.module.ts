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
      { path: 'profile', component: ProfileComponent}
    ]
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
