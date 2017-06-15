/**
 * Created by FoxPC on 11/27/2016.
 */

angular.module('myStoriesApp')
  .controller('menuController', function ( $scope,$location, $log, LoginService,$location, $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      '$scope',
      '$location',
      '$log',
      'LoginService',
      '$location',
      '$rootScope'
    ];
    

    $scope.goRegister = function () {
      $location.path('/registerUser');
    };
    
            $log.debug("loginData");

    
    $scope.loginUser=function(logindata){
        $log.debug("loginData", logindata);
        
    
        LoginService.tsop({emailUser:logindata.email,passwordUser:logindata.password},function(data){
            //store reponse in cookie to browse website

           $log.debug("data retour login",data);
           
           if(data.loginConfirm==="valid"){
                $rootScope.userLoginData= data;
                $location.path('/panelUser');
           }else{
                $rootScope.userLoginData= data;
           }

        });




        
    };

  });
