import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { WcAppModule } from './app/app.module';
import { environment } from './environments/environment';

console.log(`MAIN.TS of WC-APP`);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(WcAppModule)
  .catch((err) => console.error(`Error in wc-app`, err));
