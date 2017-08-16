/**
 * Created by FoxPC on 1/21/2017.
 */

angular.module('myStoriesApp')
        .factory('AuthService', function($rootScope,$cookies,$log) {
            
    return function() {
          var dataCook = $cookies.getObject('globals');
            $log.debug("token dataCook",dataCook);

            if(dataCook){
                if(dataCook.currentUser.admin){
                    $rootScope.adminAuthenticated=true;
                }
            
                $rootScope.authenticated=true;
                $rootScope.userLoginData= dataCook;
                return $rootScope;
                
            }else{
                
                $rootScope.authenticated=false;
                $rootScope.userLoginData= "";
                
                return $rootScope;
            }
       };
});
