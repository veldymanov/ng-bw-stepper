import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchSbj$ = new Subject<string>();
  public search$: Observable<string> = this.searchSbj$.asObservable()
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
    );

  constructor() { }

  public search(query: string) {
    this.searchSbj$.next(query);
  }
}
