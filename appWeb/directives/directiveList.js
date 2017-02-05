/**
 * Created by FoxPC on 2/4/2017.
 */

angular.module('myStoriesApp')

  .directive('checkSameDirective', function (){
    return{
      require: 'ngModel',
      link: function(scope,element,attrs,ctrl){

        var firstpassword = '#' + attrs.checkSameDirective;

        element.add(firstpassword).on('keyup',function () {

          scope.$apply(function () {
            var valid = element.val()===$(firstpassword).val();
            ctrl.$setValidity('checkerrormatch',valid);
          })

        })
      }
    }
  });
/*angular.module('myStoriesApp')
  .directive('checkDuplicateDB', [$http,function($http){
    return{
      require:'ngModel',
      link:function(scope,element,attrs){
        var validatorDB= attrs.checkDuplicateDB;

        function setIsLoading(loading){
          ngModel.$setValidity('isLoading',!loading);
        }
        function setIsAvailable(available){
          ngModel.$setValidity('isAvailable', available);
        }

        ngModel.$parsers.push(function(value) {
          if (!value || value.length == 0)
            return;
          setIsLoading(true);
          setIsAvailable(false);

          $http.get(validatorDB, {
            v: value
          }).success(function() {
            setIsLoading(false);
            setIsAvailable(true);
          }).error(function() {
            setIsLoading(false);
            setIsAvailable(false);
          });
          return value;
        })
      }
    }
}]);*/
