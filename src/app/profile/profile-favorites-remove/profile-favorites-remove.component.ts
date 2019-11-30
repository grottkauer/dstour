import { Component, OnInit } from '@angular/core';
import {Favorite} from '../../models/favorite';
import {RatedAttrService} from '../../core/services/rated-attr.service';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {FavoriteService} from '../../core/services/favorite.service';

@Component({
  selector: 'app-profile-favorites-remove',
  templateUrl: './profile-favorites-remove.component.html',
  styleUrls: ['./profile-favorites-remove.component.scss']
})
export class ProfileFavoritesRemoveComponent implements OnInit {

  fav = JSON.parse(sessionStorage.getItem('currentFav'));

  constructor(private favoriteService: FavoriteService,
              private toast: MatSnackBar,
              private dialogRef: MatDialogRef<ProfileFavoritesRemoveComponent>) { }

  ngOnInit() {
  }

  removeFavorite() {
    this.favoriteService.removeFavorite(this.fav.key)
      .then(this.onRemoveSuccess.bind(this), this.onFailure.bind(this));
  }

  private onRemoveSuccess() {
    this.dialogRef.close();
    this.toast.open('Usunięto z ulubionych pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }

}
