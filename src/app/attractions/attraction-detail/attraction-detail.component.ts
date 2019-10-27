import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Attraction} from '../../models/attraction';
import {tap} from 'rxjs/operators';
import {AttractionsService} from '../../core/services/attractions.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Chart} from 'chart.js';
import * as CanvasJS from 'canvasjs';

declare var ol: any;
@Component({
  selector: 'app-attraction-detail',
  templateUrl: './attraction-detail.component.html',
  styleUrls: ['./attraction-detail.component.scss']
})
export class AttractionDetailComponent implements OnInit{

  BarChart = [];

  latitude = 51.0152;
  longitude = 15.1813;

  layer: any;
  map: any;
  overlay: any;

  attraction: Attraction;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private attractionsService: AttractionsService) {
    // this.attraction = data;
  }

  ngAfterViewInit() {
    this.loadAttraction();
  }

  ngOnInit() {
    // Charts
// Bar chart:
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['80-100%', '60-80%', '40-60%', '20-40%', '0-20%'],
        datasets: [{
          label: 'Liczba podróżników',
          data: [9, 7 , 3, 5, 2],
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


    //Open Street Map
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
        center: ol.proj.fromLonLat([15.3033, 51.0304]),
        zoom: 15
      })
    });

    this.layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [
          new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([15.3033, 51.0304]))
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

    content.innerHTML = '<b>Zamek Czocha</b><br />15.3033 E, 51.0304 N';
    overlay.setPosition(ol.proj.fromLonLat([15.3033, 51.0304]));

    closer.onclick = function() {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };
  }

  private loadAttraction() {
    const key = this.route.snapshot.params['key'];
    this.attractionsService.getAttraction(key)
      .subscribe(attraction => this.attraction = attraction);
  }

}
