import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserLogin, UserWithPassword } from '../interfaces/users';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }
  readonly url = 'http://localhost:5141/api'

  register(userWithPassword: UserWithPassword): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(this.url + "/users", userWithPassword, { observe: 'response' });
  }

  login(user: UserLogin): Observable <HttpResponse<any>> {
    return this.httpClient.post<any>(this.url + '/users/login', user, { observe: 'response' })
  }
}
