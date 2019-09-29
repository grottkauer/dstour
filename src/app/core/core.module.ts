import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MaterialModule} from '../material/material.module';
import {RouterModule} from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [DashboardComponent, LoginComponent, PageNotFoundComponent, ContactComponent, MainComponent, NavbarComponent, FooterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule
  ],
  exports: [DashboardComponent, LoginComponent, NavbarComponent, FooterComponent]
})
export class CoreModule { }
