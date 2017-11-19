import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

constructor(public router: Router) {}

  title = 'app';
  authenticated = false;
  loginFormExpand = false;

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

  // redirect on click  to registerUser

  // AuthService call on INIT

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


