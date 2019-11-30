import { Component, OnInit } from '@angular/core';
import {Favorite} from '../../models/favorite';
import {Attraction} from '../../models/attraction';
import {AttractionsService} from '../../core/services/attractions.service';
import {FavoriteService} from '../../core/services/favorite.service';
import {Observable} from 'rxjs';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Rated} from '../../models/rated';
import {ProfileRatedRemoveComponent} from '../profile-rated-remove/profile-rated-remove.component';
import {ProfileFavoritesRemoveComponent} from '../profile-favorites-remove/profile-favorites-remove.component';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.scss']
})
export class ProfileFavoritesComponent implements OnInit {

  searchText;
  user = JSON.parse(sessionStorage.getItem('currentUser'));
  favorites: Favorite[];
  attractions: Attraction;
  attr: Attraction[] = [];
  favs: Observable<Favorite[]>;

  constructor(private attractionsService: AttractionsService,
              private favoriteService: FavoriteService,
              private toast: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.user.favorites);
    this.favorites = this.user.favorites;
    this.favs = this.favoriteService.getFavoritesByUser(this.user.key);
   /* for (let i = 0; i < this.favorites.length; i++) {
      console.log(this.favorites[i]);
      this.attractionsService.getAttraction(this.favorites[i].attrRef)
        .subscribe(attraction => {
          this.attractions = attraction;
          this.attr[i] = this.attractions;
          console.log(this.attr[i]);
        });
    } */
    // this.attractionsService.getAttraction(this.favorites.attrKey)
  }

  getAttractionByFavKey(attrKey) {
  /*  this.attractionsService.getAttraction(attrKey)
      .subscribe(attraction => {
        this.attractions = attraction;
        // console.log(this.attraction);
      });*/
  }

  openRemoveFavoriteModal(fav: Favorite) {
    sessionStorage.setItem('currentFav', JSON.stringify(fav));
    this.dialog.open(ProfileFavoritesRemoveComponent);
  }

}
