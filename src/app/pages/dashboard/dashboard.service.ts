import { HttpClient } from '@angular/common/http';
import { Lectura } from './Lectura';

export class DashboardService {
  lecturas: Lectura[];
  constructor(private http: HttpClient) {}

  getLecturas() {
    return this.http.get(
      'https://api.thingspeak.com/channels/879714/fields/1.json?api_key=35XGKHW6MQX5BY0'
    );
  }
}
