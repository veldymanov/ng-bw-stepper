import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEditContactComponent } from './create-edit-contact.component';

const routes: Routes = [
  { path: '',  component: CreateEditContactComponent },
  { path: ':contactId',  component: CreateEditContactComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateEditContactRoutingModule { }
