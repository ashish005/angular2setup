import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PortalRoutingModule } from './portal.routing';
import { PortalComponent } from './portal.component';
import { APIPortalLayout } from './layout/api-portal.layout';
import { PORTAL_DIRECTIVE } from './api-portal/index';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { RedocModule } from './lib/redoc.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PortalRoutingModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBkylB0fW9mpUW4j4OD-AphSZ-xiM2W3H0'}),
    RedocModule
  ],
  providers:[
    { provide: APP_ID, useValue: 'portal' },
  ],
  declarations: [ PortalComponent, APIPortalLayout, PORTAL_DIRECTIVE ],
  bootstrap:[ PortalComponent ]
})

export class PortalModule {}
