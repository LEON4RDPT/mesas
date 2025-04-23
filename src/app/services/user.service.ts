import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserWithPassword } from '../interfaces/users';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  readonly url = environment.url;

  getAll(): Observable<HttpResponse<UserWithPassword[]>> {
    return this.httpClient.get<UserWithPassword[]>(this.url + "/user", { observe: 'response' })
  }

  getUser(id:number): Observable<HttpResponse<UserWithPassword>> {
    return this.httpClient.get<UserWithPassword>(this.url + "/user/" + id, { observe: 'response' })
  }

  putUser(user: UserWithPassword) {
    return this.httpClient.put<UserWithPassword>(this.url + "/user/", user ,{observe: 'response'})
  }
  deleteUser(id:number) {
    return this.httpClient.delete(this.url + "/user/" + id,{observe: 'response'})
  }
}
