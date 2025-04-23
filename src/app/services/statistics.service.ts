import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva, ReservaResponse } from '../interfaces/reservas';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private httpClient: HttpClient) { }
  readonly url = environment.url + "/reserva";
  
  getTodas(): Observable<HttpResponse<ReservaResponse>> {
    return this.httpClient.get<ReservaResponse>(this.url, { observe: 'response' });
  }

  getHoje(): Observable<HttpResponse<ReservaResponse>> {
    return this.httpClient.get<ReservaResponse>(`${this.url}/dia`, { observe: 'response' });
  }

  getSemana(): Observable<HttpResponse<ReservaResponse>> {
    return this.httpClient.get<ReservaResponse>(`${this.url}/semana`, { observe: 'response' });
  }

  getMes(): Observable<HttpResponse<ReservaResponse>> {
    return this.httpClient.get<ReservaResponse>(`${this.url}/mes`, { observe: 'response' });
  }
}
