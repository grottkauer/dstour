import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Attraction} from '../../models/attraction';
import {map, tap} from 'rxjs/operators';
import {AttractionsService} from '../../core/services/attractions.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Chart} from 'chart.js';
import * as CanvasJS from 'canvasjs';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AttractionNewQuestionComponent} from '../attraction-new-question/attraction-new-question.component';
import {AttractionProposeQuestionComponent} from '../attraction-propose-question/attraction-propose-question.component';
import {AttractionQuizComponent} from '../attraction-quiz/attraction-quiz.component';
import {UploadfileService} from '../../core/services/uploadfile.service';
import {FavoriteService} from '../../core/services/favorite.service';
import {Observable} from 'rxjs';
import {Favorite} from '../../models/favorite';
import {DatePipe} from '@angular/common';
import {RatedAttrService} from '../../core/services/rated-attr.service';
import {Rated} from '../../models/rated';
import {CheckedAttrService} from '../../core/services/checked-attr.service';
import {CheckedAttr} from '../../models/checkedAttr';

declare var ol: any;
@Component({
  selector: 'app-attraction-detail',
  templateUrl: './attraction-detail.component.html',
  styleUrls: ['./attraction-detail.component.scss'],
  providers: [DatePipe]
})
export class AttractionDetailComponent implements OnInit {

  BarChart = [];

  role = sessionStorage.getItem('userRole');

  latitude = 51.0304;
  longitude = 15.3033;

  layer: any;
  map: any;
  overlay: any;

