import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Attraction} from '../../models/attraction';
import {Router} from '@angular/router';
import {NewAttractionComponent} from '../../attractions/new-attraction/new-attraction.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProfileTripEditComponent} from '../profile-trip-edit/profile-trip-edit.component';
import {TripService} from '../../core/services/trip.service';
import {Observable} from 'rxjs';
import {Trip} from '../../models/trip';
import {AttractionsService} from '../../core/services/attractions.service';

@Component({
  selector: 'app-profile-trips',
  templateUrl: './profile-trips.component.html',
  styleUrls: ['./profile-trips.component.scss']
})
export class ProfileTripsComponent implements OnInit {

  @Input() editMode = false;
  searchText;
  heroes = [
    { id: 11, name: 'Mr. Nice', country: 'India' },
    { id: 12, name: 'Narco' , country: 'USA'},
    { id: 13, name: 'Bombasto' , country: 'UK'},
    { id: 14, name: 'Celeritas' , country: 'Canada' },
    { id: 15, name: 'Magneta' , country: 'Russia'},
    { id: 16, name: 'RubberMan' , country: 'China'},
    { id: 17, name: 'Dynama' , country: 'Germany'},
    { id: 18, name: 'Dr IQ' , country: 'Hong Kong'},
    { id: 19, name: 'Magma' , country: 'South Africa'},
    { id: 20, name: 'Tornado' , country: 'Sri Lanka'}
  ];
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
      tripDate: [''],
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

  goToDetail() {
    this.router.navigate(['/dashboard/profile/trips', 1]);
  }

  openEditTripModal() {
    this.dialog.open(ProfileTripEditComponent);
  }

  createTrip() {
    console.log(this.myForm.value);
    this.tripService.addTrip(this.myForm.value)
      .then(this.onAddTripSuccess.bind(this), this.onFailure.bind(this));
  }

  private onAddTripSuccess() {
    this.toast.open('Dodano wycieczkę pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }
}
