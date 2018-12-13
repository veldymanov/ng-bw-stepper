import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private httpService: HttpService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.httpService.getToken();
    const authReq = authToken
      ? req.clone({ setHeaders: { Authorization: authToken } })
      : req;

    return next.handle(authReq);
  }
}
