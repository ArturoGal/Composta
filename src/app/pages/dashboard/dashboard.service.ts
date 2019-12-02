import { HttpClient } from '@angular/common/http';
import { Lectura } from './Lectura';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  lecturas: Lectura[];
  constructor(private http: HttpClient) {}

  getLecturas() {
    return this.http.get(
      'https://api.thingspeak.com/channels/879714/feeds.json?api_key=35XGKHW6MQX5BY0&results=8000'
    );
  }
}
