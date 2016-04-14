angular.module('bandApp')
    .controller('navbarController',function($scope,$http,share){
      $scope.requests = share.requests;
      $scope.updateAll = function(){
        // Update users
        $http.get('/api/user')
          .success(function(data){
            var count = 0;
            data.forEach(function(user){
              if(!user.local.active) count++;
            });
            console.log(count);
            share.setRequest(count);
          }).error(function(err){
            console.log(err);
          });
      };
    });
