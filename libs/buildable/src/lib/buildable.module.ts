import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ExampleComponent } from './example/example.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ExampleComponent],
})
export class BuildableModule {
  constructor(private injector: Injector) {
    // Create custom element
    const PopupElement = createCustomElement(ExampleComponent, { injector });
    // Register the custom element with the browser.
    customElements.define('my-web-component', PopupElement);
  }

  // ngDoBootstrap(appRef: ApplicationRef): void {}
}
