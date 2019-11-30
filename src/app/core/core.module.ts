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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SidebarAttrComponent } from './sidebar-attr/sidebar-attr.component';
import { SidebarProfileComponent } from './sidebar-profile/sidebar-profile.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { ListuploadComponent } from './listupload/listupload.component';
import { DetailsUploadComponent } from './details-upload/details-upload.component';
import { Er404Component } from './er404/er404.component';
import {BotDetectCaptchaModule} from 'angular-captcha';



@NgModule({
  declarations: [DashboardComponent, LoginComponent, PageNotFoundComponent, ContactComponent, MainComponent, NavbarComponent, FooterComponent, SidebarAttrComponent, SidebarProfileComponent, FormUploadComponent, ListuploadComponent, DetailsUploadComponent, Er404Component],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    BotDetectCaptchaModule,
    ReactiveFormsModule
  ],
  exports: [DashboardComponent, LoginComponent, NavbarComponent, FooterComponent, SidebarAttrComponent, SidebarProfileComponent, FormUploadComponent, ListuploadComponent, DetailsUploadComponent]
})
export class CoreModule { }
