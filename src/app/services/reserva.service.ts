import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva, ReservaPost } from '../interfaces/reservas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private httpClient: HttpClient) { }
  readonly url = 'https://localhost:7107/api'

  postReserva(reserva: ReservaPost): Observable<HttpResponse<Reserva>> {
    return this.httpClient.post<Reserva>(this.url + "/Reservas", reserva,{observe: 'response'})
  }

  getAllReservas(): Observable<HttpResponse<Reserva[]>> {
    return this.httpClient.get<Reserva[]>(this.url+"/Reservas",{observe: 'response'})
  }

  deleteReserva(id: number): Observable<HttpResponse<any>>{
    return this.httpClient.delete<any>(this.url+ "/Reservas/" + id, {observe: 'response'})
  }

}
