import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile-rated-attr-form',
  templateUrl: './profile-rated-attr-form.component.html',
  styleUrls: ['./profile-rated-attr-form.component.scss']
})
export class ProfileRatedAttrFormComponent implements OnInit {

  @Input() editMode = false;
  rates = [
    { rate: 1 },
    { rate: 2 },
    { rate: 3 },
    { rate: 4 },
    { rate: 5 }
  ];

  myForm: FormGroup;
  rate = JSON.parse(sessionStorage.getItem('attrRate'));

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      rate: [this.rate.rate, [Validators.required]]
    });
  }

  ngOnInit() {
  }

}
