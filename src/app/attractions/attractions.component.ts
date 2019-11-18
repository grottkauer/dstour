import {Component, OnInit} from '@angular/core';
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
export class AttractionsComponent implements OnInit {

  attractions$: Observable<Attraction[]> = this.attractionsService.getAttractions();
  showAttrType = 0;
  page = 1;
  pageSize = 9;
  role = sessionStorage.getItem('userRole');
  attrTypes = [
    'Zamki i pałace',
    'Wydarzenia',
    'Miejsca historyczne',
    'Budynki sakralne',
    'Przyrodnicze',
    'Obiekty techniki',
    'Dwory i dworki',
    'Pozostałe'
  ];
  attrs$: Observable<Attraction[]>;

  constructor(
    private dialog: MatDialog,
    private attractionsService: AttractionsService) { }

  openNewAttractionModal() {
    this.dialog.open(NewAttractionComponent);
  }

  getAttrType(row) {
    this.showAttrType = row;
    console.log(this.showAttrType);
    this.attrs$ = this.attractionsService.getAttractionsByType(this.attrTypes[this.showAttrType]);
  }

  ngOnInit() {
    this.attrs$ = this.attractionsService.getAttractionsByType(this.attrTypes[this.showAttrType]);
  }

  // showDetails(flight) {
  //   this.dialog.open(DetailsComponent, { data: flight });
  // }

}
