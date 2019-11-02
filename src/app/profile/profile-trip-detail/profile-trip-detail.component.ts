import { Component, OnInit } from '@angular/core';
import {Attraction} from '../../models/attraction';
import {ActivatedRoute, Router} from '@angular/router';
import {AttractionsService} from '../../core/services/attractions.service';

@Component({
  selector: 'app-profile-trip-detail',
  templateUrl: './profile-trip-detail.component.html',
  styleUrls: ['./profile-trip-detail.component.scss']
})
export class ProfileTripDetailComponent implements OnInit {

  // attraction: Attraction;

  constructor(private route: ActivatedRoute,
              private router: Router) {
    // this.attraction = data;
  }

  ngAfterViewInit() {
    this.loadTrip();
  }

  ngOnInit() {
  }

  private loadTrip() {
    // const key = this.route.snapshot.params['key'];
    const key = 1;
  }

}
