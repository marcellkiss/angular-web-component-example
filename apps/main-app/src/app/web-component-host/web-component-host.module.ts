import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebComponentHostComponent } from './web-component-host.component';

const routes: Routes = [
  {
    path: '**',
    component: WebComponentHostComponent,
  },
];

@NgModule({
  declarations: [WebComponentHostComponent],
  imports: [RouterModule.forChild(routes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WebComponentHostModule {}
