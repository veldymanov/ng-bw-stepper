import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AwardsWonComponent } from './awards-won.component';

const routes: Routes = [
  { path: '',  component: AwardsWonComponent },
  { path: ':contactId',  component: AwardsWonComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AwardsWonRoutingModule { }
