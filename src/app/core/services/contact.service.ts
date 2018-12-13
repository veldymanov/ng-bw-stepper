import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

import { ContactDto } from '../interfaces/contact-dto';
import { TitleDto } from '../interfaces/title-dto';

import { ErrorHandlerService, HandleError } from './error-handler.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private handleError: HandleError;

  constructor(
    errorHandlerService: ErrorHandlerService,
    private http: HttpClient,
    private httpService: HttpService
  ) {
    this.handleError = errorHandlerService.createHandleError('ContactService');
  }

  getContact(id: number): Observable<ContactDto> {
    return this.http.get<ContactDto>(`/contacts/${id}`)
      .pipe(
        take(1),
        catchError(this.handleError('getContact')),
      );
  }

  getConacts(payload: {query?: string, limit?: number}): Observable<ContactDto[]> {
    const options = {
      params: this.httpService.setHttpParams(payload),
    };

    return this.http.get<ContactDto[]>(`/contacts`, options)
      .pipe(
        take(1),
        catchError(this.handleError('getConacts')),
      );
  }

  getConactsTitles(payload: {query?: string, limit?: number}): Observable<TitleDto[]> {
    const options = {
      params: this.httpService.setHttpParams(payload),
    };

    return this.http.get<TitleDto[]>(`/contacts/titles`, options)
      .pipe(
        take(1),
        catchError(this.handleError('getConactsTitles')),
      );
  }

  getBrands(payload: {query?: string, limit?: number}): Observable<TitleDto[]> {
    return this.http.get<TitleDto[]>(`/contacts/brands`, { params: this.httpService.setHttpParams(payload) })
      .pipe(
        take(1),
        catchError(this.handleError('getBrands')),
      );
  }

  getClientCompanies(payload: {query?: string, limit?: number}): Observable<TitleDto[]> {
    return this.http.get<TitleDto[]>(`/contacts/client-companies`, { params: this.httpService.setHttpParams(payload) })
      .pipe(
        take(1),
        catchError(this.handleError('getClientCompanies')),
      );
  }

  saveContact(payload: ContactDto): Observable<ContactDto> {
    return this.http.post<ContactDto>('/contacts', payload)
      .pipe(
        take(1),
        catchError(this.handleError('saveContact')),
      );
  }

  deleteTitle(id) {
    return this.http.delete<TitleDto>(`/contacts/titles/${id}`);
  }

  addTitle(item: TitleDto) {
    return this.http.post<TitleDto>('/contacts/titles', item);
  }
}
