import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  signUp(user: User): Observable<User> {
    return this.httpClient.post<User>(
      `${environment.apiURL}/users/signup`,
      user
    );
  }
  login(user: User): Observable<User> {
    
    return this.httpClient.post<User>(
      `${environment.apiURL}/users/login`,
      user
    );
  }
}
