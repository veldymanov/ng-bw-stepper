import { AwardsSettingsComponent } from './awards-settings/awards-settings.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';

import { SettingsComponent } from './settings.component';
import { DictionariesComponent } from './dictionaries/dictionaries.component';
import { ItemsListComponent } from './dictionaries/items-list/items-list.component';
import { AddItemComponent } from './dictionaries/add-item/add-item.component';

@NgModule({
  declarations: [
    SettingsComponent,
    AwardsSettingsComponent,
    DictionariesComponent,
    ItemsListComponent,
    AddItemComponent,
  ],
  imports: [
    SharedModule,
    SettingsRoutingModule,
    FormsModule,
  ]
})
export class SettingsModule { }
