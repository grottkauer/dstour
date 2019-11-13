import {Component, Input, OnInit, Type} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Attraction, AttractionType} from '../../models/attraction';

@Component({
  selector: 'app-attraction-form',
  templateUrl: './attraction-form.component.html',
  styleUrls: ['./attraction-form.component.scss']
})
export class AttractionFormComponent implements OnInit {

  @Input() editMode = false;

  form: FormGroup;
  types = [
    { label: 'Zamek', value: 'zamek'},
    { label: 'Pałac', value: 'palac'}
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
  }

  get phone() {
    return this.form.get('phone') as FormArray;
  }

  removePhone(i: number) {
    this.phone.removeAt(i);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      additionalInformation: '',
      name: '',
      key: '',
      shortInformation: '',
      longInformation: '',
      owner: '',
      coordinateX: null,
      coordinateY: null,
      city: '',
      email: '',
      phone: '',
      webpage: '',
      type: this.formBuilder.array(this.editMode ? [] : [this.buildTypeMember()])
    });
  }

}
