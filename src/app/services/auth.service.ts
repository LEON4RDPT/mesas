import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserLogin, UserWithPassword } from '../interfaces/users';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }
  readonly url = environment.url;

  register(userWithPassword: UserWithPassword): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(this.url + "/user/", userWithPassword, { observe: 'response' });
  }

  login(user: UserLogin): Observable <HttpResponse<any>> {
    return this.httpClient.post<any>(this.url + '/login', user, { observe: 'response' })
  }
}
