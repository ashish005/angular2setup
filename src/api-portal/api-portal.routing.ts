import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APIDocComponent } from './api-doc/api-doc.component';
import { APIDashboardComponent } from './dashboard/api.dashboard';

const routes: Routes = [
    {
        path: 'docViewer',
        children: [
            { path: '**', component: APIDocComponent }
        ]
    },
    {
        path: 'docDashboard',
        component: APIDashboardComponent,
        pathMatch: 'full'
    }
];

export const APIPortalRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
