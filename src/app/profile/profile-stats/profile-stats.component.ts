import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';

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

  constructor() { }

  ngOnInit() {
    // Bar chart:
    this.BarChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['80-100%', '60-80%', '40-60%', '20-40%', '0-20%'],
        datasets: [{
          label: 'Liczba atrakcji',
          data: [3, 2 , 5, 1, 2],
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

    // Actual month
    this.actualMonth = this.monthNames[this.d.getMonth()];
  }

}
