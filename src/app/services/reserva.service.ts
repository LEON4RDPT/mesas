import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva, ReservaPost, ReservaResponse } from '../interfaces/reservas';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private httpClient: HttpClient) { }
  readonly url = environment.url

  postReserva(reserva: ReservaPost): Observable<HttpResponse<Reserva>> {
    return this.httpClient.post<Reserva>(this.url + "/reserva", reserva,{observe: 'response'})
  }

  getAllReservas(userId?: number): Observable<HttpResponse<ReservaResponse>> {
    if (!userId) return this.httpClient.get<ReservaResponse>(this.url+"/reserva",{observe: 'response'})
    return this.httpClient.get<ReservaResponse>(this.url+"/reserva/" + userId,{observe: 'response'})
  }
  getAllReservasUser(userId?: number): Observable<HttpResponse<any>> {
    if (!userId) return this.httpClient.get<ReservaResponse>(this.url+"/reserva",{observe: 'response'})
    return this.httpClient.get<ReservaResponse>(this.url+"/reserva/user/" + userId,{observe: 'response'})
  }


  deleteReserva(id: number): Observable<HttpResponse<any>>{
    return this.httpClient.delete<any>(this.url+ "/reserva/" + id, {observe: 'response'})
  }


}
