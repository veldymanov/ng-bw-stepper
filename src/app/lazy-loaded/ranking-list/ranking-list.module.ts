import { RankingListTableComponent } from './ranking-list-table/ranking-list-table.component';
import { RankingListFiltersComponent } from './ranking-list-filters/ranking-list-filters.component';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { RankingListRoutingModule } from './ranking-list-routing.module';

import { RankingListComponent } from './ranking-list.component';

@NgModule({
  declarations: [
    RankingListComponent,
    RankingListFiltersComponent,
    RankingListTableComponent
  ],
  imports: [
    SharedModule,
    RankingListRoutingModule
  ]
})
export class RankingListModule { }
