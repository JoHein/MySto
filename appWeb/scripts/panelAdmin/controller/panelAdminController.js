angular.module('myStoriesApp')
    .controller('PanelAdminCtrl', function ( $scope ,$location, $log,ArticleService,$rootScope, $cookies, dataUser, $mdDialog ) {
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
            'dataUser',
            '$mdDialog'
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
                $log.debug("retour de l'article dans le controller JS: ", data );
                
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
        
        $scope.writeOpen = function(){
            $location.path('/article');
        };
        
        $scope.sortBy = function (propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };
        
        $scope.setIsPublished=function(article){
            
               var publishArt = $mdDialog.confirm()
               .title('Validation')
               .textContent('Valider cet article : '+ article.title +' ' +article.postedBy.username + '? \n')
               .ariaLabel('Validation article')
               .cancel('Annuler')
               .ok('Confirmer');
            
            $mdDialog.show(publishArt).then(function() {
                $log.debug("PUBLISHED confirm OK", article._id);
                
                ArticleService.setPublished({articleId:article._id,email:$rootScope.userLoginData.currentUser.emailuser},function(data){
                    $log.debug('Published answer :', data);
                   
                    article.moderation=true;
//                    var index = $scope.listArticle.indexOf(article);
//                    $scope.listArticle.splice(index, 1);
                },function(err){
                    $log.debug("Erreur publication",err);
                });
                       
            }, function() {
                $log.debug("published Article confirm CANCEL");
            });
            
        };
        
          
        $scope.deleteArticle=function(article){
            
              var deleteArticle = $mdDialog.confirm()
               .title('Attention')
               .textContent('Voulez-vous supprimer cet article : '+ article.title +'? \n')
               .ariaLabel('Suppression article')
               .cancel('Annuler')
               .ok('Confirmer');
            

            $mdDialog.show(deleteArticle).then(function() {
                $log.debug("delete Article confirm OK");

                ArticleService.remove(article,function(data){
                    $log.debug('Removed answer :' + data);
                    
                    var index = $scope.listArticle.indexOf(article);
                    $scope.listArticle.splice(index, 1);
                });
                       
            }, function() {
                $log.debug("delete Article confirm CANCEL");
            });

        };

    });