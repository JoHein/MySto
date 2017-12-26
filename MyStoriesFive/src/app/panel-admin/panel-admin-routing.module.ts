import { PanelAdminComponent } from './panel-admin.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const PanelAdminRoutes: Routes = [
  {
    path: 'admin',
    component: PanelAdminComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(PanelAdminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PanelAdminRouting {}
