import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {RouterModule} from '@angular/router';
import {NgbDatepickerModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {MaterialModule} from '../../material/material.module';
import {SidebarAttrComponent} from './sidebar-attr.component';


describe('SidebarAttrComponent', () => {
  let component: SidebarAttrComponent;
  let fixture: ComponentFixture<SidebarAttrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SidebarAttrComponent],
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
    fixture = TestBed.createComponent(SidebarAttrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('contains initial type name', () => {
    const typeName = fixture.debugElement.query(By.css('.active div')).nativeElement;
    expect(typeName).toBeTruthy();
    expect(typeName.textContent).toContain('Zamki');
    const newType = fixture.debugElement.query(By.css('#natural')).nativeElement;
    expect(newType).toBeTruthy();
    newType.click();
    fixture.detectChanges();
    expect(typeName.textContent).toContain('Przyrodnicze');
  });
});
