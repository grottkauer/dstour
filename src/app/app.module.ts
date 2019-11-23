import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {MaterialModule} from './material/material.module';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {CoreModule} from './core/core.module';
import {AttractionsModule} from './attractions/attractions.module';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import {DashboardComponent} from './core/dashboard/dashboard.component';
import {ProfileModule} from './profile/profile.module';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {FormsModule} from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MaterialModule,
    AngularFireAuthModule,
    AttractionsModule,
    ChartModule,
    ProfileModule,
    FormsModule,
    Ng2SearchPipeModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
