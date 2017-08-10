angular.module('myStoriesApp')
    .controller('ArticleCtrl', function ($scope,$location, $log,dataUser,ArticleService,$window,dataUser, $mdDialog ) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma',
            '$scope',
            '$location',
            '$log',
            'dataUser',
            'ArticleService',
            '$window',
            'dataUser',
            '$mdDialog'
        ];
        
        
        $scope.soumettre=function(article){
            
            article.emailuser=dataUser.userLoginData.currentUser.emailuser;
            
            ArticleService.save(article,function(data){
                $log.debug("data engineMyStorie",data);
                                   
                    $mdDialog.show(
                            $mdDialog.alert({
                                title: 'Info',
                                textContent: data.reponseSauvegarde,
                                ok: 'Ok'
                                })
                    );

            });
            
        };
        
        $scope.goBack=function(){
          $location.path('/panelUser');  
        };

});


