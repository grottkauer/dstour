import {Component, OnInit, ViewChild} from '@angular/core';
import {ProfileTripQuickFormComponent} from '../profile-trip-quick-form/profile-trip-quick-form.component';
import {ProfileRatedAttrFormComponent} from '../profile-rated-attr-form/profile-rated-attr-form.component';
import {RatedAttrService} from '../../core/services/rated-attr.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-profile-rated-attr-edit',
  templateUrl: './profile-rated-attr-edit.component.html',
  styleUrls: ['./profile-rated-attr-edit.component.scss']
})
export class ProfileRatedAttrEditComponent implements OnInit {

  @ViewChild(`rateForm`, {static: false}) rateForm: ProfileRatedAttrFormComponent;
  rate = JSON.parse(sessionStorage.getItem('attrRate'));

  constructor(private ratedService: RatedAttrService,
              private toast: MatSnackBar,
              private dialogRef: MatDialogRef<ProfileRatedAttrEditComponent>) { }

  ngOnInit() {
    console.log(this.rate.attrName);
  }

  editRate() {
    // console.log(this.rateForm.myForm.value);
    this.rate.rate = this.rateForm.myForm.value.rate;
    console.log(this.rate);
    this.ratedService.editRate(this.rate.key, this.rate)
      .then(this.onEditSuccess.bind(this), this.onFailure.bind(this));
  }

  private onEditSuccess() {
    this.dialogRef.close();
    this.toast.open('Edytowano ocenę pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }

}
