import { Component } from '@angular/core';
import { CampaignSearchDto } from '../../core/interfaces/campaign-search-dto';

@Component({
  selector: 'app-ranking-list',
  styles: [` `],
  template: `
    <router-outlet>
      <app-ranking-list-filters (filtersChanged)="changeFilters($event)"></app-ranking-list-filters>
      <app-ranking-list-table [filters]="filters"></app-ranking-list-table>
    </router-outlet>
  `,
})
export class RankingListComponent {

  public filters: CampaignSearchDto;

  constructor() { }

  changeFilters(filters: CampaignSearchDto) {
    this.filters = filters;
  }

}
