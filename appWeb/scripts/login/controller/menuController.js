/**
 * Created by FoxPC on 11/27/2016.
 */

angular.module('myStoriesApp')
  .controller('menuController', function ( $scope,$location, $log, LoginService,$location, $rootScope, $cookies,AuthService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      '$scope',
      '$location',
      '$log',
      'LoginService',
      '$location',
      '$rootScope',
      '$cookies',
      'AuthService'
    ];
    
    $rootScope.authenticated=false;

    $scope.goRegister = function () {
      $location.path('/registerUser');
    };
    
            $log.debug("loginData");
            


            $log.debug("test service Auth",AuthService());
     

    
    $scope.loginUser=function(logindata){
        $log.debug("loginData", logindata);
        
    
        LoginService.tsop({emailUser:logindata.email,passwordUser:logindata.password},function(data){
            //store reponse in cookie to browse website

           $log.debug("data retour login",data);
           
           if(data.loginConfirm==="valid"){
               
                $rootScope.userLoginData= data;
                $rootScope.authenticated=true;
                
                var profilUser={
                    currentUser :{
                        username:data.username, 
                        emailuser:data.emailuser
                    }
                };
                
                var now = new Date();
                now.setDate(now.getDate() + 1205);

                $cookies.putObject('globals', profilUser,{expires:now});
                
                $location.path('/panelUser');
           }else{
                $rootScope.userLoginData = data;
                $rootScope.authenticated = false;
           }

        });

    };
    
            $scope.toPanelUser = function(){
                $location.path("/panelUser");
            };
    
              $scope.$on('$routeChangeStart', function(angularEvent, newUrl) {              
               var loggedIn= $rootScope.authenticated;
                if (newUrl.requireAuth && !loggedIn) {
                    // User isn’t authenticated
                    $location.path("/");
                }
            });

  });
