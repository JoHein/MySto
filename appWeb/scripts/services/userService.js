/**
 * Created by FoxPC on 1/21/2017.
 */

angular.module('myStoriesApp').factory('User', function($resource) {

  // Define CreditCard class
  var User = $resource('/user/:id', {id:'@id'},
    {

      'query': {method:'get',isArray:false},
      'save':{method:'post',isArray:false},
      'update':{method:'update',isArray:false},
      'remove':{method:'delete',isArray:false}

    });
  return User;
});
