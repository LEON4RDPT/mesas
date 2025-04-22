import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mesa, MesaGetAll } from '../interfaces/mesas';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MesasService {


  constructor(private httpClient: HttpClient) { }
  readonly url = environment.url;

  updateMesa(mesa: Mesa): Observable<HttpResponse<any>> {
    return this.httpClient.put(this.url +"/mesa/" + mesa.id, mesa, {observe: 'response'})
  }

  postMesa(mesa: Mesa): Observable<HttpResponse<Mesa>> {
    return this.httpClient.post<Mesa>(this.url+ "/mesa",mesa,{observe: 'response'})
  }

  getAllMesas(): Observable<HttpResponse<MesaGetAll>> {
    return this.httpClient.get<MesaGetAll>(this.url + "/mesa",{observe: 'response'});
  }
  deleteMesa(id: number): Observable<HttpResponse<any>> {
    return this.httpClient.delete<any>(this.url+'/mesa/' + id,{observe: 'response'})
  }
}
