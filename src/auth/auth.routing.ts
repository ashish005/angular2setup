import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthTokenValidator } from './index';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    }
];

export const AUTHRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);