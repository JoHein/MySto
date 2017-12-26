import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ArticleComponent } from './article/article.component';
import { PanelAdminComponent } from './panel-admin/panel-admin.component';
import { EmailControlComponent } from './email-control/email-control.component';
import { PanelUserComponent } from './panel-user/panel-user.component';
import { RegisterComponent } from './register/register.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material';

import { LoginService } from './login/login.service';
import { AdminModule } from './panel-admin/panel-admin.module';
import { ArticleService } from './article/article.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ArticleComponent,
    PanelAdminComponent,
    EmailControlComponent,
    PanelUserComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AdminModule,
    RouterModule,
    MatIconModule,
  ],
  providers: [LoginService, ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
