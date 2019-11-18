import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../core/services/user.service';
import {User} from '../../models/user';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-change-password',
  templateUrl: './profile-change-password.component.html',
  styleUrls: ['./profile-change-password.component.scss']
})
export class ProfileChangePasswordComponent implements OnInit {
  myForm: FormGroup;
  user = JSON.parse(sessionStorage.getItem('currentUser'));
  oldUserData: User;
  isGoodOldPassword = true;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private toast: MatSnackBar,
              private router: Router) {
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

    changePassword() {
      console.log(this.myForm.value);
      this.userService.getUserByPassword(this.user.password)
        .subscribe(val => {
          this.oldUserData = val[0];
          this.isGoodOldPassword = this.oldUserData.password === this.myForm.value.oldPassword;

          if (this.isGoodOldPassword) {
            this.user.password = this.myForm.value.password;
            console.log(this.user);
            sessionStorage.setItem('currentUser', JSON.stringify(this.user));
            this.userService.editUser(this.user.key, this.user)
              .then(this.onEditSuccess.bind(this), this.onFailure.bind(this));
          }
        });
    }

  private onEditSuccess() {
    this.router.navigate(['/dashboard']);
    this.toast.open('Zmiana hasła przebiegła pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }
}
