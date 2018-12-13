import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ArchiveRoutingModule } from './archive-routing.module';

import { ArchiveComponent } from './archive.component';
import { ArchiveListComponent } from './archive-list/archive-list.component';
import { ArchiveListFiltersComponent } from './archive-list/archive-list-filters/archive-list-filters.component';
import { ArchiveListTableComponent } from './archive-list/archive-list-table/archive-list-table.component';

@NgModule({
  declarations: [
    ArchiveComponent,
    ArchiveListComponent,
    ArchiveListFiltersComponent,
    ArchiveListTableComponent
  ],
  imports: [
    SharedModule,
    ArchiveRoutingModule
  ]
})
export class ArchiveModule { }
