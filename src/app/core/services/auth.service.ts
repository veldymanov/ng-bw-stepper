import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { ErrorHandlerService, HandleError } from './error-handler.service';
import { HttpService } from './http.service';

import { CredentialsDto } from '../interfaces/credentials-dto';
import { SignedInDto } from '../interfaces/signed-in-dto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private handleError: HandleError;

  get expiration(): moment.Moment {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }
  get isLoggedIn(): boolean { return moment().isBefore(this.expiration); }


  constructor(
    errorHandlerService: ErrorHandlerService,
    private http: HttpClient,
    private httpService: HttpService,
  ) {
    this.handleError = errorHandlerService.createHandleError('AuthService');
    this.startUpdateToken();
   }

  public login(payload: CredentialsDto): Observable<SignedInDto> {
    const url = `/auth/signin`;

    return this.http.post<SignedInDto>(url, payload)
      .pipe(
        tap((user: SignedInDto) => this.setSession(user)),
        take(1),
        catchError(this.handleError('login')),
      );
  }

  public logout() {
    this.httpService.removeToken();
  }

  private setSession(user: SignedInDto): void {
    this.httpService.setToken(user);
  }

  private startUpdateToken() {
    setInterval(() => {
      this.updateToken().subscribe((user: SignedInDto) => {
        if (!user) { console.log('user is not authorized'); }
    });
    }, 1000 * 300); // 5 min
  }

  private updateToken(): Observable<SignedInDto> {
    if (!this.isLoggedIn) {
      this.logout();
      return of(null);
    }

    return this.http.post<SignedInDto>(`/auth/renew`, {})
      .pipe(
        take(1),
        tap((user: SignedInDto) => this.setSession(user)),
        catchError(this.handleError('login')),
      );
  }
}
