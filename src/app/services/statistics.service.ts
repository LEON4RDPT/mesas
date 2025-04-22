import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../interfaces/reservas';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private httpClient: HttpClient) { }
  readonly url = environment.url + "/reserva";
  
  getTodas(): Observable<HttpResponse<Reserva[]>> {
    return this.httpClient.get<Reserva[]>(this.url, { observe: 'response' });
  }

  getHoje(): Observable<HttpResponse<Reserva[]>> {
    return this.httpClient.get<Reserva[]>(`${this.url}/dia`, { observe: 'response' });
  }

  getSemana(): Observable<HttpResponse<Reserva[]>> {
    return this.httpClient.get<Reserva[]>(`${this.url}/semana`, { observe: 'response' });
  }

  getMes(): Observable<HttpResponse<Reserva[]>> {
    return this.httpClient.get<Reserva[]>(`${this.url}/mes`, { observe: 'response' });
  }
}
