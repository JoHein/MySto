/**
 * Created by FoxPC on 1/21/2017.
 */
var myModule = angular.module('myModule', []);
myModule.factory('serviceId', function() {
  var shinyNewServiceInstance;


  // Define CreditCard class
  var CreditCard = $resource('/user/:userId/card/:cardId',
    {userId:123, cardId:'@id'}, {
      charge: {method:'POST', params:{charge:true}}
    });
});
