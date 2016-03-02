angular.module('bandApp')
    .controller('maintenanceController',function($scope,$http){
        $scope.title = "This is the maintenance page.";
        $scope.requests = [];
        $scope.getRequests = function(){
          $http.get('/api/maintenance_request')
            .success(function(data){
              $scope.requests = data;
            }).error(function(err){
              console.log(err);
            });
        };
    });
