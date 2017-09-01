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

           $log.debug("data retour login",data);
           
           if(data.loginConfirm==="valid"){
               
               $log.debug("data apres login valid",data);
               
                $rootScope.userLoginData= data;
                $rootScope.authenticated=true;
                
                var profilUser={
                    currentUser :{
                        username:data.username, 
                        emailuser:data.emailuser
                    }
                    };
                $rootScope.userLoginData= profilUser;
                $rootScope.authenticated=true;
                
                $log.debug("data apres login valid",data);

                $location.path(data.toPage);

           }else{
                $rootScope.userLoginData = data;
                $rootScope.authenticated = false;
           }

        });

    };
    
            $scope.toPanelUser = function(){
                $log.debug("$rootScope.userLoginData",$rootScope.userLoginData);

                LoginService.query({emailUser:$rootScope.userLoginData.currentUser.emailuser},function(data){
                    $location.path(data.toPage);
                });

            };
    
            $scope.$on('$routeChangeStart', function(angularEvent, newUrl) {     
              $log.debug("$rootScope.authenticated",$rootScope.authenticated);
              $log.debug("$rootScope.adminAuthenticated",$rootScope.adminAuthenticated);

               var loggedIn= $rootScope.authenticated;               
               var loggInAdmin= $rootScope.adminAuthenticated;
                if (newUrl.requireAuth && !loggedIn) {
                    // User isn’t authenticated
                    $location.path("/");
                }else if(newUrl.requireAdminAuth && !loggInAdmin){
                    $location.path("/");
                }
            });
      
      checkSession();
      function checkSession(){
          
          AuthService();
          
//        LoginService.authenticated(function(data){
//            $log.debug("auth front side : ",data);
//                var  profilUser ={ 
//                        currentUser :{
//                            username:data.username, 
//                            emailuser:data.email
//                        }
//                    };
//                 $log.debug("auth front side : ",profilUser);
//
//            $rootScope.userLoginData = profilUser;
//                 $log.debug("auth front side : ",$rootScope.userLoginData);
//
//        });

      };
  });