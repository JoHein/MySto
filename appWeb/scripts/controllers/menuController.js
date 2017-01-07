/**
 * Created by FoxPC on 11/27/2016.
 */

angular.module('myStoriesApp')
  .controller('menuController', function ( $scope,$location, $log
) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      '$scope',
      '$location',
      '$log'
    ];

    $scope.goRegister = function () {
      $location.path('/registerUser');
    };

  });
