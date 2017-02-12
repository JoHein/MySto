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

angular.module('myStoriesApp')
  .directive('checkDuplicateDB', ['$http', function($http) {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {

      function setAsLoading(bool) {
        ngModel.$setValidity('recordLoading', !bool);
      }

      function setAsAvailable(bool) {
        ngModel.$setValidity('recordAvailable', bool);
      }
      ngModel.$parsers.push(function(value) {
        if (!value || value.length == 0) return;
        setAsLoading(true);
        setAsAvailable(false);

        $http.post('/checkDuplicateDB', {'username': value})

         .then(function(sucess){
          setAsLoading(false);
          setAsAvailable(true);
        },function(error){
          setAsLoading(false);
          setAsAvailable(false);
        });

        return value;
      })
    }
  }
}]);
