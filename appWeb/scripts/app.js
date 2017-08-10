'use strict';

/**
 * @ngdoc overview
 * @name myStoriesApp
 * @description
 * # myStoriesApp
 *
 * Main module of the application.
 */
angular
  .module('myStoriesApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'ngMessages',
    'ngFlash',
    'ngAnimate',
    'vcRecaptcha',
    'angularjs-crypto'
    ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'scripts/mainPage/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'scripts/about/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/registerUser',{
        templateUrl:'scripts/register/register.html',
        controller: 'RegisterCtrl'
      })
    .when('/panelUser',{
        templateUrl:'scripts/panelUser/paneluser.html',
        controller: 'PanelUserCtrl',
        requireAuth: true,
        resolve:{
            dataUser:function(AuthService){
                return AuthService();
            }
        }
    })
    .when('/article',{
        templateUrl:'scripts/article/article.html',
        controller:'ArticleCtrl',
        requireAuth: true,
        resolve:{
            dataUser:function(AuthService){
                return AuthService();
            }
        }
    })
    .when('/emailverification',{
        templateUrl:'scripts/emailverification/emailverification.html',
        controller:'EmailVerificationCtrl'
    })
        
      .otherwise({
        redirectTo: '/'
      });

  });
