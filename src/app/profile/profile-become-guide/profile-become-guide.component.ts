import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile-become-guide',
  templateUrl: './profile-become-guide.component.html',
  styleUrls: ['./profile-become-guide.component.scss']
})
export class ProfileBecomeGuideComponent implements OnInit {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required]],
      reason: ['']
    });
  }

  ngOnInit() {
  }

}
