/**
 * Created by FoxPC on 11/27/2016.
 */

angular.module('myStoriesApp')
  .controller('RegisterCtrl', function ( $scope,$location, $log, User, $window ) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      '$scope',
      '$location',
      '$log',
      'User',
      '$window'
    ];

    $scope.registerUser=function(){
      $log.debug($scope.rgtUser.pseudo);
      $log.debug($scope.rgtUser.email1);
      $log.debug($scope.rgtUser.password);

      if($scope.rgtUser.$valid){
        var user = new Object();
        user.username=$scope.rgtUser.pseudo.$viewValue;
        user.pasword=$scope.rgtUser.password.$viewValue;
        user.email=$scope.rgtUser.email1.$viewValue;

        User.save(user);
      }else{
        $window.alert("Le formulaire comporte des erreurs");
      }



    };

  });
