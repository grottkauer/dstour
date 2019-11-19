import {Component, OnInit, ViewChild} from '@angular/core';
import {AttractionsService} from '../../core/services/attractions.service';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {ProfileTripQuickFormComponent} from '../profile-trip-quick-form/profile-trip-quick-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {TripService} from '../../core/services/trip.service';
import {tap} from 'rxjs/operators';
import {Trip} from '../../models/trip';

@Component({
  selector: 'app-profile-trip-edit',
  templateUrl: './profile-trip-edit.component.html',
  styleUrls: ['./profile-trip-edit.component.scss']
})
export class ProfileTripEditComponent implements OnInit {

  @ViewChild(`tripForm`, {static: false}) tripForm: ProfileTripQuickFormComponent;
  trip: Trip;
  currentTrip = JSON.parse(sessionStorage.getItem('currentTrip'));

  constructor(private route: ActivatedRoute,
              private tripService: TripService,
              private toast: MatSnackBar,
              private dialogRef: MatDialogRef<ProfileTripEditComponent>) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.loadTrip();
  }

  private loadTrip() {
    const key = this.route.snapshot.params['key'];
    this.tripService.getTrip(key)
      .pipe(tap(item => this.tripForm.setTrip()))
      .subscribe(item => this.trip = item);
  }

  createTrip() {
    console.log(this.tripForm.myForm.value);
    sessionStorage.removeItem('currentTrip');
    this.tripService.editTrip(this.currentTrip.key, this.tripForm.myForm.value)
      .then(this.onCreatingSuccess.bind(this), this.onCreatingFailure.bind(this));
  }

  private onCreatingSuccess() {
    this.dialogRef.close();
    this.toast.open('Wycieczka edytowana pomyślnie', '', { panelClass: 'toast-success'});
  }

  private onCreatingFailure(error) {
    this.toast.open(error.message, '', { panelClass: 'toast-error'});
  }

}
