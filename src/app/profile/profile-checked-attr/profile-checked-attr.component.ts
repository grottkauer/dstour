import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ProfileCheckedAttrDetailComponent} from '../profile-checked-attr-detail/profile-checked-attr-detail.component';
import {CheckedAttr} from '../../models/checkedAttr';

@Component({
  selector: 'app-profile-checked-attr',
  templateUrl: './profile-checked-attr.component.html',
  styleUrls: ['./profile-checked-attr.component.scss']
})
export class ProfileCheckedAttrComponent implements OnInit {

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
  checked: CheckedAttr[];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.checked = this.user.checkedAttr;
  }

  openEditTripModal() {
    this.dialog.open(ProfileCheckedAttrDetailComponent);
  }

}
