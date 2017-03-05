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
    'ngAnimate'
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
        })
        .when('/article',{
            templateUrl:'views/article.html',
            controller:'ArticleCtrl'
        })
        
      .otherwise({
        redirectTo: '/'
      });

  });
