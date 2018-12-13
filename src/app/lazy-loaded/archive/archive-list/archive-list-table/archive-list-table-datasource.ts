import { DataSource } from '@angular/cdk/collections';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, merge, Observable, of, Subject, Subscription } from 'rxjs';

import { CampaignSearchDto } from '../../../../core/interfaces/campaign-search-dto';
import { CampaignBaseDto } from '../../../../core/interfaces/campaign-base-dto';

import { CampaignService } from '../../../../core/services/campaign.service';
import { FiltersService } from '../../../../core/services/filters.service';
import { SearchService } from '../../../../core/services/search.service';


export class ArchiveListTableDataSource extends DataSource<CampaignBaseDto> {

  private allSubscription: Subscription;
  private filters: CampaignSearchDto = {}; // To subst type
  private filtersRecipe$: Observable<CampaignSearchDto>;
  private itemsList: CampaignBaseDto[]; // To subs type
  private itemsListSubject$ = new Subject<CampaignBaseDto[]>();
  private loadingSubject$ = new BehaviorSubject<boolean>(true);
  private searchRecipe$: Observable<string>;

  public loading$ = this.loadingSubject$.asObservable();

  constructor(
    private campaignService: CampaignService,
    private filtersService: FiltersService,
    private filters$: Observable<CampaignSearchDto>,
    private searchService: SearchService,
  ) {
    super();
  }

  connect(): Observable<CampaignBaseDto[]> {
    this.filtersRecipe$ = this.filters$
      .pipe(
        tap((filters: CampaignSearchDto) => {
          this.filters = this.setFilters(filters, this.filters);
        }),
      );

    this.searchRecipe$ = this.searchService.search$
      .pipe(
        tap((query: string) => {
          this.filters.query = query;
        })
      );

    const allOrderStreams = [
      this.filtersRecipe$,
      this.searchRecipe$,
    ];

    this.allSubscription = merge(...allOrderStreams)
      .pipe(
        switchMap(() => {
          this.loadingSubject$.next(true);
          this.filtersService.currentFilters = this.filters;
          return this.campaignService.getCampaings(this.filters);
        }),
        catchError(() => of<CampaignBaseDto[]>([])),
      ).subscribe((res: CampaignBaseDto[]) => {
        this.itemsList = res;
        this.loadingSubject$.next(false);
        this.itemsListSubject$.next(this.itemsList);
      });

    return this.itemsListSubject$.asObservable();
  }

  disconnect(): void {
    this.loadingSubject$.complete();
    this.itemsListSubject$.complete();
    this.allSubscription.unsubscribe();
  }

  private setFilters<T>(newFilters: T, existingFilters: T = {} as T): T {
    const filters: T = JSON.parse(JSON.stringify(existingFilters));

    Object.keys(newFilters).forEach(key => {
      if (newFilters[key] || newFilters[key] === 0) {
        filters[key] = newFilters[key];
      }

      if (newFilters[key] !== 0) {
        if (!newFilters[key] && this.filters.hasOwnProperty(key)) {
          delete filters[key];
        }
      }
    });

    return filters;
  }
}
