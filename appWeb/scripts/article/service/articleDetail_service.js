(function() {
    'use strict';

    angular.module('myStoriesApp').
        factory('GetArticleDetail', getArticleDetail);
    
    
    
function getArticleDetail(){
            
            var property;

            return {
                getProperty: function () {
                    return property;
                },
                setProperty: function(value) {
                    property = value;
                }
            };
        };

})();