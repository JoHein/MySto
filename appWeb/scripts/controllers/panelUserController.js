angular.module('myStoriesApp')
    .controller('PanelUserCtrl', function ( $scope ,$location, $log,ArticleService,$rootScope, $cookies,dataUser  ) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma',
            '$scope',
            '$location',
            '$log',
            'ArticleService',
            '$rootScope',
            '$cookies',
            'dataUser'
        ];
        
        $scope.listArticle=null;
        
        $log.debug("test logindata PANEL",$rootScope.userLoginData );
        $log.debug("test logindata PANEL",$rootScope.authenticated );

        $log.debug("test cookie PANEL",$cookies.getObject('globals') );
        $log.debug("test dataUser",dataUser);

        getArticlesUser();
        function getArticlesUser(){

            ArticleService.query({email:$rootScope.userLoginData.currentUser.emailuser},function(data){
                $log.debug("retour de l'article dans le controller JS: ", data.listArtSubscriber );
                $scope.listArticle=data.listArtSubscriber;

            },function(error){
                $log.debug("error get List Article",error);
            });
    
        };
        
        $scope.writeOpen = function(){
            $location.path('/article');
        };

    });