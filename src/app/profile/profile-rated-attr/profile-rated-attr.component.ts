import { Component, OnInit } from '@angular/core';
import {ProfileTripEditComponent} from '../profile-trip-edit/profile-trip-edit.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProfileRatedAttrEditComponent} from '../profile-rated-attr-edit/profile-rated-attr-edit.component';
import {Rated} from '../../models/rated';
import {UserService} from '../../core/services/user.service';
import {Observable} from 'rxjs';
import {RatedAttrService} from '../../core/services/rated-attr.service';
import {Favorite} from '../../models/favorite';

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
              private ratedService: RatedAttrService,
              private toast: MatSnackBar) { }

  ngOnInit() {
    this.rated = this.user.ratedAttr;
    this.rating = this.ratedService.getRatedByUser(this.user.key);
  }

  openEditRateModal(rate: Rated) {
    sessionStorage.setItem('attrRate', JSON.stringify(rate));
    this.dialog.open(ProfileRatedAttrEditComponent);
  }

  removeRate(rat: Rated) {
    this.ratedService.removeRate(rat.key)
      .then(this.onRemoveSuccess.bind(this), this.onFailure.bind(this));
  }

  private onRemoveSuccess() {
    this.toast.open('Usunięto ocenę atrakcji pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }

}
