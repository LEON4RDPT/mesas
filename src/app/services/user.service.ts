import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserWithPassword } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  readonly url = 'https://localhost:7107/api'

  getAll(): Observable<HttpResponse<UserWithPassword[]>> {
    return this.httpClient.get<UserWithPassword[]>(this.url + "/Users", { observe: 'response' })
  }

  getUser(id:number): Observable<HttpResponse<UserWithPassword>> {
    return this.httpClient.get<UserWithPassword>(this.url + "/Users/" + id, { observe: 'response' })
  }

  putUser(id:number, user: UserWithPassword) {
    return this.httpClient.put<UserWithPassword>(this.url + "/Users/" + id, user ,{observe: 'response'})
  }
  deleteUser(id:number) {
    return this.httpClient.delete(this.url + "/Users/" + id,{observe: 'response'})
  }
}
