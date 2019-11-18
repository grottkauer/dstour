import { Component, OnInit } from '@angular/core';
import {Favorite} from '../../models/favorite';
import {Attraction} from '../../models/attraction';
import {AttractionsService} from '../../core/services/attractions.service';
import {FavoriteService} from '../../core/services/favorite.service';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.scss']
})
export class ProfileFavoritesComponent implements OnInit {

  searchText;
  heroes = [
    { id: 11, name: 'Mr. Nice', country: 'India' },
    { id: 12, name: 'Narco' , country: 'USA'},
    { id: 13, name: 'Bombasto' , country: 'UK'},
    { id: 14, name: 'Celeritas' , country: 'Canada' },
    { id: 15, name: 'Magneta' , country: 'Russia'},
    { id: 16, name: 'RubberMan' , country: 'China'},
    { id: 17, name: 'Dynama' , country: 'Germany'},
    { id: 18, name: 'Dr IQ' , country: 'Hong Kong'},
    { id: 19, name: 'Magma' , country: 'South Africa'},
    { id: 20, name: 'Tornado' , country: 'Sri Lanka'}
  ];
  user = JSON.parse(sessionStorage.getItem('currentUser'));
  favorites: Favorite[];
  attractions: Attraction;
  attr: Attraction[] = [];
  favs: Observable<Favorite[]>;

  constructor(private attractionsService: AttractionsService,
              private favoriteService: FavoriteService,
              private toast: MatSnackBar) { }

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

  removeFavorite(favorite: Favorite) {
    this.favoriteService.removeFavorite(favorite.key)
      .then(this.onRemoveSuccess.bind(this), this.onFailure.bind(this));;
  }

  private onRemoveSuccess() {
    this.toast.open('Usunięto z ulubionych pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }

}
