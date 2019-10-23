import {Component, Input, OnInit} from '@angular/core';
import {Attraction} from '../../models/attraction';
import {Router} from '@angular/router';

@Component({
  selector: 'app-attraction-card',
  templateUrl: './attraction-card.component.html',
  styleUrls: ['./attraction-card.component.scss', './creative.min.css']
})
export class AttractionCardComponent {
  @Input() attraction: Attraction;

  constructor(private router: Router) {

  }

  goToDetail() {
    this.router.navigate(['/dashboard/attractions', this.attraction.key]);
  }
}
