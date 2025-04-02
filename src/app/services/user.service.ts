import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserWithPassword } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  readonly url = 'https://localhost:7107/api'

  getAll(): Observable<HttpResponse<UserWithPassword[]>> {
    return this.httpClient.get<UserWithPassword[]>(this.url + "/Users", { observe: 'response' })
  }
}
