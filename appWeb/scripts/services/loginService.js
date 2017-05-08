/**
 * Created by FoxPC on 1/21/2017.
 */

angular.module('myStoriesApp').factory('LoginService', function($resource) {

  // Define CreditCard class
  var LoginService = $resource('/login/:id', {id:'@id'},
    {
      'query': {method:'get',isArray:false},
      'tsop':{method:'post',isArray:false},
      'update':{method:'update',isArray:false},
      'remove':{method:'delete',isArray:false}
    });
    
  return LoginService;
});
