import { Component, OnInit } from '@angular/core';
import {ProfileTripEditComponent} from '../profile-trip-edit/profile-trip-edit.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProfileRatedAttrEditComponent} from '../profile-rated-attr-edit/profile-rated-attr-edit.component';
import {Rated} from '../../models/rated';
import {UserService} from '../../core/services/user.service';
import {Observable} from 'rxjs';
import {RatedAttrService} from '../../core/services/rated-attr.service';
import {Favorite} from '../../models/favorite';
import {ProfileRatedRemoveComponent} from '../profile-rated-remove/profile-rated-remove.component';

@Component({
  selector: 'app-profile-rated-attr',
  templateUrl: './profile-rated-attr.component.html',
  styleUrls: ['./profile-rated-attr.component.scss']
})
export class ProfileRatedAttrComponent implements OnInit {

  searchText;
  user = JSON.parse(sessionStorage.getItem('currentUser'));
  rated: Rated[];
  rate: Rated;
  rating: Observable<Rated[]>;

  constructor(private dialog: MatDialog,
              private ratedService: RatedAttrService) { }

  ngOnInit() {
    this.rated = this.user.ratedAttr;
    this.rating = this.ratedService.getRatedByUser(this.user.key);
  }

  openEditRateModal(rate: Rated) {
    sessionStorage.setItem('attrRate', JSON.stringify(rate));
    this.dialog.open(ProfileRatedAttrEditComponent);
  }

  openRemoveRateModal(rate: Rated) {
    sessionStorage.setItem('attrRate', JSON.stringify(rate));
    this.dialog.open(ProfileRatedRemoveComponent);
  }

}
