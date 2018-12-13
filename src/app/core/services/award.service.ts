import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { AwardDto } from '../interfaces/award-dto';

import { ErrorHandlerService, HandleError } from './error-handler.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AwardService {

  private handleError: HandleError;

  constructor(
    errorHandlerService: ErrorHandlerService,
    private http: HttpClient,
    private httpService: HttpService
  ) {
    this.handleError = errorHandlerService.createHandleError('AwordService');
  }

  getAwards(): Observable<AwardDto[]> {
    return this.http.get<AwardDto[]>('/awards')
      .pipe(
        take(1),
        catchError(this.handleError('getAwards')),
      );
  }

  saveAwards(payload: AwardDto[]): Observable<AwardDto[]> {
    return this.http.post<AwardDto[]>('/awards', payload)
      .pipe(
        take(1),
        catchError(this.handleError('saveAwards')),
      );
  }
}
