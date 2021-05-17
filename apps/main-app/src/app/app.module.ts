import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MainAppComponent } from './main-app.component';
import { SimplePageComponent } from './pages/simple-page/simple-page.component';

@NgModule({
  declarations: [MainAppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        {
          path: 'web-component-host',
          loadChildren: () =>
            import('./web-component-host/web-component-host.module').then(
              (m) => m.WebComponentHostModule
            ),
        },
        {
          path: 'simple-page',
          component: SimplePageComponent,
        },
        { path: '**', redirectTo: '/web-component-host' },
      ],
      { initialNavigation: 'enabled' }
    ),
  ],
  providers: [],
  bootstrap: [MainAppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
