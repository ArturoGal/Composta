import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Lectura } from './Lectura';
import { Dato } from './Dato';
import { AngularFireAuth } from '@angular/fire/auth';
import { DashboardService } from './dashboard.service';
import { FirebaseuiAngularLibraryService } from 'firebaseui-angular';

@Component({
  selector: "dashboard-cmp",
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx;
  public ctx2;
  public canvas2: any;
  public chartColor;
  public chartTemp;
  public chartHum;

  public lectura: Lectura;
  public json: string;
  public jsonObject: any;

  public lastTempInt: Dato;
  public lastHumInt: Dato;
  public tempLabelsInt: string[];
  public humLabelsInt: string[];
  public tempValuesInt: number[];
  public humValuesInt: number[];

  public lastTempExt: Dato;
  public lastHumExt: Dato;
  public tempLabelsExt: string[];
  public humLabelsExt: string[];
  public tempValuesExt: number[];
  public humValuesExt: number[];

  public totalResultadosTemp: number;
  public periodoTemp: string;
  public totalResultadosHum: number;
  public periodoHum: string;

  constructor(
    private service: DashboardService,
    private firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService,
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.chartColor = '#FFFFFF';
    this.firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
    if (this.afAuth.auth.currentUser) {
      console.log(this.afAuth.auth.currentUser.email);
    }
    this.periodoHum = this.periodoTemp = 'horas';
    this.totalResultadosHum = this.totalResultadosTemp = 20;

    this.canvas = document.getElementById('chartHum');
    this.ctx = this.canvas.getContext('2d');
    this.canvas2 = document.getElementById('chartTemp');
    this.ctx2 = this.canvas2.getContext('2d');

    this.lectura = new Lectura();

    this.lectura.humCompostaInt = [];
    this.lectura.tempCompostaInt = [];

    this.lastHumInt = new Dato(0, '', -1);
    this.lastTempInt = new Dato(0, '', -1);
    this.humLabelsInt = new Array();
    this.tempLabelsInt = new Array();
    this.humValuesInt = new Array();
    this.tempValuesInt = new Array();

    this.lectura.humCompostaExt = [];
    this.lectura.tempCompostaExt = [];

    this.lastHumExt = new Dato(0, '', -1);
    this.lastTempExt = new Dato(0, '', -1);
    this.humLabelsExt = new Array();
    this.tempLabelsExt = new Array();
    this.humValuesExt = new Array();
    this.tempValuesExt = new Array();

    this.getLecturas();
  }

  parseDate(str: string): string {
    const month = str.slice(5, 7);
    let monthStr = '';
    switch (month) {
      case '1': {
        monthStr = 'Ene';
        break;
      }
      case '2': {
        monthStr = 'Feb';
        break;
      }
      case '3': {
        monthStr = 'Mar';
        break;
      }
      case '4': {
        monthStr = 'Abr';
        break;
      }
      case '5': {
        monthStr = 'May';
        break;
      }
      case '6': {
        monthStr = 'Jun';
        break;
      }
      case '7': {
        monthStr = 'Jul';
        break;
      }
      case '8': {
        monthStr = 'Ago';
        break;
      }
      case '9': {
        monthStr = 'Sep';
        break;
      }
      case '10': {
        monthStr = 'Oct';
        break;
      }
      case '11': {
        monthStr = 'Nov';
        break;
      }
      case '12': {
        monthStr = 'Dic';
        break;
      }
    }
    const day = str.slice(8, 10);
    const hr = str.slice(11, 16);
    let hrGMT = Number(hr.slice(0, 2));
    hrGMT = hrGMT > 6 ? hrGMT - 6 : 24 - hrGMT;
    // console.log(hrGMT)
    return monthStr + ' ' + day + ', ' + hr;
  }

  getLecturas() {
    this.service.getLecturas().subscribe(data => {
      this.json = JSON.stringify(data);
      this.jsonObject = JSON.parse(this.json);
      console.log(this.jsonObject.feeds.length);
      console.log(this.jsonObject.feeds);
      this.jsonObject.feeds.forEach(fieldItem => {
        const newHumInt = new Dato(
          Number(fieldItem.entry_id),
          fieldItem.created_at,
          Number(fieldItem.field1)
        );
        const newTempInt = new Dato(
          Number(fieldItem.entry_id),
          fieldItem.created_at,
          Number(fieldItem.field2)
        );

        const newHumExt = new Dato(
          Number(fieldItem.entry_id),
          fieldItem.created_at,
          Number(fieldItem.field3)
        );
        const newTempExt = new Dato(
          Number(fieldItem.entry_id),
          fieldItem.created_at,
          Number(fieldItem.field4)
        );

        if (
          newHumInt.valor &&
          newHumInt.valor !== 0 &&
          newHumInt.valor !== NaN
        ) {
          this.lectura.humCompostaInt.push(newHumInt);
          this.humLabelsInt.push(this.parseDate(newHumInt.fecha));
          this.humValuesInt.push(newHumInt.valor);
        }

        if (
          newTempInt.valor &&
          newTempInt.valor !== 0 &&
          newTempInt.valor !== NaN
        ) {
          this.lectura.tempCompostaInt.push(newTempInt);
          this.tempLabelsInt.push(this.parseDate(newTempInt.fecha));
          this.tempValuesInt.push(newTempInt.valor);
        }

        if (
          newHumExt.valor &&
          newHumExt.valor !== 0 &&
          newHumExt.valor !== NaN
        ) {
          this.lectura.humCompostaExt.push(newHumExt);
          this.humLabelsExt.push(this.parseDate(newHumExt.fecha));
          this.humValuesExt.push(newHumExt.valor);
        }

        if (
          newTempExt.valor &&
          newTempExt.valor !== 0 &&
          newTempExt.valor !== NaN
        ) {
          this.lectura.tempCompostaExt.push(newTempExt);
          this.tempLabelsExt.push(this.parseDate(newTempExt.fecha));
          this.tempValuesExt.push(newTempExt.valor);
        }

        // if (
        //   newTempExt.valor &&
        //   newTempExt.valor !== 0 &&
        //   newTempExt.valor !== NaN &&
        //   newTempInt.valor &&
        //   newTempInt.valor !== 0 &&
        //   newTempInt.valor !== NaN
        // ) {
        //   this.lectura.tempCompostaInt.push(newTempInt);
        //   this.tempLabelsInt.push(this.parseDate(newTempInt.fecha));
        //   this.tempValuesInt.push(newTempInt.valor);
        //   this.lectura.tempCompostaExt.push(newTempExt);
        //   this.tempLabelsExt.push(this.parseDate(newTempExt.fecha));
        //   this.tempValuesExt.push(newTempExt.valor);
        // }

        // if (
        //   newHumExt.valor &&
        //   newHumExt.valor !== 0 &&
        //   newHumExt.valor !== NaN &&
        //   newHumInt.valor &&
        //   newHumInt.valor !== 0 &&
        //   newHumInt.valor !== NaN
        // ) {
        //   this.lectura.humCompostaInt.push(newHumInt);
        //   this.humLabelsInt.push(this.parseDate(newHumInt.fecha));
        //   this.humValuesInt.push(newTempInt.valor);
        //   this.lectura.tempCompostaExt.push(newHumExt);
        //   this.humLabelsExt.push(this.parseDate(newHumExt.fecha));
        //   this.humValuesExt.push(newHumExt.valor);
        // }
      });

      this.lastHumInt = this.lectura.humCompostaInt[
        this.lectura.humCompostaInt.length - 1
      ];
      this.lastTempInt = this.lectura.tempCompostaInt[
        this.lectura.tempCompostaInt.length - 1
      ];

      this.lastHumExt = this.lectura.humCompostaExt[
        this.lectura.humCompostaExt.length - 1
      ];
      this.lastTempExt = this.lectura.tempCompostaExt[
        this.lectura.tempCompostaExt.length - 1
      ];
      this.createHumChart();
      this.createTempChart();
    });
  }

  onResHumChanged($event) {
    this.createHumChart();
  }

  onPeriodHumChanged($event) {
    this.filterHumByDay();
    this.createHumChart();
  }

  onResTempChanged($event) {
    this.createTempChart();
  }

  onPeriodTempChanged($event) {
    this.filterTempByDay();
    this.createTempChart();
  }

  createHumChart() {
    this.chartHum = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.humLabelsInt.slice(-this.totalResultadosHum),
        datasets: [
          {
            borderColor: '#6487b1',
            pointBorderColor: '#6487b1',
            pointRadius: 4,
            pointHoverRadius: 3,
            pointBorderWidth: 4,
            borderWidth: 3,
            data: this.humValuesInt.slice(-this.totalResultadosHum),
            fill: false
          },
          {
            borderColor: '#64b7b1',
            pointBorderColor: '#64b7b1',
            pointRadius: 4,
            pointHoverRadius: 3,
            pointBorderWidth: 4,
            borderWidth: 3,
            data: this.humValuesExt.slice(-this.totalResultadosHum),
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: '#9f9f9f',
                beginAtZero: false,
                maxTicksLimit: 10
              },
              gridLines: {
                drawBorder: true,
                zeroLineColor: '#ebebeb',
                color: '#ebebeb'
              }
            }
          ],
          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: true,
                color: '#ebebeb',
                zeroLineColor: '#ebebeb',
                display: true
              },
              ticks: {
                // padding: 20,
                fontColor: '#9f9f9f'
              }
            }
          ]
        }
      }
    });
  }

  createTempChart() {
    this.chartTemp = new Chart(this.ctx2, {
      type: 'line',
      data: {
        labels: this.tempLabelsInt.slice(-this.totalResultadosTemp),
        datasets: [
          {
            borderColor: '#d67120',
            pointBorderColor: '#d67120',
            pointRadius: 4,
            pointHoverRadius: 3,
            pointBorderWidth: 4,
            borderWidth: 3,
            data: this.tempValuesInt.slice(-this.totalResultadosTemp),
            fill: false
          },
          {
            borderColor: '#d6af20',
            pointBorderColor: '#d6af20',
            pointRadius: 4,
            pointHoverRadius: 3,
            pointBorderWidth: 4,
            borderWidth: 3,
            data: this.tempValuesExt.slice(-this.totalResultadosTemp),
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: '#9f9f9f',
                beginAtZero: false
              },
              gridLines: {
                drawBorder: true,
                zeroLineColor: '#ebebeb',
                color: '#ebebeb'
              }
            }
          ],
          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: true,
                color: '#ebebeb',
                zeroLineColor: '#ebebeb',
                display: true
              },
              ticks: {
                fontColor: '#9f9f9f'
              }
            }
          ]
        }
      }
    });
  }

  filterHumByDay() {
    const dayAvgLabels = [];
    const dayAvgValues = [];
    let sum;
    let counter = (sum = 0);
    for (let i = 0; i < this.humLabelsInt.length; i++) {
      if (
        i > 0 &&
        this.humLabelsInt[i].split(' ')[1] !==
          this.humLabelsInt[i - 1].split(' ')[1]
      ) {
        // console.log(this.humLabels[i].split(' ')[1]);
        dayAvgValues.push(sum / counter);
        dayAvgLabels.push(this.humLabelsInt[i - 1].slice(0, 6));
        counter = sum = 0;
      }
      counter++;
      sum += this.humValuesInt[i];
      if (i === this.humLabelsInt.length - 1) {
        dayAvgValues.push(sum / counter);
        dayAvgLabels.push(this.humLabelsInt[i].slice(0, 6));
        counter = sum = 0;
      }
    }
    console.log(dayAvgLabels);
    console.log(dayAvgValues);
    this.humLabelsInt = dayAvgLabels;
    this.humValuesInt = dayAvgValues;
  }

  filterTempByDay() {
    const dayAvgLabels = [];
    const dayAvgValues = [];
    let sum;
    let counter = (sum = 0);
    for (let i = 0; i < this.tempLabelsInt.length; i++) {
      if (
        i > 0 &&
        this.tempLabelsInt[i].split(' ')[1] !==
          this.tempLabelsInt[i - 1].split(' ')[1]
      ) {
        dayAvgValues.push(sum / counter);
        dayAvgLabels.push(this.tempLabelsInt[i - 1].slice(0, 6));
        counter = sum = 0;
      }
      counter++;
      sum += this.tempValuesInt[i];
      if (i === this.tempLabelsInt.length - 1) {
        dayAvgValues.push(sum / counter);
        dayAvgLabels.push(this.tempLabelsInt[i].slice(0, 6));
        counter = sum = 0;
      }
    }
    console.log(dayAvgLabels);
    console.log(dayAvgValues);
    this.tempLabelsInt = dayAvgLabels;
    this.tempValuesInt = dayAvgValues;
  }
}
