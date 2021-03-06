angular.module('myStoriesApp')
    .controller('WriteArticleCtrl', function ($scope,$location, $log,dataUser,ArticleService,$window,dataUser, $mdDialog, GetArticleDetail ) {
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
            '$mdDialog',
            'GetArticleDetail'
        ];
        
        var articleToModify = GetArticleDetail.getProperty();
        //si _id different de null
        // update
        // set modification to false
        $log.debug("articleToModify", articleToModify);
        if(articleToModify!==null){
            $scope.article = {
                _id:articleToModify._id,
                category: articleToModify.category,
                title: articleToModify.title,
                content: articleToModify.content,
                source:articleToModify.source
            }; 
        };

        
        $scope.soumettre=function(article){
            
            article.emailuser=dataUser.userLoginData.currentUser.emailuser;
            if(articleToModify!==null){
                
                $log.debug("UPDATE ARTICLE");

                ArticleService.put(article,function(data){
                    $mdDialog.show(
                        $mdDialog.alert({
                            title: 'Info',
                            textContent: data.reponseSauvegarde,
                            ok: 'Ok'
                        })
                    );
                });
                
            }else{
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
            }
 
        };

        $scope.goBack=function(){
          $location.path('/panelUser');  
        };

});


