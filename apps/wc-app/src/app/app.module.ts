import { ApplicationRef, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    FormsModule,
  ],
  providers: [],
  // bootstrap: [AppComponent],
})
export class WcAppModule {
  constructor(private injector: Injector) {
    // Create custom element
    const AppElement = createCustomElement(AppComponent, { injector });
    // Register the custom element with the browser.
    customElements.define('wc-app', AppElement);
  }

  ngDoBootstrap(appRef: ApplicationRef): void {}
}
