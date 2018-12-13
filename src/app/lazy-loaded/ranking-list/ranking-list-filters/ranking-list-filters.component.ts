import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material';
import { RankingRequestDto } from 'src/app/core/interfaces/ranking-request-dto';
import { AwardService } from 'src/app/core/services/award.service';
import { AwardDto } from 'src/app/core/interfaces/award-dto';
import { RankingCategories } from 'src/app/core/enums/ranking-categories.enum';
import { RankingService } from 'src/app/core/services/ranking.service';
import { BaseDictionaryDto } from 'src/app/core/interfaces/base-dictionary-dto';

@Component({
  selector: 'app-ranking-list-filters',
  templateUrl: './ranking-list-filters.component.html',
  styleUrls: ['./ranking-list-filters.component.scss']
})
export class RankingListFiltersComponent implements OnInit, OnDestroy {

  @Output() filtersChanged = new EventEmitter<RankingRequestDto>();
  @ViewChild('allCriteriasSelected') private allCriteriasSelected: MatOption;

  public form: FormGroup;
  public itemsQuantity: number[] = [10, 20];
  public criteriasList: string[];
  public awardShowsList: AwardDto[] = [];
  public yearsList: string[] = ['2018', '2017'];
  public titleList: BaseDictionaryDto[] = [];
  public loading = true;

  constructor(
    private fb: FormBuilder,
    private awardService: AwardService,
    private rankingService: RankingService,
  ) { }

  ngOnInit(): void {
    this.criteriasList = Object.values(RankingCategories);
    this.createForm();
    this.awardService.getAwards()
      .subscribe(
        (resp) => {
          this.awardShowsList = resp;
          this.loading = false;
        },
        err => this.loading = false,
      );
    this.prefilFilters();
  }

  compareFn(a1: AwardDto, a2: AwardDto): boolean {
    return a1 && a2 ? a1.id === a2.id : a1 === a2;
  }

  ngOnDestroy(): void {
    this.filtersChanged.complete();
  }

  prefilFilters(): void  {
    if (this.rankingService.filters) {
      this.criteriaSelected(this.rankingService.filters.category);

      this.form.patchValue({
        itemsQuantityFC: this.rankingService.filters.top,
        criteriasListFC: this.rankingService.filters.category,
        awardShowsListFC: this.rankingService.filters.awards,
        yearsListFC: this.rankingService.filters.year,
      });
    }
  }

  filterEmit(): void {
    if (!this.form.valid) {
      return;
    }

    const category = this.form.value.criteriasListFC;
    const top = this.form.value.itemsQuantityFC;
    const awards = this.form.value.awardShowsListFC;
    const year = this.form.value.yearsListFC;
    const title = this.form.value.titleListFC;

    const filter: RankingRequestDto = { awards, category, title, top, year };
    this.filtersChanged.emit(filter);
  }

  toggleAllSelection() {
    this.allCriteriasSelected.selected
      ? this.form.patchValue({awardShowsListFC: [...this.awardShowsList, 0]})
      : this.form.patchValue({awardShowsListFC: []});
  }

  criteriaSelected(criteria: RankingCategories) {
    this.loading = true;
    this.rankingService.getCategoryTitles(criteria)
      .subscribe(
        (res) => {
          this.titleList = res;
          this.loading = false;
          if (this.rankingService.filters && this.rankingService.filters.title.id) {
            this.form.patchValue({
              titleListFC: this.titleList.find(t => t.id === this.rankingService.filters.title.id),
            });
          }
        },
        err => this.loading = false,
      );
  }

  private createForm(): void {
    this.form = this.fb.group({
      itemsQuantityFC: [10, [Validators.required]],
      criteriasListFC: [undefined, [Validators.required]],
      awardShowsListFC: [undefined, [Validators.required]],
      yearsListFC: [undefined, [Validators.required]],
      titleListFC: [undefined, []],
    });
  }
}
