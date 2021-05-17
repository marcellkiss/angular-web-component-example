import { ApplicationRef, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LinksComponent } from './components/links/links.component';
import { FirstComponent } from './pages/first/first.component';
import { HomeComponent } from './pages/home/home.component';
import { SecondComponent } from './pages/second/second.component';
import { WcAppComponent } from './wc-app.component';

@NgModule({
  declarations: [
    WcAppComponent,
    HomeComponent,
    FirstComponent,
    SecondComponent,
    LinksComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  // bootstrap: [AppComponent],
})
export class WcAppModule {
  constructor(private injector: Injector) {
    // Create custom element
    const AppElement = createCustomElement(WcAppComponent, { injector });
    // Register the custom element with the browser.
    customElements.define('wc-app', AppElement);
  }

  ngDoBootstrap(appRef: ApplicationRef): void {}
}
