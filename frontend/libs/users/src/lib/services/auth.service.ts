import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '@frontend/utilities';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  logIn(user: User): Observable<User> {
    return this.httpClient.post<User>(
      `${environment.apiURL}/users/login`,
      user
    );
  }
  logOut(): void {
    this.localStorageService.removeToken();
    this.router.navigateByUrl('/');
  }
}
