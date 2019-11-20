import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Lectura } from './Lectura';
import { Dato } from './Dato'

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
  public lastTemp: Dato;
  public lastHum: Dato;
  public tempLabels: string[]
  public humLabels: string[]
  public tempValues: number[]
  public humValues: number[]

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.chartColor = '#FFFFFF';

    this.canvas = document.getElementById('chartHum')
    this.ctx = this.canvas.getContext('2d');
    this.canvas2 = document.getElementById('chartTemp')
    this.ctx2 = this.canvas2.getContext('2d');

    this.lectura = new Lectura()
    this.lectura.humComposta = []
    this.lectura.tempComposta = []
    this.lastHum = new Dato(0, '', -1)
    this.lastTemp = new Dato(0, '', -1)
    this.humLabels = new Array()
    this.tempLabels = new Array()
    this.humValues = new Array()
    this.tempValues = new Array()
    this.getLecturas().subscribe((data) => {
      this.json = JSON.stringify(data)
      this.jsonObject = JSON.parse(this.json)

      this.jsonObject.feeds.forEach(fieldItem => {
        const newHum = new Dato(fieldItem.entry_id, fieldItem.created_at, fieldItem.field1)
        const newTemp = new Dato(fieldItem.entry_id, fieldItem.created_at, fieldItem.field2)
        if(newHum.valor && newHum.valor != 0) {
          this.lectura.humComposta.push(newHum)
          this.humLabels.push(this.parseDate(newHum.fecha))
          this.humValues.push(+newHum.valor)
        }
        if(newTemp.valor && newTemp.valor != 0) {
          this.lectura.tempComposta.push(newTemp)
          this.tempLabels.push(this.parseDate(newTemp.fecha))
          this.tempValues.push(+newTemp.valor)
        }
      });
      this.lastHum = this.lectura.humComposta[this.lectura.humComposta.length - 1]
      this.lastTemp = this.lectura.tempComposta[this.lectura.tempComposta.length - 1]

      this.chartHum = new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: this.humLabels,
          datasets: [
            {
              borderColor: '#6497b1',
              pointBorderColor: '#6497b1',
              pointRadius: 4,
              pointHoverRadius: 3,
              pointBorderWidth: 4,
              borderWidth: 3,
              data: this.humValues,
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

      this.chartTemp = new Chart(this.ctx2, {
        type: 'line',
        data: {
          labels: this.tempLabels,
          datasets: [
            {
              borderColor: '#d68120',
              pointBorderColor: '#d68120',
              pointRadius: 4,
              pointHoverRadius: 3,
              pointBorderWidth: 4,
              borderWidth: 3,
              data: this.tempValues,
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
    });
  }

  getLecturas() {
    return this.http.get(
      'https://api.thingspeak.com/channels/879714/feeds.json?api_key=35XGKHW6MQX5BY0'
    );
  }

  parseDate(str: string): string {
    const month = str.slice(5, 7)
    let monthStr = ''
    switch(month) {
      case '1': {
        monthStr = 'Ene'
        break
      }
      case '2': {
        monthStr = 'Feb'
        break
      }
      case '3': {
        monthStr = 'Mar'
        break
      }
      case '4': {
        monthStr = 'Abr'
        break
      }
      case '5': {
        monthStr = 'May'
        break
      }
      case '6': {
        monthStr = 'Jun'
        break
      }
      case '7': {
        monthStr = 'Jul'
        break
      }
      case '8': {
        monthStr = 'Ago'
        break
      }
      case '9': {
        monthStr = 'Sep'
        break
      }
      case '10': {
        monthStr = 'Oct'
        break
      }
      case '11': {
        monthStr = 'Nov'
        break
      }
      case '12': {
        monthStr = 'Dic'
        break
      }
    }
    const day = str.slice(8, 10)
    const hr = str.slice(11, 16)
    return monthStr + ' ' + day + ', ' + hr
  }
}
