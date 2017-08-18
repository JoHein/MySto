angular.module('myStoriesApp')
    .controller('PanelUserCtrl', function ( $scope ,$location, $log, ArticleService,$rootScope, $cookies, $mdDialog, GetArticleDetail  ) {
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
            '$mdDialog',
            'GetArticleDetail'
        ];
        
        $scope.listArticle=null;
        
//        $log.debug("test logindata PANEL",$rootScope.userLoginData );
//        $log.debug("test logindata PANEL",$rootScope.authenticated );
//
//        $log.debug("test cookie PANEL",$cookies.getObject('globals') );
//        $log.debug("test dataUser",dataUser);

        getArticlesUser();
        function getArticlesUser(){

            ArticleService.query({email:$rootScope.userLoginData.currentUser.emailuser},function(data){
                $log.debug("retour de l'article dans le controller JS: ", data.listArtSubscriber );
                
                angular.forEach(data.listArtSubscriber, function(value,key){
                    var date = new Date(value.created);
                    
                    if(date.getDate()<9){
                        var day="0"+date.getDate();
                    }else{
                       var day=date.getDate();
                    }
                    if(date.getMonth()<9){
                        var month="0"+(date.getMonth()+1);
                    }else{
                      var month=(date.getMonth()+1);
                    }
                    
                    value.created= day+" - "+month+" - "+date.getFullYear();
                });
                
                $scope.listArticle=data.listArtSubscriber;
                  
                $scope.propertyName = 'title';
                $scope.reverse = false;
                
            },function(error){
                $log.debug("error get List Article",error);
            });
    
        };
        
        $scope.discUser = function(){
            $cookies.remove('globals');
            $rootScope.authenticated=false;
            $rootScope.userLoginData="";
            $location.path('/');
        };
        
        $scope.writeOpen = function(article){
            
            GetArticleDetail.setProperty(article);
            $location.path('/article');
            
        };
        
        $scope.sortBy = function (propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };
        
        
      

    });