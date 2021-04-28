import { ApplicationRef, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LinksComponent } from './components/links/links.component';
import { FirstComponent } from './pages/first/first.component';
import { HomeComponent } from './pages/home/home.component';
import { SecondComponent } from './pages/second/second.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FirstComponent,
    SecondComponent,
    LinksComponent,
  ],
  imports: [
    BrowserModule,
    // RouterModule.forChild(
    // RouterTestingModule.withRoutes(
    RouterModule.forRoot(
      [
        {
          path: '',
          component: HomeComponent,
          outlet: 'wcRouter',
        },
        {
          path: 'first',
          component: FirstComponent,
          outlet: 'wcRouter',
        },
        {
          path: 'second',
          component: SecondComponent,
          outlet: 'wcRouter',
        },
      ],
      { initialNavigation: 'enabled' }
    ),
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
