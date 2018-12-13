import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { NavigationComponent } from './navigation.component';
import { TopNavComponent } from './top-nav/top-nav.component';

@NgModule({
  declarations: [
    NavigationComponent,
    TopNavComponent
  ],
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [
    NavigationComponent,
  ]
})
export class NavigationModule { }
