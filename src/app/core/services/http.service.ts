import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { SignedInDto } from '../interfaces/signed-in-dto';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private router: Router,
  ) { }

  getBaseUrl(): string {
    return environment.apiUrl;
  }

  getToken(): string {
    return 'Bearer ' + localStorage.getItem('id_token');
  }

  removeToken(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/login']);
  }

  setToken(user: SignedInDto): void {
    const expiresAt = moment().add(user.auth.expires_in, 'seconds');

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('id_token', user.auth.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  setHttpParams<T>(paramsObj: T): HttpParams {
    let params = new HttpParams();

    Object.keys(paramsObj)
      .forEach(item => params = params.set(item, paramsObj[item]));

    return params;
  }
}
