'use strict';

/**
 * @ngdoc function
 * @name myStoriesApp.controller:EmailVerificationCtrl
 * @description
 * # AboutCtrl
 * Controller of the myStoriesApp
 */
angular.module('myStoriesApp')
  .controller('EmailVerificationCtrl', function (EmailVerif,$location,$log,$scope,$sanitize) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'EmailVerif',
      '$location',
      '$log',
      '$scope',
      '$sanitize'
    ];
    
    $scope.responseVerifEmail=null;

    var keyVerif = $location.search();
    EmailVerif.query({'keyVerif':keyVerif.key},function(data){
        $log.debug("Retour verification email : ",data);
        if(data.validationEmail==="OK"){
            $scope.responseVerifEmail="Votre émail a été vérifié.<br> Vous pouvez maintenant écrire vos histoires.";
        }else{
            $scope.responseVerifEmail="Votre émail n'a pu être vérifié car aucun utilisateur n'est enregisté avec cet émail.";

        }
    });
    
  });
