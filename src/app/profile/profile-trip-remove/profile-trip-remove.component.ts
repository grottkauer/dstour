import { Component, OnInit } from '@angular/core';
import {Trip} from '../../models/trip';
import {TripService} from '../../core/services/trip.service';
import {MatDialogRef, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-profile-trip-remove',
  templateUrl: './profile-trip-remove.component.html',
  styleUrls: ['./profile-trip-remove.component.scss']
})
export class ProfileTripRemoveComponent implements OnInit {
  currentTrip = JSON.parse(sessionStorage.getItem('currentTrip'));

  constructor(private tripService: TripService,
              private toast: MatSnackBar,
              private dialogRef: MatDialogRef<ProfileTripRemoveComponent>) { }

  ngOnInit() {
  }

  removeTrip() {
    this.tripService.removeTrip(this.currentTrip.key)
      .then(this.onRemoveTripSuccess.bind(this), this.onFailure.bind(this));
  }

  private onRemoveTripSuccess() {
    this.dialogRef.close();
    this.toast.open('Usunięto wycieczkę pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }

}
