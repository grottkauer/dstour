import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {RouterModule} from '@angular/router';
import {NgbDatepickerModule, NgbModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {AttractionsComponent} from './attractions.component';
import {MaterialModule} from '../material/material.module';
import {SidebarAttrComponent} from '../core/sidebar-attr/sidebar-attr.component';
import {AttractionCardComponent} from './attraction-card/attraction-card.component';
import {FormUploadComponent} from '../core/form-upload/form-upload.component';
import {CoreModule} from '../core/core.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';


describe('AttractionsComponent', () => {
  let component: AttractionsComponent;
  let fixture: ComponentFixture<AttractionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AttractionsComponent,
        AttractionCardComponent
      ],
      imports: [
        ReactiveFormsModule,
        CoreModule,
        MaterialModule,
        Ng2SearchPipeModule,
        RouterModule,
        NgbDatepickerModule,
        MatNativeDateModule,
        MatDatepickerModule,
        NgbTimepickerModule,
        NgbModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('contains initial group of castles', () => {
    const castles = fixture.debugElement.query(By.css('#castles')).nativeElement;
    expect(castles).toBeTruthy();
  });

  it('not contains initial group of natural attractions', () => {
    const castles = fixture.debugElement.query(By.css('#natural'));
    expect(castles).toBeFalsy();
  });

  it('contains pagination', () => {
    const castles = fixture.debugElement.query(By.css('ngb-pagination')).nativeElement;
    expect(castles).toBeTruthy();
  });

  it('contains initial group of castles with name of castles', () => {
    const castlesName = fixture.debugElement.query(By.css('#castles h3')).nativeElement;
    expect(castlesName).toBeTruthy();
    expect(castlesName.textContent).toContain('Zamki');
  });

  // it('should ', () => {
  //   const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
  //   expect(h1).toBeTruthy();
  //   expect(h1.textContent).toContain(0);
  // });
});
