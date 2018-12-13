import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AgencyCreditSubFormComponent } from './agency-credit-sub-form/agency-credit-sub-form.component';
import { CampaignAgenciesComponent } from './campaign-agencies/campaign-agencies.component';
import { CampaignAgencyCreditsComponent } from './campaign-agency-credits/campaign-agency-credits.component';
import { CampaignAgencyFormComponent } from './campaign-agency-form/campaign-agency-form.component';
import { CampaignBaseComponent } from './campaign-base/campaign-base.component';
import { CampaignClientCreditsComponent } from './campaign-client-credits/campaign-client-credits.component';
import { CampaignProductionCreditsComponent } from './campaign-production-credits/campaign-production-credits.component';
import {
  ProductionCreditSubFormComponent,
} from './campaign-production-credits/production-credit-sub-form/production-credit-sub-form.component';
import { CreateEditCampaignRoutingModule } from './create-edit-campaign-routing.module';
import { CreateEditCampaignComponent } from './create-edit-campaign.component';


@NgModule({
  declarations: [
    AgencyCreditSubFormComponent,
    CampaignAgenciesComponent,
    CampaignAgencyCreditsComponent,
    CampaignBaseComponent,
    CampaignClientCreditsComponent,
    CampaignProductionCreditsComponent,
    CreateEditCampaignComponent,
    ProductionCreditSubFormComponent,
    CampaignAgencyFormComponent,
  ],
  imports: [
    SharedModule,
    CreateEditCampaignRoutingModule
  ]
})
export class CreateEditCampaignModule { }
