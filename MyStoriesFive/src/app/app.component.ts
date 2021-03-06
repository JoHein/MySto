import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';

import { LoginService } from './login/login.service';
import { LoginModel } from './login/login.model';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

constructor(public router: Router, private loginService: LoginService) {}

  title = 'app';
  authenticated = false;
  loginFormExpand = false;
  loginFormModel = LoginModel;
  userData;

  expandLogin(loginFormExpand) {
    if (loginFormExpand) {
      this.loginFormExpand = false;
    } else {
      this.loginFormExpand = true;
    }
  }

  goRegister() {
    this.router.navigate(['/register']);
  }


  // AuthService call on INIT

  loginUser(loginForm: LoginModel): void {
    loginForm.emailuser = loginForm.emailuser.trim();
     this.loginService.loginUser(loginForm)
     .subscribe(result => {
      this.userData = result as LoginModel;
        if (this.userData.loginConfirm === 'valid') {
          // mettre en session l'email de l'user;
          localStorage.setItem('emailuser', this.userData.emailuser);
          if (this.userData.toPage === '/panelUser') {
            this.router.navigate(['/panelUser']);
          } else {
            this.router.navigate(['/panelAdmin']);
          }
        }
        if (this.userData.loginConfirm === 'notValid') {

        }
        if (this.userData.loginConfirm === 'notVerified') {

        }
     });
  }



  // Login Service {emailUser, password}
  // if data valid
  // $rootScope.userLoginData= data;
  // $rootScope.authenticated=true; (faire ca dans le backend retourner TRUE)
  // var profilUser {currentUser :{username:data.username, emailuser}}
  // redirect to UserPanel
  //
  // ELSE
  // $rootScope.userLoginData = data;
  // $rootScope.authenticated = false;

  // function to UserPanel
  // verifier que c'est le bon USER

  // Authoriser l'acces que si authentifié
  // Authoriser page admin uniquement si admin

  ngOnInit() {

  }
}


