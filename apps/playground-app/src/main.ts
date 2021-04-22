import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

console.log(`MAIN.TS of PLAYGROUND-APP`);

if (environment.production) {
  enableProdMode();
}

// Include scripts
const scriptsSrcs = [
  'http://localhost:4210/polyfills.js',
  'http://localhost:4210/vendor.js',
  'http://localhost:4210/main.js',
];
scriptsSrcs.forEach((scriptSrc) => {
  const scriptEl = document.createElement('script');
  scriptEl.src = scriptSrc;
  document.head.appendChild(scriptEl);
});
console.log('Scripts are added');

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
