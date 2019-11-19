import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {ProfileCheckedAttrDetailComponent} from '../profile-checked-attr-detail/profile-checked-attr-detail.component';
import {CheckedAttr} from '../../models/checkedAttr';
import {CheckedAttrService} from '../../core/services/checked-attr.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-profile-checked-attr',
  templateUrl: './profile-checked-attr.component.html',
  styleUrls: ['./profile-checked-attr.component.scss']
})
export class ProfileCheckedAttrComponent implements OnInit {

  searchText;
  user = JSON.parse(sessionStorage.getItem('currentUser'));
  checked: Observable<CheckedAttr[]>;

  constructor(private dialog: MatDialog,
              private checkedAttrService: CheckedAttrService) { }

  ngOnInit() {
    // this.checked = this.user.checkedAttr;
    this.checked = this.checkedAttrService.getCheckedAttrByUser(this.user.key);
  }

  openEditTripModal() {
    this.dialog.open(ProfileCheckedAttrDetailComponent);
  }

}
