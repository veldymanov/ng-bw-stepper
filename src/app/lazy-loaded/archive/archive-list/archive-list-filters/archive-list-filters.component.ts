import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material';

import { of, Observable, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, debounceTime, switchMap, take } from 'rxjs/operators';

import { CampaignSearchDto } from '../../../../core/interfaces/campaign-search-dto';
import { CampaignService } from '../../../../core/services/campaign.service';


@Component({
  selector: 'app-archive-list-filters',
  templateUrl: './archive-list-filters.component.html',
  styleUrls: ['./archive-list-filters.component.scss']
})
export class ArchiveListFiltersComponent implements OnInit, OnDestroy {

  @Output() filtersChanged = new EventEmitter<any>();
  @ViewChild('allYearsSelected') private allYearsSelected: MatOption;

  public form: FormGroup;
  public years = [{'year': 2017}, {'year': 2018}, {'year': 2019}, {'year': 2020}];
  public campaignTitles: string[] = ['Title1', 'Title2', 'Title3', 'Title4']; // remove
  public campaignTitles$: Observable<string[]>;

  private campaignTitlesGetSbj$ = new Subject<string>();

  constructor(
    private campaignService: CampaignService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.filterEmit();
    this.campaignTitlesGet();
  }

  ngOnDestroy(): void {
    this.campaignTitlesGetSbj$.complete();
    this.filtersChanged.complete();
  }

  filterEmit(): void {
    const years = this.form.value.yearFC.filter(item => item !== 0);
    const campaignTitle = this.form.value.campaignTitleFC;
    // console.log(years, campaignTitle);

    const filter: CampaignSearchDto = {
      award_id: null,
    };

    this.filtersChanged.emit(filter);
  }

  campaignTitleSearch(term: string) {
    this.campaignTitlesGetSbj$.next(term);
  }

  toggleAllSelection() {
    this.allYearsSelected.selected
      ? this.form.patchValue({yearFC: [...this.years, 0]})
      : this.form.patchValue({yearFC: []});

    this.filterEmit();
  }

  private campaignTitlesGet(): void {
    this.campaignTitles$ = this.campaignTitlesGetSbj$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => {
          if (term.length < 3) { return of<string[]>([]); }

          return of(this.campaignTitles);
        }),
        catchError(error => of<string[]>([]))
      );
  }

  private createForm(): void {
    this.form = this.fb.group({
      yearFC: [this.years, []],
      campaignTitleFC: [undefined, []],
      clientCompanyNameFC: [undefined, []],
      brandFC: [undefined, []],
      advertizingAgencyFC: [undefined, []],
      awardShowFC: [undefined, []],
    });
  }
}
