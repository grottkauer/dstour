import {Component, Input, OnInit} from '@angular/core';
import {Attraction} from '../../models/attraction';

@Component({
  selector: 'app-attraction-card',
  templateUrl: './attraction-card.component.html',
  styleUrls: ['./attraction-card.component.scss', './creative.min.css']
})
export class AttractionCardComponent {
  @Input() attraction: Attraction;

}
