import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { APIDocComponent } from './api-doc/api-doc.component';
import { APIDashboardComponent } from './dashboard/api-dashboard';
import { APICreateDocComponent } from './dashboard/popup-components/create-doc.component';
import { APIPortalRoutingModule } from './api-portal.routing';
import { RedocModule } from '../lib/redoc.module';
import { COMMON_SERVICE, COMMON_DIRECTIVE, COMMON_MODULES } from '../shared/index';

@NgModule({
    imports: [ CommonModule, FormsModule, RedocModule, COMMON_MODULES, APIPortalRoutingModule ],
    providers:[ COMMON_SERVICE],
    declarations: [APIDocComponent, APIDashboardComponent, APICreateDocComponent, COMMON_DIRECTIVE],
})

export class APIPortalModule {
}
