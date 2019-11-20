import {Component, Input, OnInit} from '@angular/core';
import {TripAttraction} from '../../models/tripAttraction';

@Component({
  selector: 'app-profile-trip-detail-attr-card',
  templateUrl: './profile-trip-detail-attr-card.component.html',
  styleUrls: ['./profile-trip-detail-attr-card.component.scss']
})
export class ProfileTripDetailAttrCardComponent implements OnInit {

  @Input() tripAttr: TripAttraction;
  constructor() { }

  ngOnInit() {
  }

}
