/**
 * Created by Kyle Walter on 2/29/2016.
 */
angular.module('bandApp')
    .controller('usersController',function($scope,$http){
        $scope.title = "This is the users page.";
        $scope.creating = false;
        $scope.user = {};
        $scope.users = [];
        $scope.createUser = function(){
            $scope.creating = false;
            $scope.user = {};
        };
        $scope.getUsers = function(){
          $http.get('/api/user')
            .success(function(data){
              $scope.users = data;
            }).error(function(err){
              console.log(err);
            });
        };
        $scope.getUser = function(user){
            $http.get('/api/user/' + user._id )
                .success(function(data){
                    $scope.user = data;
                }).error(function(err){
                console.log(err);
            });
        };
        $scope.sendUser = function(){
            //if($scope.user = {}){
            //    $http.post('/api/user/',$scope.user)
            //        .success(function(data){
            //
            //        }).error(function(err){
            //        console.log(err);
            //    })
            //}else{
                console.log('sendpost')
                $http.post('/api/user/' + $scope.user._id,$scope.user)
                    .success(function(data){

                    }).error(function(err){
                    console.log(err);
                });
            //}
        }

    });
