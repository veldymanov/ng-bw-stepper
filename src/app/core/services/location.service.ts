import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { BaseDictionaryDto } from '../interfaces/base-dictionary-dto';

import { ErrorHandlerService, HandleError } from './error-handler.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private handleError: HandleError;

  constructor(
    errorHandlerService: ErrorHandlerService,
    private http: HttpClient,
    private httpService: HttpService
  ) {
    this.handleError = errorHandlerService.createHandleError('LocationService');
  }

  getCities(payload: {query?: string, limit?: number}): Observable<BaseDictionaryDto[]> {
    const options = {
      params: this.httpService.setHttpParams(payload),
    };

    return this.http.get<BaseDictionaryDto[]>(`/locations/cities`, options)
      .pipe(
        take(1),
        catchError(this.handleError('getCities')),
      );
  }

  getCountries(payload: {query?: string, limit?: number}): Observable<BaseDictionaryDto[]> {
    const options = {
      params: this.httpService.setHttpParams(payload),
    };

    return this.http.get<BaseDictionaryDto[]>(`/locations/countries`, options)
      .pipe(
        take(1),
        catchError(this.handleError('getCountries')),
      );
  }

  deleteCity(id) {
    return this.http.delete<BaseDictionaryDto>(`/locations/cities/${id}`);
  }

  deleteCountry(id) {
    return this.http.delete<BaseDictionaryDto>(`/locations/countries/${id}`);
  }

  addCity(item: BaseDictionaryDto) {
    return this.http.post<BaseDictionaryDto>('/locations/cities', item);
  }

  addCountry(item: BaseDictionaryDto) {
    return this.http.post<BaseDictionaryDto>('/locations/countries', item);
  }
}
