import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Attraction} from '../../models/attraction';
import {AttractionsService} from '../../core/services/attractions.service';
import {TripAttraction} from '../../models/tripAttraction';
import {Trip} from '../../models/trip';

@Component({
  selector: 'app-profile-trip-quick-form',
  templateUrl: './profile-trip-quick-form.component.html',
  styleUrls: ['./profile-trip-quick-form.component.scss']
})
export class ProfileTripQuickFormComponent implements OnInit {

  @Input() editMode = true;
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

  myForm: FormGroup;
  user = JSON.parse(sessionStorage.getItem('currentUser'));
  attrs$: Attraction[];
  trip = JSON.parse(sessionStorage.getItem('currentTrip'));

  constructor(private formBuilder: FormBuilder,
              private attrService: AttractionsService) {
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