  user = JSON.parse(sessionStorage.getItem('currentUser'));
  attraction: Attraction;
  fileUploads: any[];
  fav: Favorite;
  isFavorite = false;
  currentDate = new Date();
  rate: Rated;
  isRate = false;
  myDate = this.datePipe.transform(this.currentDate, 'dd.MM.yyyy');
  rating: number;
  checked: CheckedAttr;
  isChecked = false;
  currentChecked: CheckedAttr;
  averageRate = 0;
  checkedGroups: number[] = new Array(5).fill(0);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private attractionsService: AttractionsService,
              private dialog: MatDialog,
              private uploadService: UploadfileService,
              private favoriteService: FavoriteService,
              private datePipe: DatePipe,
              private toast: MatSnackBar,
              private ratedService: RatedAttrService,
              private checkedAttrService: CheckedAttrService) {
    // this.attraction = data;
  }

  ngAfterViewInit() {
    // this.loadAttraction();
  }

  ngOnInit() {
    this.loadAttraction();
    // this.loadFiles();

  }

  private loadAttraction() {
    const key = this.route.snapshot.params['key'];
    this.attractionsService.getAttraction(key)
      .subscribe(attraction => {
        this.attraction = attraction;
        sessionStorage.setItem('currentAttr', JSON.stringify(attraction));

        if (this.attraction.coordinateX != null && this.attraction.coordinateY != null) {
          this.latitude = this.attraction.coordinateX;
          this.longitude = this.attraction.coordinateY;
        }

        this.loadFiles();
        this.loadFavorites();
        this.loadRates();
        this.loadCheckedAttrs();
        this.getAverageRating();
        this.loadCheckedGroups();
        this.loadChart();
        this.loadMap();
      });
    // console.log('attraction', this.attraction.name);
  }

  openNewAQuestionModal() {
    this.dialog.open(AttractionNewQuestionComponent);
  }

  openProposeAQuestionModal() {
    this.dialog.open(AttractionProposeQuestionComponent);
  }

  openQuizModal() {
    this.dialog.open(AttractionQuizComponent);
  }

  private loadMap() {
    // Open Street Map
    const mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });

    this.map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }).extend([mousePositionControl]),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
        zoom: 15
      })
    });

    this.layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [
          new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([this.longitude, this.latitude]))
          })
        ]
      })
    });
    this.map.addLayer(this.layer);

    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    const closer = document.getElementById('popup-closer');

    const overlay = new ol.Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
    this.map.addOverlay(overlay);

    content.innerHTML = '<b>' + this.attraction.name + '</b><br />' + this.longitude + ' N, ' + this.latitude + ' E';
    overlay.setPosition(ol.proj.fromLonLat([this.longitude, this.latitude]));

    closer.onclick = function() {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };
  }

  private loadFiles() {
    // Use snapshotChanges().pipe(map()) to store the key
    // console.log('dsa: ', this.attraction.key);
    this.uploadService.getFileUploadsByAttr(this.attraction.key).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });
  }

  private loadChart() {
    // Charts
// Bar chart:
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['80-100%', '60-80%', '40-60%', '20-40%', '0-20%'],
        datasets: [{
          label: 'Liczba podróżników',
          data: this.checkedGroups,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: 'Procent punktów w quizie',
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  private loadFavorites() {
    this.favoriteService.getFavoritesByUser(this.user.key)
      .subscribe(val => {
        for (let i = 0; i < val.length; i++) {
          this.fav = val[i];
          console.log(this.fav);
          console.log(this.attraction.key);
          if (this.fav.attrRef === this.attraction.key) {
            i = val.length;
            this.isFavorite = true;
            console.log(i);
          }
        }
      });
  }

  private loadRates() {
    this.ratedService.getRatedByUser(this.user.key)
      .subscribe(val => {
        for (let i = 0; i < val.length; i++) {
          this.rate = val[i];
          console.log(this.rate);
          console.log(this.attraction.key);
          if (this.rate.attrRef === this.attraction.key) {
            i = val.length;
            this.isRate = true;
            console.log(i);
          }
        }
      });
  }

  private loadCheckedAttrs() {
    this.checkedAttrService.getCheckedAttrByUser(this.user.key)
      .subscribe(val => {
        for (let i = 0; i < val.length; i++) {
          this.checked = val[i];
          console.log(this.checked);
          console.log(this.attraction.key);
          if (this.checked.attrRef === this.attraction.key) {
            i = val.length;
            this.isChecked = true;
            this.currentChecked = this.checked;
            console.log(this.currentChecked);
            console.log(i);
          }
        }
      });
  }

  private loadCheckedGroups() {
    let checkedAttraction: CheckedAttr;
    let index: number;
    this.checkedAttrService.getCheckedAttrByAttr(this.attraction.key)
      .subscribe(val => {
        for (let i = 0; i < val.length; i++) {
          checkedAttraction = val[i];
          index = this.getGroupByValue(checkedAttraction.points);
          console.log('index: ', index);
          this.checkedGroups[index]++;
          console.log('checkedGroups: ', this.checkedGroups);
        }
      });
  }

  private getGroupByValue(value: number) {
    if (value >= 80) {
      return 0;
    } else if (value >= 60 && value < 80) {
      return 1;
    } else if (value >= 40 && value < 60) {
      return 2;
    } else if (value >= 20 && value < 40) {
      return 3;
    } else {
      return 4;
    }
  }

  private getAverageRating() {
    let ratedAttraction: Rated;
    let sumRates = 0;
    this.ratedService.getRatedByAttraction(this.attraction.key)
      .subscribe( val => {
        for (let i = 0; i < val.length; i++) {
          ratedAttraction = val[i];
          sumRates += +ratedAttraction.rate;
        }
        console.log(sumRates);
        if (val.length > 0) {
          this.averageRate = Math.round((sumRates / val.length) * 100) / 100;
        }
      });
  }

  addToFavorites() {
    const favorite = {
      addDate: this.myDate,
      attrCity: this.attraction.city,
      attrName: this.attraction.name,
      attrRef: this.attraction.key,
      userRef: this.user.key
    };

    console.log(favorite);
    this.favoriteService.addFavorite(favorite)
      .then(this.onAddFavoriteSuccess.bind(this), this.onFailure.bind(this));
  }

  addRate() {
    console.log(this.rating);
    const star = {
      addDate: this.myDate,
      attrName: this.attraction.name,
      attrRef: this.attraction.key,
      userRef: this.user.key,
      rate: this.rating
    };

    console.log(star);
    this.ratedService.addRate(star)
      .then(this.onAddRateSuccess.bind(this), this.onFailure.bind(this));
  }

  changeStarValue(event: any) {
    this.rating = event.target.value;
  }

  private onAddFavoriteSuccess() {
    this.toast.open('Dodano do ulubionych pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onAddRateSuccess() {
    this.toast.open('Dodano ocenę atrakcji pomyślnie', '', {panelClass: 'toast-success'});
  }

  private onFailure(error) {
    this.toast.open(error.message, '', {panelClass: 'toast-error'});
  }

}
