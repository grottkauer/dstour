import { Component, OnInit } from '@angular/core';
import {ProfileTripEditComponent} from '../profile-trip-edit/profile-trip-edit.component';
import {MatDialog} from '@angular/material';
import {ProfileRatedAttrEditComponent} from '../profile-rated-attr-edit/profile-rated-attr-edit.component';

@Component({
  selector: 'app-profile-rated-attr',
  templateUrl: './profile-rated-attr.component.html',
  styleUrls: ['./profile-rated-attr.component.scss']
})
export class ProfileRatedAttrComponent implements OnInit {

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

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openEditRateModal() {
    this.dialog.open(ProfileRatedAttrEditComponent);
  }

}
