/**
 * Created by FoxPC on 1/21/2017.
 */

angular.module('myStoriesApp').factory('ArticleService', function($resource) {

  // Define CreditCard class
  var ArticleService = $resource('/getListArticle/:id', {id:'@id'},
    {
      'query': {method:'get',isArray:false},
      'save':{method:'post', url:'/saveArticle',isArray:false},
      'update':{method:'update',isArray:false},
      'remove':{method:'delete',isArray:false}

    });
    
  return ArticleService;
});
