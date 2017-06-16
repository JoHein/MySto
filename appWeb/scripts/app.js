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
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/registerUser',{
        templateUrl:'views/register.html',
        controller: 'RegisterCtrl'
      })
        .when('/panelUser',{
            templateUrl:'views/paneluser.html',
            controller: 'PanelUserCtrl'
//            resolve: {
//                access: ["Access", function(Access) { return Access.hasRole("ADMIN"); }]
//            }
        })
        .when('/article',{
            templateUrl:'views/article.html',
            controller:'ArticleCtrl'
        })
        .when('/emailverification',{
            templateUrl:'views/emailverification.html',
            controller:'EmailVerificationCtrl'
        })
        
      .otherwise({
        redirectTo: '/'
      });

  });
