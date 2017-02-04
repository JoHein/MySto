/**
 * Created by FoxPC on 2/4/2017.
 */

angular.module('myStoriesApp')
  .directive('registerPwdCheck', function (){
    return{
      require: 'ngModel',
      link: function(scope,element,attrs,ctrl){

        var firstpassword = '#' + attrs.registerPwdCheck;

        element.add(firstpassword).on('keyup',function () {

          scope.$apply(function () {
            var valid = element.val()===$(firstpassword).val();
            ctrl.$setValidity('pwderrormatch',valid);
          })

        })
      }
    }
  });
