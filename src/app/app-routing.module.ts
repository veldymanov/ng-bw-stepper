import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, Router, RouterModule } from '@angular/router';

import { NavigationModule } from './navigation/navigation.module';

import { AuthGuard } from './core/guards/auth.guard';

import { ConfigComponent } from './config/config.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'archive', pathMatch: 'full' },
      { path: 'archive', loadChildren: './lazy-loaded/archive/archive.module#ArchiveModule' },
      {
        path: 'settings',
        loadChildren: './lazy-loaded/settings/settings.module#SettingsModule'
      },
      {
        path: 'create-edit-campaign',
        loadChildren: './lazy-loaded/create-edit-campaign/create-edit-campaign.module#CreateEditCampaignModule'
      },
      {
        path: 'create-edit-contact',
        loadChildren: './lazy-loaded/create-edit-contact/create-edit-contact.module#CreateEditContactModule'
      },
      {
        path: 'ranking-list',
        loadChildren: './lazy-loaded/ranking-list/ranking-list.module#RankingListModule'
      },
      {
        path: 'ranking-list/awards-won',
        loadChildren: './lazy-loaded/awards-won/awards-won.module#AwardsWonModule'
      },
    ]
  },
  { path: 'config', component: ConfigComponent},
  { path: 'login', component: LoginComponent},
  { path: '',   redirectTo: '/archive', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    NavigationModule,
    RouterModule.forRoot(
      routes,
      {
        // enableTracing: true, // <-- debugging purposes only
        preloadingStrategy: PreloadAllModules // SelectivePreloadingStrategy
      }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
