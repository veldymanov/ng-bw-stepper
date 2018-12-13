import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';

import { RankingCategories } from '../enums/ranking-categories.enum';
import { BaseDictionaryDto } from '../interfaces/base-dictionary-dto';
import { RankingListDto } from '../interfaces/ranking-list-dto';
import { RankingRequestDto } from '../interfaces/ranking-request-dto';
import { ErrorHandlerService, HandleError } from './error-handler.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  private handleError: HandleError;
  public items: RankingListDto;
  public filters: RankingRequestDto;

  constructor(
    errorHandlerService: ErrorHandlerService,
    private http: HttpClient,
    private httpService: HttpService
  ) {
    this.handleError = errorHandlerService.createHandleError('RankingService');
  }

  getRanks(filters: RankingRequestDto): Observable<RankingListDto> {
    return this.http.post<RankingListDto>('/rankings', filters)
      .pipe(
        take(1),
        tap(i => {
          this.items = i;
          this.filters = filters;
        }),
        catchError(this.handleError('getRanks')),
      );
  }

  getCategoryTitles(category: RankingCategories): Observable<BaseDictionaryDto[]> {
    return this.http.get<BaseDictionaryDto[]>(`/rankings/category-titles?category=${category}`)
      .pipe(
        take(1),
        catchError(this.handleError('getCategoryTitles')),
      );
  }
}
