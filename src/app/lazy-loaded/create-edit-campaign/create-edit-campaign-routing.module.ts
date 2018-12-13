import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from '../../core/guards/can-deactivate.guard';

import { CreateEditCampaignComponent } from './create-edit-campaign.component';

const routes: Routes = [
  {
    path: '',
    component: CreateEditCampaignComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEditCampaignRoutingModule { }
