/**
 * Created by FoxPC on 1/21/2017.
 */

angular.module('myStoriesApp')
        .factory('AuthService', function($rootScope,$cookies,$log,LoginService) {
            
    return function() {
        
           LoginService.authenticated(function(data){
               $log.debug("Auth service data : ", data);
               if(data.authspecial){
                   $log.debug("data special data");

                    $rootScope.adminAuthenticated=true;
                    
                    var  profilUser ={ 
                        currentUser :{
                            username:data.username, 
                            emailuser:data.email
                        }
                    };
                    $rootScope.userLoginData = profilUser;
                    
                    return $rootScope;
               }else{
                    $log.debug("normal user authserver");
                    
                     var  profilUser ={ 
                        currentUser :{
                            username:data.username, 
                            emailuser:data.email
                        }
                    };
                    $rootScope.userLoginData = profilUser;

                    $rootScope.authenticated=true;
                    $rootScope.adminAuthenticated=false;
                    return $rootScope;
               }
           });
        
//          var dataCook = $cookies.getObject('sessionMysto');
//            $log.debug("token dataCook",dataCook);
//
//            if(dataCook!==undefined){
//                $rootScope.authenticated=true;
//                return $rootScope;
//                
//            }else{
//                $rootScope.authenticated=false;
//                return $rootScope;
//            }
       };
});

