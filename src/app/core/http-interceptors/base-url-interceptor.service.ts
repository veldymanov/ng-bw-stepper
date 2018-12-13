import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';


@Injectable()
export class BaseUrlInterceptorService implements HttpInterceptor {

  constructor(private httpService: HttpService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const baseUrl = this.httpService.getBaseUrl();
    const secureReq = req.clone({ url: baseUrl + req.url });

    return next.handle(secureReq);
  }
}
