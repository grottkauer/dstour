import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar-profile',
  templateUrl: './sidebar-profile.component.html',
  styleUrls: ['./sidebar-profile.component.scss']
})
export class SidebarProfileComponent implements OnInit {

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
