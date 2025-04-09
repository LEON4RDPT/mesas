import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../interfaces/reservas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private httpClient: HttpClient) { }
  readonly url = 'http://localhost:5141/api/reservas';

  getTodas(): Observable<HttpResponse<Reserva[]>> {
    return this.httpClient.get<Reserva[]>(this.url, { observe: 'response' });
  }

  getHoje(): Observable<HttpResponse<Reserva[]>> {
    return this.httpClient.get<Reserva[]>(`${this.url}/hoje`, { observe: 'response' });
  }

  getSemana(): Observable<HttpResponse<Reserva[]>> {
    return this.httpClient.get<Reserva[]>(`${this.url}/semana`, { observe: 'response' });
  }

  getMes(): Observable<HttpResponse<Reserva[]>> {
    return this.httpClient.get<Reserva[]>(`${this.url}/mes`, { observe: 'response' });
  }
}
