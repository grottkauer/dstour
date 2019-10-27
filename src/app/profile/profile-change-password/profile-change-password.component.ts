import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['./profile-change-password.component.scss']
})
export class ProfileChangePasswordComponent implements OnInit {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      password: ['', {
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ] }],
      confirmPassword: ['']
    }, {validator: this.checkPasswords});
  }

  ngOnInit() {
  }

    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
      const pass = group.controls.password.value;
      const confirmPass = group.controls.confirmPassword.value;

      return pass === confirmPass ? null : { notSame: true };
    }

}
