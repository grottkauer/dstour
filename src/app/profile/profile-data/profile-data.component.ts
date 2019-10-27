import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss']
})
export class ProfileDataComponent implements OnInit {

  isEditable = 0;

  constructor() { }

  ngOnInit() {
  }

  changeEditable() {
    this.isEditable = (this.isEditable === 0) ? 1 : 0;
  }

}
