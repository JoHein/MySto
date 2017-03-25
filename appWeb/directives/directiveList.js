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
          });

        });
      }
    };
  });

angular.module('myStoriesApp')
  .directive('checkDuplicateDB', ['$http', function($http) {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {

      function setAsAvailable(bool) {
        ngModel.$setValidity('pseudo', bool);
      }
      ngModel.$parsers.push(function(value) {
        if (!value || value.length < 3 ) return;
        setAsAvailable(false);

        $http.post('/checkDuplicateDB', {'username': value})
         .then(function(success){
           if(success.data){
             setAsAvailable(true);
           }else{
             setAsLoading(false);
             setAsAvailable(false);
           }

        },function(error){
          setAsAvailable(false);
        });

        return value;
      });
    }
  };
}]);

angular.module('myStoriesApp')
  .directive('checkDuplicateDBEmail', ['$http', function($http) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {

        function setAsAvailable(bool) {
          ngModel.$setValidity('emaildispo', bool);
        }
        ngModel.$parsers.push(function(value) {
          if (!value || value.length < 3 ) return;
          setAsAvailable(false);

          $http.post('/checkDuplicateDBEmail', {'email': value})
            .then(function(success){
              if(success.data){
                setAsAvailable(true);
              }else{
                setAsAvailable(false);
              }

            },function(error){
              setAsAvailable(false);
            });

          return value;
        });
      }
    };
  }]);
