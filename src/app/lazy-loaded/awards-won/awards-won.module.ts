import { AwardsWonComponent } from './awards-won.component';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AwardsWonRoutingModule } from './awards-won.routing.module';
import { PointsByShowTableComponent } from './points-by-show-table/points-by-show-table.component';
import { TotalPointsTableComponent } from './total-points-table/total-points-table.component';

@NgModule({
  declarations: [
    AwardsWonComponent,
    PointsByShowTableComponent,
    TotalPointsTableComponent,
  ],
  imports: [
    SharedModule,
    AwardsWonRoutingModule
  ]
})
export class AwardsWonModule { }
