import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorService } from './auth-interceptor.service';
import { BaseUrlInterceptorService } from './base-url-interceptor.service';
import { DefaultHeadersInterceptorService } from './default-headers-interceptor.service';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptorService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DefaultHeadersInterceptorService, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
];
