import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from './material/material.module';
import {FooterComponent} from './core/footer/footer.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent,
        FooterComponent ],
      imports: [
        RouterTestingModule,
        MaterialModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
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
