import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import {CheckedAttrService} from '../../core/services/checked-attr.service';
import {CheckedAttr} from '../../models/checkedAttr';
import {RatedAttrService} from '../../core/services/rated-attr.service';
import {FavoriteService} from '../../core/services/favorite.service';
import {Rated} from '../../models/rated';
import {Favorite} from '../../models/favorite';
import {TripService} from '../../core/services/trip.service';

@Component({
  selector: 'app-profile-stats',
  templateUrl: './profile-stats.component.html',
  styleUrls: ['./profile-stats.component.scss']
})
export class ProfileStatsComponent implements OnInit {

  BarChart = [];
  monthNames = ['styczniu', 'lutym', 'marcu', 'kwietniu', 'maju', 'czerwcu',
    'lipcu', 'sierpniu', 'wrześniu', 'październiku', 'listopadzie', 'grudniu'
  ];
  d = new Date();
  actualMonth;

  role = sessionStorage.getItem('userRole');
  user = JSON.parse(sessionStorage.getItem('currentUser'));
  checkedGroups: number[] = new Array(5).fill(0);
  sumPoints = 0;
  countRatedAttrs = 0;
  avgRatedAttrs = 0;
  countFavorites = 0;
  countTrips = 0;
  sumPointsByMonth = 0;
  actualMonthNumber: number;

  constructor(private checkedAttrService: CheckedAttrService,
              private ratedService: RatedAttrService,
              private favoriteService: FavoriteService,
              private tripService: TripService) { }

  ngOnInit() {
    // Actual month
    this.actualMonth = this.monthNames[this.d.getMonth()];
    this.actualMonthNumber = this.d.getMonth() + 1;
    this.loadRated();
    this.loadFavorites();
    this.loadTrips();
    this.loadCheckedGroups();
    // this.loadChart();
  }

  private loadCheckedGroups() {
    let checkedAttraction: CheckedAttr;
    let index: number;
    this.checkedAttrService.getCheckedAttrByUser(this.user.key)
      .subscribe(val => {
        for (let i = 0; i < val.length; i++) {
          checkedAttraction = val[i];
          index = this.getGroupByValue(checkedAttraction.points);
          console.log('index: ', index);
          this.checkedGroups[index]++;
          console.log('checkedGroups: ', this.checkedGroups);
          this.sumPoints += +checkedAttraction.points;
          // sum points in actual month
          const checkedDate = checkedAttraction.checkDate.substring(3, 5);
          const checkedMonth = +checkedDate;
          if (this.actualMonthNumber === checkedMonth) {
            this.sumPointsByMonth += +checkedAttraction.points;
          }
          // get chart
          this.loadChart();
        }
      });
  }

  private loadRated() {
    let rated: Rated;
    let sumRated = 0;
    this.ratedService.getRatedByUser(this.user.key)
      .subscribe(val => {
        for (let i = 0; i < val.length; i++) {
          rated = val[i];
          sumRated += +rated.rate;
        }
        this.countRatedAttrs = val.length;
        this.avgRatedAttrs = Math.round((sumRated / val.length) * 100) / 100;
      });
  }

  private loadFavorites() {
    this.favoriteService.getFavoritesByUser(this.user.key)
      .subscribe(val => {
        this.countFavorites = val.length;
      });
  }

  private loadTrips() {
    this.tripService.getTripsByUser(this.user.key)
      .subscribe(val => {
        this.countTrips = val.length;
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

  private loadChart() {
    // Bar chart:
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['80-100%', '60-80%', '40-60%', '20-40%', '0-20%'],
        datasets: [{
          label: 'Liczba atrakcji',
          data: this.checkedGroups,
          backgroundColor: [
            'rgba(255, 99, 132, 0.3)',
            'rgba(54, 162, 235, 0.3)',
            'rgba(255, 206, 86, 0.3)',
            'rgba(75, 192, 192, 0.3)',
            'rgba(153, 102, 255, 0.3)'
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

}
