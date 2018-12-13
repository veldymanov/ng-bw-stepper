import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArchiveComponent } from './archive.component';
import { ArchiveListComponent } from './archive-list/archive-list.component';

const routes: Routes = [
  {
    path: '',
    component: ArchiveComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ArchiveListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchiveRoutingModule { }
