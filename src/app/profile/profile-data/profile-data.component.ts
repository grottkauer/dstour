import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {UserService} from '../../core/services/user.service';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss']
})
export class ProfileDataComponent implements OnInit {

  isEditable = 0;
  myForm: FormGroup;
  user = JSON.parse(sessionStorage.getItem('currentUser'));

  constructor(private formBuilder: FormBuilder,
              private toast: MatSnackBar,
              private userService: UserService) { }

  ngOnInit() {
    this.buildForm();
  }

  changeEditable() {
    this.isEditable = (this.isEditable === 0) ? 1 : 0;
  }

  private buildForm() {
    this.myForm = this.formBuilder.group({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: [this.user.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]
    });
  }

  editUser() {
    console.log(this.myForm.value);
    this.user.firstName = this.myForm.value.firstName;
    this.user.lastName = this.myForm.value.lastName;
    this.user.email = this.myForm.value.email;
    console.log(this.user);
    sessionStorage.setItem('currentUser', JSON.stringify(this.user));
    this.userService.editUser(this.user.key, this.user)
      .then(this.onEditSuccess.bind(this), this.onFailure.bind(this));
  }

  private onEditSuccess() {
    this.toast.open('Edytowano dane użytkownika pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }

}
