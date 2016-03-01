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
            console.log(user._id)
            $http.get('/api/user/' + user._id )
                .success(function(data){
                    $scope.user = data;
                    console.log(data)
                }).error(function(err){
                console.log(err);
            });
        };
        $scope.sendUser = function(){
            if($scope.user = {}){
                $http.post('/api/user/',$scope.user)
                    .success(function(data){

                    }).error(function(err){
                    console.log(err);
                })
            }else{
                $http.post('/api/user/:' + $scope.user.local.id,$scope.user)
                    .success(function(data){

                    }).error(function(err){
                    console.log(err);
                })
            }
        }

    });
