import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {AttractionsService} from '../core/services/attractions.service';
import {Attraction} from '../models/attraction';
import {MatDialog} from '@angular/material';
import {NewAttractionComponent} from './new-attraction/new-attraction.component';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.scss']
})
export class AttractionsComponent {

  attractions$: Observable<Attraction[]> = this.attractionsService.getAttractions();
  showAttrType = 0;

  constructor(
    private dialog: MatDialog,
    private attractionsService: AttractionsService) { }

  openNewAttractionModal() {
    this.dialog.open(NewAttractionComponent);
  }

  getAttrType(row) {
    this.showAttrType = row;
  }

  // showDetails(flight) {
  //   this.dialog.open(DetailsComponent, { data: flight });
  // }

}
