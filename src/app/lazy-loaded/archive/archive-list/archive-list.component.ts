import { Component } from '@angular/core';
import { CampaignSearchDto } from '../../../core/interfaces/campaign-search-dto';

@Component({
  selector: 'app-archive-list',
  styles: [`
    :host {
      display: block;
      min-width: 1080px;
    }

    a {
      margin-left: 5px;
    }
  `],
  template: `
    <a [routerLink]="['/create-edit-campaign']">
      <button mat-stroked-button color="primary">
        Create New Campaign
      </button>
    </a>

    <a [routerLink]="['/create-edit-contact']">
      <button mat-stroked-button color="primary">
        Add New Contact
      </button>
    </a>

    <a [routerLink]="['/ranking-list']">
      <button mat-stroked-button color="primary">
        Rankings List
      </button>
    </a>

    <app-archive-list-filters
        (filtersChanged)="changeFilters($event)">
    </app-archive-list-filters>

    <app-archive-list-table [filters]="filters">
    </app-archive-list-table>
  `
})
export class ArchiveListComponent {

  public filters: CampaignSearchDto;

  constructor() { }

  changeFilters(filters: CampaignSearchDto) {
    this.filters = filters;
  }
}
