import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CampaignSearchDto } from '../../../../core/interfaces/campaign-search-dto';

import { ArchiveListTableDataSource } from './archive-list-table-datasource';

import { CampaignService } from '../../../../core/services/campaign.service';
import { FiltersService } from '../../../../core/services/filters.service';
import { SearchService } from '../../../../core/services/search.service';


@Component({
  selector: 'app-archive-list-table',
  templateUrl: './archive-list-table.component.html',
  styleUrls: ['./archive-list-table.component.scss']
})
export class ArchiveListTableComponent implements OnChanges, OnInit, OnDestroy {

  @Input() private filters: CampaignSearchDto;

  public dataSource: ArchiveListTableDataSource;
  public displayedColumns = ['id', 'name', 'brandName', 'clientCompanyName'];

  private filtersSubject$ = new BehaviorSubject<CampaignSearchDto>({});

  constructor(
    private campaignService: CampaignService,
    private filtersService: FiltersService,
    private searchService: SearchService,
  ) { }

  ngOnChanges(): void {
    this.filtersSubject$.next(this.filters);
  }

  ngOnInit() {
    this.dataSource = new ArchiveListTableDataSource(
      this.campaignService,
      this.filtersService,
      this.filtersSubject$.asObservable(),
      this.searchService,
    );
  }

  ngOnDestroy(): void {
    this.filtersSubject$.complete();
  }

}
