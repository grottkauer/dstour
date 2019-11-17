import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent implements OnInit {

  @Input() showAttrType = 0;
  @Output() test: EventEmitter<number> = new EventEmitter<number>();

  role = sessionStorage.getItem('userRole');

  constructor() { }

  ngOnInit() {
  }

  showType(row) {
    this.test.emit(row);
    this.showAttrType = row;
  }
}
