import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { PortalModule } from './portal.module';

export function bootstrapPortal() {
  return platformBrowserDynamic().bootstrapModule(PortalModule);
}
