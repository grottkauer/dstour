import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProposedGuideService} from '../../core/services/proposed-guide.service';
import {Trip} from '../../models/trip';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {ProposedGuide} from '../../models/proposed-guide';

@Component({
  selector: 'app-profile-become-guide',
  templateUrl: './profile-become-guide.component.html',
  styleUrls: ['./profile-become-guide.component.scss']
})
export class ProfileBecomeGuideComponent implements OnInit {
  myForm: FormGroup;
  user = JSON.parse(sessionStorage.getItem('currentUser'));
  userProp: ProposedGuide[];
  isProp = false;

  constructor(private formBuilder: FormBuilder,
              private proponedGuideService: ProposedGuideService,
              private toast: MatSnackBar,
              private router: Router) {
    this.myForm = this.formBuilder.group({
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      email: [this.user.email, [Validators.required]],
      reason: [''],
      userRef: this.user.key
    });
  }

  ngOnInit() {
    this.loadGuidePropositions();
  }

  createProposedGuide() {
    console.log(this.myForm.value);
    this.proponedGuideService.addProposedGuide(this.myForm.value)
      .then(this.onAddProposedGuideSuccess.bind(this), this.onFailure.bind(this));
    this.myForm.reset();
  }

  loadGuidePropositions() {
    this.proponedGuideService.getProposedGuideByUser(this.user.key)
      .subscribe(val => {
        this.userProp = val;
        if (val.length > 0) {
          this.isProp = true;
        }
      });
  }

  private onAddProposedGuideSuccess() {
    this.toast.open('Dodano propozycję zostania przewodnikiem pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }

}
