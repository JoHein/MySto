/**
 * Created by FoxPC on 11/27/2016.
 */

angular.module('myStoriesApp')
  .controller('RegisterCtrl', function ( $scope,$location, $log, User, $window, Flash, vcRecaptchaService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      '$scope',
      '$location',
      '$log',
      'User',
      '$window',
      'Flash',
      'vcRecaptchaService'
    ];
    
    $scope.response = null;
    $scope.widgetId = null;
    
    $scope.model={
        key:'6LeSHA0UAAAAABdIBfIgmveWjIBepUUu7d1D7G-H'
    };
    
      $scope.setResponse = function (response) {
            $log.debug("Response available : ", response);
            $scope.response = response;
        };
                
    $scope.setWidgetId = function (widgetId) {
        $log.debug("Created widget ID: %s : ", widgetId);
        $scope.widgetId = widgetId;
        
        };
    $scope.cbExpiration = function() {
        $log.debug("Captcha expired. Resetting response object");
        vcRecaptchaService.reload($scope.widgetId);
        $scope.response = null;
     };


    $scope.registerUser=function(){
//      $log.debug($scope.rgtUser.pseudo);
//      $log.debug($scope.rgtUser.email1);
//      $log.debug($scope.rgtUser.password);
      
    $log.debug('sending the captcha response to the server', $scope.response);  

      if($scope.rgtUser.$valid){
        var user = new Object();
        user.username=($scope.rgtUser.pseudo.$viewValue).toLowerCase();
        user.pasword=$scope.rgtUser.password.$viewValue;
        user.email=$scope.rgtUser.email1.$viewValue;
        user.recaptchaResponse=$scope.response;
        
        User.save(user);
      }else{
        var message = 'Le formulaire comporte des erreurs';
        Flash.create('warning', message);
      }

    };



  });
