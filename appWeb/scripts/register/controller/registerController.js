/**
 * Created by FoxPC on 11/27/2016.
 */

angular.module('myStoriesApp')
  .controller('RegisterCtrl', function ( $scope,$location, $log, Subscriber, $window, Flash, vcRecaptchaService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      '$scope',
      '$location',
      '$log',
      'Subscriber',
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
      
    $log.debug('sending the captcha response to the server', $scope.response);  

      if($scope.rgtUser.$valid){
        var subscriber = new Object();
        subscriber.username=($scope.rgtUser.pseudo.$viewValue).toLowerCase();
        subscriber.password=$scope.rgtUser.password.$viewValue;
        subscriber.email=$scope.rgtUser.email1.$viewValue;
        subscriber.recaptchaResponse=$scope.response;
        
        Subscriber.save(subscriber,function(data){
            $log.debug("POST POST POST", data);
        });
      }else{
        var message = 'Le formulaire comporte des erreurs';
        Flash.create('warning', message);
      }

    };



  });
