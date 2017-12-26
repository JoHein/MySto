import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { PanelUserComponent } from './panel-user/panel-user.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';

const appRoutes: Routes = [
  {
    path: 'home',  component: HomeComponent
  },
  { path: 'register',  component: RegisterComponent  },
  { path: 'panelUser', component: PanelUserComponent},
  { path: 'panelAdmin', component: PanelAdminComponent},

  { path: '',   redirectTo: '/home', pathMatch: 'full' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [

  ]
})
export class AppRoutingModule { }
