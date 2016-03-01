/**
 * Created by Kyle Walter on 2/29/2016.
 */
angular.module('bandApp')
    .controller('usersController',function($scope,$http){
        $scope.title = "This is the users page.";
        $scope.users = [];
        $scope.getUsers = function(){
          $http.get('/api/user')
            .success(function(data){
              $scope.users = data;
            }).error(function(err){
              console.log(err);
            });
        };
    });
