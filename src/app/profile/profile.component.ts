import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Attraction} from '../models/attraction';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  showAttrType = 0;

  constructor() { }

  ngOnInit() {
  }

  getAttrType(row) {
    this.showAttrType = row;
  }

}
