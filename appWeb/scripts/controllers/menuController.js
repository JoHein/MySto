/**
 * Created by FoxPC on 11/27/2016.
 */

angular.module('myStoriesApp')
  .controller('menuController', function ( $scope,$location, $log, LoginService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      '$scope',
      '$location',
      '$log',
      'LoginService'
    ];
    

    $scope.goRegister = function () {
      $location.path('/registerUser');
    };
    
    
    
    $scope.loginUser=function(logindata){
        $log.debug("loginData", logindata);
        
        //TODO
        //Encrypt password before sending???
        
        LoginService.tsop({emailUser:logindata.email,passwordUser:logindata.password},function(data){
            //store reponse in cookie to browse website
            $log.debug("data retour login",data);
            $scope.userLoginData= data;
        });
        
    };

  });
