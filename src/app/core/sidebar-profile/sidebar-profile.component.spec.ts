import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {RouterModule} from '@angular/router';
import {NgbDatepickerModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {SidebarProfileComponent} from './sidebar-profile.component';
import {MaterialModule} from '../../material/material.module';


describe('SidebarProfileComponent', () => {
  let component: SidebarProfileComponent;
  let fixture: ComponentFixture<SidebarProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarProfileComponent],
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
    fixture = TestBed.createComponent(SidebarProfileComponent);
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
