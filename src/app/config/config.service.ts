import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';

import { ErrorHandlerService, HandleError } from '../core/services/error-handler.service';
import { HttpService } from '../core/services/http.service';
import { NotificationService } from '../core/services/notification.service';

export interface Config {
  heroesUrl: string;
  textfile: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configUrl = '/assets/config.json';

  private handleError: HandleError;

  constructor(
    errorHandlerService: ErrorHandlerService,
    private http: HttpClient,
    private httpService: HttpService,
    private notificationService: NotificationService
  ) {
    this.handleError = errorHandlerService.createHandleError('ConfigService');
  }

  getUsers(): Observable<any> {
    const paramsObj = {
      appid: 'id1234',
      cnt: '5'
    };

    const options = {
      headers: new HttpHeaders({
        'test-header': 'test-message',
      }),
      params: this.httpService.setHttpParams(paramsObj),
      responseType: 'json' as 'json'
    };

    return this.http.get<any>('/users')
      .pipe(
        take(1),
        tap(() => {
          this.notificationService.success('Came', 'Users');
        }),
        catchError(this.handleError('getUsers')),
      );
  }

  getConfigResponse(): Observable<HttpResponse<Config>> {
    const paramsObj = {
      appid: 'id1234',
      cnt: '5'
    };

    const options = {
      headers: new HttpHeaders({
        'test-header': 'test-message',
      }),
      params: this.httpService.setHttpParams(paramsObj),
      observe: 'response' as 'response',
    };

    return this.http.get<Config>(this.configUrl, options)
      .pipe(
        take(1),
        tap(() => {
          this.notificationService.success('Came', 'Response');
        }),
        catchError(this.handleError('getConfigResponse'))
      );
  }

  makeIntentionalError(): Observable<Object> {
    return this.http.get('/not/a/real/url')
      .pipe(
        take(1),
        catchError(this.handleError('makeIntentionalError'))
      );
  }
}
