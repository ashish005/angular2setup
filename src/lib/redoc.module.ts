import { NgModule, ErrorHandler } from '@angular/core';//APP_ID
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';

import { Redoc, SecurityDefinitions, Method, REDOC_DIRECTIVES } from './components/index';
import { REDOC_COMMON_DIRECTIVES, DynamicNg2Wrapper } from './shared/components/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { REDOC_PIPES } from './utils/pipes';
import { CustomErrorHandler } from './utils/index'
import { LazyTasksService } from './shared/components/LazyFor/lazy-for';

import {
  OptionsService,
  MenuService,
  ScrollService,
  Hash,
  WarningsService,
  AppStateService,
  ComponentParser,
  ContentProjector,
  Marker,
  SearchService,
  COMPONENT_PARSER_ALLOWED, CommunicatorService, TryoutService } from './services/index';
import { SpecManager } from './utils/spec-manager';

@NgModule({
  imports: [ CommonModule, FormsModule, HttpModule, ReactiveFormsModule ],
  declarations: [ REDOC_DIRECTIVES, REDOC_COMMON_DIRECTIVES, REDOC_PIPES ],
  bootstrap: [ Redoc ],
  entryComponents: [ SecurityDefinitions, DynamicNg2Wrapper, Method ],
  providers: [
    SpecManager,
    ScrollService,
    Hash,
    MenuService,
    WarningsService,
    OptionsService,
    AppStateService,
    ComponentParser,
    ContentProjector,
    SearchService,
    LazyTasksService,
    CommunicatorService,
    TryoutService,
    Marker,
    //{ provide: APP_ID, useValue: 'redoc' },
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    { provide: COMPONENT_PARSER_ALLOWED, useValue: { 'security-definitions': SecurityDefinitions} }
  ],
  exports: [Redoc]
})
export class RedocModule {
}

export { Redoc, SpecManager };
