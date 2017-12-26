import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelAdminComponent } from './panel-admin.component';

import { PanelAdminRouting } from './panel-admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PanelAdminRouting
  ],
  declarations: [
  ]
})
export class AdminModule {}
