import {Component, OnInit, ViewChild} from '@angular/core';
import {AttractionsService} from '../../core/services/attractions.service';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {ProfileTripQuickFormComponent} from '../profile-trip-quick-form/profile-trip-quick-form.component';

@Component({
  selector: 'app-profile-trip-edit',
  templateUrl: './profile-trip-edit.component.html',
  styleUrls: ['./profile-trip-edit.component.scss']
})
export class ProfileTripEditComponent implements OnInit {

  @ViewChild(`tripForm`, {static: false}) tripForm: ProfileTripQuickFormComponent;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  createTrip() {
    // this.attractionsService.addAttraction(this.attractionForm.form.value)
    //   .then(this.onCreatingSuccess.bind(this), this.onCreatingFailure.bind(this));
  }

  private onCreatingSuccess() {
    // this.dialogRef.close();
    // this.toast.open('Atrakcja dodana pomyślnie', '', { panelClass: 'toast-success'});
  }

  private onCreatingFailure(error) {
    // this.toast.open(error.message, '', { panelClass: 'toast-error'});
  }

}
