import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Attraction} from '../../models/attraction';
import {Router} from '@angular/router';
import {NewAttractionComponent} from '../../attractions/new-attraction/new-attraction.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDialog, MatSnackBar} from '@angular/material';
import {ProfileTripEditComponent} from '../profile-trip-edit/profile-trip-edit.component';
import {TripService} from '../../core/services/trip.service';
import {Observable} from 'rxjs';
import {Trip} from '../../models/trip';
import {AttractionsService} from '../../core/services/attractions.service';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

@Component({
  selector: 'app-profile-trips',
  templateUrl: './profile-trips.component.html',
  styleUrls: ['./profile-trips.component.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
   /* {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},*/
  ]
})
export class ProfileTripsComponent implements OnInit {

  @Input() editMode = false;
  searchText;
  user = JSON.parse(sessionStorage.getItem('currentUser'));

  myForm: FormGroup;
  trips: Observable<Trip[]>;
  attrs$: Attraction[];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private dialog: MatDialog,
              private tripService: TripService,
              private toast: MatSnackBar,
              private attrService: AttractionsService) {
    this.trips =  this.tripService.getTripsByUser(this.user.key);
    this.attrService.getAttractions().subscribe(val => this.attrs$ = val);
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      tripDate: '',
      travelAgency: [''],
      groupType: [''],
      wage: [''],
      groupCount: [''],
      tripAttr: this.formBuilder.array(this.editMode ? [] : [this.buildAttr()]),
      userRef: this.user.key
    });
  }

  ngOnInit() {
  }

  get attr() {
    return this.myForm.get('tripAttr') as FormArray;
  }

  removeAttr(i: number) {
    this.attr.removeAt(i);
  }

  addAttr(attrTrip?: Attraction) {
    this.attr.push(this.buildAttr(attrTrip));
  }

  buildAttr(attrTrip: Attraction = {} as Attraction) {
    return this.formBuilder.group({
      attrName: [attrTrip.name || '', [Validators.required]],
      startHour: '',
      endHour: '',
      additionalGuide: '',
      attrRef: attrTrip.key
    });
  }

  goToDetail(trip: Trip) {
    // this.router.navigate(['/dashboard/attractions', this.attraction.key]);
    this.router.navigate(['/dashboard/profile/trips', trip.key]);
  }

  openEditTripModal(trip: Trip) {
    sessionStorage.setItem('currentTrip', JSON.stringify(trip));
    this.dialog.open(ProfileTripEditComponent);
  }

  createTrip() {
    console.log(this.myForm.value);
    this.tripService.addTrip(this.myForm.value)
      .then(this.onAddTripSuccess.bind(this), this.onFailure.bind(this));
  }

  removeTrip(trip: Trip) {
    this.tripService.removeTrip(trip.key)
      .then(this.onRemoveTripSuccess.bind(this), this.onFailure.bind(this));
  }

  private onAddTripSuccess() {
    this.toast.open('Dodano wycieczkę pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onRemoveTripSuccess() {
    this.toast.open('Usunięto wycieczkę pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }
}
