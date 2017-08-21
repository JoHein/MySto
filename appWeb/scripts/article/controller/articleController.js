angular.module('myStoriesApp')
    .controller('ArticleCtrl', function ($scope,$location, $log,ArticleService,$window, $mdDialog, GetArticleDetail, $rootScope ) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma',
            '$scope',
            '$location',
            '$log',            
            'ArticleService',
            '$window',            
            '$mdDialog',
            'GetArticleDetail',
            '$rootScope'
        ];
        
        var articleToModerate = GetArticleDetail.getProperty();
        //si _id different de null
        // update
        // set modification to false
        $log.debug("articleToModerate", articleToModerate);
        if(articleToModerate!==null){
            $scope.article = {
                _id:articleToModerate._id,
                category: articleToModerate.category,
                title: articleToModerate.title,
                content: articleToModerate.content,
                source:articleToModerate.source,
                username:articleToModerate.postedBy.username
            }; 
        };
        
             
        $scope.setIsPublished=function(){
            
               var publishArt = $mdDialog.confirm()
               .title('Validation')
               .textContent('Valider cet article : '+ articleToModerate.title +' ' +articleToModerate.postedBy.username + '? \n')
               .ariaLabel('Validation article')
               .cancel('Annuler')
               .ok('Confirmer');
            
            $mdDialog.show(publishArt).then(function() {
                $log.debug("PUBLISHED confirm OK", articleToModerate._id);
                
                ArticleService.setPublished({articleId:articleToModerate._id,email:$rootScope.userLoginData.currentUser.emailuser},function(data){
                    $log.debug('Published answer :', data);
                        history.back();
                        
//                    var index = $scope.listArticle.indexOf(article);
//                    $scope.listArticle.splice(index, 1);
                },function(err){
                    $log.debug("Erreur publication",err);
                });
                       
            }, function() {
                $log.debug("published Article confirm CANCEL");
            });
            
        };


        $scope.goBack=function(){
//          $location.path('/panelUser');  
          history.back();
        };

});


