import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CreateEditContactRoutingModule } from './create-edit-contact-routing.module';

import { CreateEditContactComponent } from './create-edit-contact.component';

@NgModule({
  declarations: [
    CreateEditContactComponent
  ],
  imports: [
    SharedModule,
    CreateEditContactRoutingModule
  ]
})
export class CreateEditContactModule { }
