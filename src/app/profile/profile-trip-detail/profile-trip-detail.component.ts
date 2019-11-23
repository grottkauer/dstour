import { Component, OnInit } from '@angular/core';
import {Attraction} from '../../models/attraction';
import {ActivatedRoute, Router} from '@angular/router';
import {AttractionsService} from '../../core/services/attractions.service';
import {ProfileTripEditComponent} from '../profile-trip-edit/profile-trip-edit.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {TripService} from '../../core/services/trip.service';
import {Trip} from '../../models/trip';

@Component({
  selector: 'app-profile-trip-detail',
  templateUrl: './profile-trip-detail.component.html',
  styleUrls: ['./profile-trip-detail.component.scss']
})
export class ProfileTripDetailComponent implements OnInit {

  trip: Trip;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private tripService: TripService,
              private toast: MatSnackBar) {
    // this.attraction = data;
  }

  ngAfterViewInit() {
    this.loadTrip();
  }

  ngOnInit() {
  }

  private loadTrip() {
    const key = this.route.snapshot.params['key'];
    this.tripService.getTrip(key)
      .subscribe(trip => {
        this.trip = trip;
        console.log(this.trip.tripAttr);
        // sessionStorage.setItem('currentAttr', JSON.stringify(attraction));
      });
  }

  openEditTripModal() {
    sessionStorage.setItem('currentTrip', JSON.stringify(this.trip));
    this.dialog.open(ProfileTripEditComponent);
  }

  removeTrip() {
    this.tripService.removeTrip(this.trip.key)
      .then(this.onRemoveTripSuccess.bind(this), this.onFailure.bind(this));
  }

  private onRemoveTripSuccess() {
    this.toast.open('Usunięto wycieczkę pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }

}
