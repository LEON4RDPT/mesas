import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mesa } from '../interfaces/mesas';

@Injectable({
  providedIn: 'root'
})
export class MesasService {


  constructor(private httpClient: HttpClient) { }
  readonly url = 'https://localhost:7107/api'

  updateMesa(mesa: Mesa): Observable<HttpResponse<any>> {
    return this.httpClient.put(this.url +"/Mesas/" + mesa.id, mesa, {observe: 'response'})
  }

  postMesa(mesa: Mesa): Observable<HttpResponse<Mesa>> {
    return this.httpClient.post<Mesa>(this.url+ "/Mesas",mesa,{observe: 'response'})
  }
  getAllMesas(): Observable<HttpResponse<Mesa[]>> {
    return this.httpClient.get<Mesa[]>(this.url + "/Mesas",{observe: 'response'})
  }
  deleteMesa(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete<any>(this.url+'/Mesas/' + id,{observe: 'response'})
  }
}
