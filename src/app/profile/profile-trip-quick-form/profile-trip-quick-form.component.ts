import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Attraction} from '../../models/attraction';
import {AttractionsService} from '../../core/services/attractions.service';
import {TripAttraction} from '../../models/tripAttraction';
import {Trip} from '../../models/trip';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-profile-trip-quick-form',
  templateUrl: './profile-trip-quick-form.component.html',
  styleUrls: ['./profile-trip-quick-form.component.scss'],
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
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}, */
    DatePipe
  ]
})
export class ProfileTripQuickFormComponent implements OnInit {

  @Input() editMode = true;

  myForm: FormGroup;
  user = JSON.parse(sessionStorage.getItem('currentUser'));
  attrs$: Attraction[];
  trip = JSON.parse(sessionStorage.getItem('currentTrip'));

  constructor(private formBuilder: FormBuilder,
              private attrService: AttractionsService,
              private datePipe: DatePipe) {
    this.attrService.getAttractions().subscribe(val => this.attrs$ = val);
    this.myForm = this.formBuilder.group({
      name: [this.trip.name, [Validators.required]],
      tripDate: [this.trip.tripDate],
      travelAgency: [this.trip.travelAgency],
      groupType: [this.trip.groupType],
      wage: [this.trip.wage],
      groupCount: [this.trip.groupCount],
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

  addAttr(attrTrip?: TripAttraction) {
    this.attr.push(this.buildAttr(attrTrip));
  }

  setTrip() {
    const {key, ...formData} = this.trip;
    this.myForm.patchValue(formData);
    formData.tripAttr.forEach(crewMember => this.addAttr(crewMember));
  }

  buildAttr(attrTrip: TripAttraction = {} as TripAttraction) {
    return this.formBuilder.group({
      attrName: [attrTrip.attrName || '', [Validators.required]],
      startHour: attrTrip.startHour || '',
      endHour: attrTrip.endHour || '',
      additionalGuide: attrTrip.additionalGuide || ''
    });
  }

}
