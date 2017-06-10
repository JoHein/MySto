angular.module('myStoriesApp')
    .controller('PanelUserCtrl', function ( $scope ,$location, $log,ArticleService ) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma',
            '$scope',
            '$location',
            '$log',
            'ArticleService'
        ];
        
        $scope.listArticle=null;
        
        ArticleService.query({email:"mystoconfirm@gmail.com"},function(data){
            $log.debug("retour de l'article dans le controller JS: ", data.listArtSubscriber );
            $scope.listArticle=data.listArtSubscriber;
        });

    });