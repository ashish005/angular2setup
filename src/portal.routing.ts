import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APIPortalLayout } from './layout/api-portal.layout';
import { HomeComponent, HubComponent, ContactComponent, CompanyComponent, PlatformComponent } from './wizni/index';
import { PageNotFound } from './shared/index';

const routes: Routes = [
  {
    path: '',
    component: APIPortalLayout,
    children: [
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'hub', component: HubComponent},
      {path: 'platform', component: PlatformComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'company', component: CompanyComponent}
    ]
  },
  { path: '**', component: PageNotFound }
];

export const PortalRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
