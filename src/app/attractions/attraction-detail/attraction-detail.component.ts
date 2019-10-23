import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Attraction} from '../../models/attraction';
import {tap} from 'rxjs/operators';
import {AttractionsService} from '../../core/services/attractions.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-attraction-detail',
  templateUrl: './attraction-detail.component.html',
  styleUrls: ['./attraction-detail.component.scss']
})
export class AttractionDetailComponent {

  attraction: Attraction;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private attractionsService: AttractionsService) {
    // this.attraction = data;
  }

  ngAfterViewInit() {
    this.loadAttraction();
  }

  private loadAttraction() {
    const key = this.route.snapshot.params['key'];
    this.attractionsService.getAttraction(key)
      .subscribe(attraction => this.attraction = attraction);
  }

}
