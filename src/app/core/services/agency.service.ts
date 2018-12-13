import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { AgencyDto } from '../interfaces/agency-dto';

import { ErrorHandlerService, HandleError } from './error-handler.service';
import { HttpService } from './http.service';
import { AgencyType } from '../enums/agency-type.enum';


@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  private handleError: HandleError;

  constructor(
    errorHandlerService: ErrorHandlerService,
    private http: HttpClient,
    private httpService: HttpService
  ) {
    this.handleError = errorHandlerService.createHandleError('AgencyService');
  }

  getAgencies(payload: {query?: string, limit?: number, type?: AgencyType}): Observable<AgencyDto[]> {
    const options = {
      params: this.httpService.setHttpParams(payload),
    };

    return this.http.get<AgencyDto[]>(`/agencies`, options)
      .pipe(
        take(1),
        catchError(this.handleError('getAgencies')),
      );
  }
}
