angular.module('myStoriesApp')
    .controller('PanelUserCtrl', function ( $scope ,$location, $log,ArticleService,$rootScope  ) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma',
            '$scope',
            '$location',
            '$log',
            'ArticleService',
            '$rootScope'
        ];
        
        $scope.listArticle=null;
        $log.debug("test logindata",$rootScope.userLoginData.emailuser );
        ArticleService.query({email:$rootScope.userLoginData.emailuser},function(data){
            $log.debug("retour de l'article dans le controller JS: ", data.listArtSubscriber );
            $scope.listArticle=data.listArtSubscriber;
            
        },function(error){
            $log.debug("error get List Article",error);
        });
        
        $scope.writeOpen = function(){
            $location.path('/article');
        };

    });