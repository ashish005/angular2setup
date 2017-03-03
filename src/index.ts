'use strict';
import { enableProdMode } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';

var bootstrapPortal;
if (AOT) {
  bootstrapPortal = require('./bootstrap').bootstrapPortal;
} else {
  bootstrapPortal = require('./bootstrap.dev').bootstrapPortal;
}

if (IS_PRODUCTION) {
  disableDebugTools();
  enableProdMode();
}

var moduleRef;
export function init() {
  bootstrapPortal()
    .then(appRef => {
      moduleRef = appRef;
      console.log('Portal app initialized!');
    }).catch(err => {
    throw err;
  });
}
init();
