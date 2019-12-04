import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Compostametadata } from 'app/compostametadata';
import { Compostavalues } from 'app/compostavalues';

@Injectable({
  providedIn: 'root'
})
export class SpreadsheetDataService {
  gshtsUrl = 'http://localhost:3000/api/compostas'

  compostas_metadata: Compostametadata[];
  compostas_values: Compostavalues[];

  constructor(private http: HttpClient
              /*private currentuserService:*/ ) { }

  getCompostasMetadata(): Observable<Compostametadata[]> {
    return this.http.get<Compostametadata[]>(this.gshtsUrl + '/' + 0)
    .pipe();
  }
  getCompostasSensorValues(idWorksheet: number): Observable<Compostavalues[]> {
    return this.http.get<Compostavalues[]>(this.gshtsUrl + '/' + idWorksheet)
    .pipe();
  }

//========== Save methods ========== 
  /** POST: add a new composta to the database */
  /*addNewComposta (id: number) {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe();
  }*/

  /** DELETE: delete the hero from the server */
  /*deleteHero (id: number): Observable<{}> {
    const url = `${this.heroesUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteHero'))
      );
  }*/

}
