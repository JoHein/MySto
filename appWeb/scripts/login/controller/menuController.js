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
               
               $log.debug("data apres login valid",data);
               
                $rootScope.userLoginData= data;
                $rootScope.authenticated=true;
                
                var profilUser={
                    currentUser :{
                        username:data.username, 
                        emailuser:data.emailuser,
                        admin:data.admin
                    }
                };
                
                var now = new Date();
                now.setDate(now.getDate() + 1205);

                $cookies.putObject('globals', profilUser,{expires:now});
                $log.debug("data.admin",data.admin);
                if(data.admin){
                   $location.path('/panelAdmin');
                }else{
                   $location.path('/panelUser');
                }
                
           }else{
                $rootScope.userLoginData = data;
                $rootScope.authenticated = false;
           }

        });

    };
    
            $scope.toPanelUser = function(){
               var isAdmin = $cookies.getObject('globals');
               
                if(isAdmin.currentUser.admin){
                    $location.path("/panelAdmin");
                }else{
                   $location.path("/panelUser");
                }
            };
    
              $scope.$on('$routeChangeStart', function(angularEvent, newUrl) {              
               var loggedIn= $rootScope.authenticated;
               var loggInAdmin= $rootScope.adminAuthenticated;
                if (newUrl.requireAuth && !loggedIn) {
                    // User isn’t authenticated
                    $location.path("/");
                }else if(newUrl.requireAdminAuth && !loggInAdmin){
                    $location.path("/");
                }
            });

  });
