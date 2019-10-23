import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-sidebar-attr',
  templateUrl: './sidebar-attr.component.html',
  styleUrls: ['./sidebar-attr.component.scss']
})
export class SidebarAttrComponent implements OnInit {

  @Input() showAttrType = 0;
  @Output() test: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  showType(row) {
    this.test.emit(row);
    this.showAttrType = row;
  }

}
