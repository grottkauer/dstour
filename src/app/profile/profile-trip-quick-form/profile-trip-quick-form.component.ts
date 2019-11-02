import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Attraction} from '../../models/attraction';

@Component({
  selector: 'app-profile-trip-quick-form',
  templateUrl: './profile-trip-quick-form.component.html',
  styleUrls: ['./profile-trip-quick-form.component.scss']
})
export class ProfileTripQuickFormComponent implements OnInit {

  @Input() editMode = false;
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

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      tripName: ['', [Validators.required]],
      tripDate: [''],
      tourOperator: [''],
      groupType: [''],
      money: [''],
      countGroup: [''],
      attr: this.formBuilder.array(this.editMode ? [] : [this.buildAttr()])
    });
  }

  ngOnInit() {
  }

  get attr() {
    return this.myForm.get('attr') as FormArray;
  }

  removeAttr(i: number) {
    this.attr.removeAt(i);
  }

  addAttr(attrTrip?: Attraction) {
    this.attr.push(this.buildAttr(attrTrip));
  }

  buildAttr(attrTrip: Attraction = {} as Attraction) {
    return this.formBuilder.group({
      name: [attrTrip.name || '', [Validators.required]],
      timeIn: '',
      timeOut: '',
      additionalGuide: ''
    });
  }

}
