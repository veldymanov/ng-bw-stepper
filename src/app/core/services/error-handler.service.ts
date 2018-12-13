import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError} from 'rxjs';

import { HttpService } from './http.service';
import { MessageService } from './message.service';
import { NotificationService } from './notification.service';

/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError = (operation?: string) => (error: HttpErrorResponse) => Observable<any>;


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(
    private httpService: HttpService,
    private messageService: MessageService,
    private notificationService: NotificationService,
  ) { }

  /** Create curried handleError function that already knows the service name */
  createHandleError = (serviceName = '') => (operation = 'operation') => this.handleError(serviceName, operation);

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   */
  handleError(serviceName, operation) {
  // handleError<T>(serviceName = '', operation = 'operation', result = undefined as T) {
    return (error: HttpErrorResponse) => {
      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      let message: string;

      if (error.error instanceof ErrorEvent) {
        message = error.error.message;
        this.notificationService.error(message, 'Client Side Error');
      } else {
        message = `server returned code ${error.status} with body "${error.error}"`;
        this.handleServerErrors(error);
      }

      // TODO: better job of transforming error for user consumption
      this.messageService.add(`${serviceName}: ${operation} failed: ${message}`);
      console.error(`${serviceName}: ${operation} failed.`);

      // Let the app keep running by returning a safe result.
      // return of(result);
      return throwError(error.error);
    };

  }

  private handleServerErrors(error: HttpErrorResponse): void {
    if (!error || !error.status) { return; }

    // user is not authorized
    if (error.status === 401) {
      this.httpService.removeToken();
    }

    if (error.status === 400) {
      const json = error.error;
      let message = '';

      if (Array.isArray(json)) {
        json.forEach((obj) => {
          if (typeof obj.constraints === 'object') {
            const values = Object.values(obj.constraints);
            values.forEach(v => {
              message += `${v}<br>`;
            });
          }
        });
      } else if (typeof json.message === 'string') {
          message = json.message;
          if (json.description) {
            message += ` ${json.description}`;
          }
      } else if (typeof json.title === 'string') {
        message = json.title;
      } else if (typeof json === 'string') {
        message = json;
      }

      this.notificationService.warning(message, 'Server Warning');
    } else {
      let message = `${error.status} ${error.statusText}`;
      const json = error.error;

      if (json.message) {
        message += ` ${json.message}`;
      }

      this.notificationService.error(message, 'Server Error');
    }
  }
}
