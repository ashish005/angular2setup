import { platformBrowser } from '@angular/platform-browser';
import { PortalModuleNgFactory } from '../compiled/src/portal.module.ngfactory';

export function bootstrapPortal() {
  return platformBrowser().bootstrapModuleFactory(PortalModuleNgFactory);
}
