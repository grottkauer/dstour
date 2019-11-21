import {Component, Input, OnInit, Type} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Attraction} from '../../models/attraction';

@Component({
  selector: 'app-attraction-form',
  templateUrl: './attraction-form.component.html',
  styleUrls: ['./attraction-form.component.scss']
})
export class AttractionFormComponent implements OnInit {

  @Input() editMode = false;

  form: FormGroup;
  types = [
    { label: 'Zamki i pałace', value: 'Zamki i pałace'},
    { label: 'Wydarzenia', value: 'Wydarzenia'},
    { label: 'Miejsca historyczne', value: 'Miejsca historyczne'},
    { label: 'Budynki sakralne', value: 'Budynki sakralne'},
    { label: 'Przyrodnicze', value: 'Przyrodnicze'},
    { label: 'Obiekty techniki', value: 'Obiekty techniki'},
    { label: 'Dwory i dworki', value: 'Dwory i dworki'},
    { label: 'Pozostałe', value: 'Pozostałe'}
  ];
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  // setAttraction(attraction: Attraction) {
  //   const {key, ...formData} = attraction;
  //   this.form.patchValue(formData);
  //   formData.crew.forEach(crewMember => this.addCrewMember(crewMember));
  // }
/*
  get type() {
    return this.form.get('type') as FormArray;
  }

  removeType(i: number) {
    this.type.removeAt(i);
  }

  addType(typeMember?: AttractionType) {
    this.type.push(this.buildTypeMember(typeMember));
  }

  buildTypeMember(typeMember: AttractionType = {} as AttractionType) {
    return this.formBuilder.group({
      typeName: typeMember.typeName || ''
    });
  } */

  get phone() {
    return this.form.get('phone') as FormArray;
  }

  removePhone(i: number) {
    this.phone.removeAt(i);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      additionalInformation: '',
      name: ['', Validators.required],
      key: '',
      shortInformation: ['', Validators.required],
      longInformation: ['', Validators.required],
      owner: ['', Validators.required],
      coordinateX: [null, Validators.required],
      coordinateY: [null, Validators.required],
      city: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      webpage: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

}
