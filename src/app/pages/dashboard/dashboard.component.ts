import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { DashboardService } from './dashboard.service';
import { HttpClient } from '@angular/common/http';
import Lectura from './Lectura';

@Component({
  selector: "dashboard-cmp",
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  public lecturas: Lectura[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.chartColor = '#FFFFFF';

    this.canvas = document.getElementById('chartHours')
    this.ctx = this.canvas.getContext('2d');
    let lecturas = []
    this.getLecturas().subscribe((data) => {
      console.log(JSON.stringify(data))
    });
    console.log(JSON.stringify(this.getLecturas()))
    this.chartHours = new Chart(this.ctx, {
      type: 'line',

      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            borderColor: '#6bd098',
            backgroundColor: '#6bd098',
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: [22, 22, 23, 22, 23, 21, 24, 23, 22, 25, 24, 24, 23]
          }
        ]
      },
      options: {
        legend: {
          display: false
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: '#9f9f9f',
                beginAtZero: false,
                maxTicksLimit: 5
                // padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: '#ccc',
                color: 'rgba(255,255,255,0.05)'
              }
            }
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: 'transparent',
                display: false
              },
              ticks: {
                padding: 20,
                fontColor: '#9f9f9f'
              }
            }
          ]
        }
      }
    });

    this.canvas = document.getElementById('chartEmail');
    this.ctx = this.canvas.getContext('2d');
    this.chartEmail = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: [1, 2, 3],
        datasets: [
          {
            label: 'Emails',
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ['#e3e3e3', '#4acccd', '#fcc468', '#ef8157'],
            borderWidth: 0,
            data: [342, 480, 530, 120]
          }
        ]
      },

      options: {
        legend: {
          display: false
        },

        pieceLabel: {
          render: 'percentage',
          fontColor: ['white'],
          precision: 2
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [
            {
              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: 'transparent',
                color: 'rgba(255,255,255,0.05)'
              }
            }
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: 'transparent'
              },
              ticks: {
                display: false
              }
            }
          ]
        }
      }
    });

    const speedCanvas = document.getElementById('speedChart');

    const dataFirst = {
      data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
      fill: false,
      borderColor: '#fbc658',
      backgroundColor: 'transparent',
      pointBorderColor: '#fbc658',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };

    const dataSecond = {
      data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
      fill: false,
      borderColor: '#51CACF',
      backgroundColor: 'transparent',
      pointBorderColor: '#51CACF',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };

    const speedData = {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      datasets: [dataFirst, dataSecond]
    };

    const chartOptions = {
      legend: {
        display: false,
        position: 'top'
      }
    };

    const lineChart = new Chart(speedCanvas, {
      type: 'line',
      hover: false,
      data: speedData,
      options: chartOptions
    });
  }

  getLecturas() {
    return this.http.get(
      'https://api.thingspeak.com/channels/879714/fields/2.json?api_key=VJ3NDGMHL5LREM9M3'
    );
  }

}
