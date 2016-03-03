angular.module('bandApp')
    .controller('maintenanceController',function($scope,$http){
        $scope.title = "Maintenance Requests";
        $scope.creating = false;
        $scope.request = {};
        $scope.requests = [];


        $scope.getRequests = function(){
          $http.get('/api/maintenance_request')
            .success(function(data){
              $scope.requests = data;
            }).error(function(err){
              console.log(err);
            });
        };

        $scope.createRequest = function(){
            $scope.creating = true;
            $scope.request = {};
        };

        $scope.getRequests = function(){
          $http.get('/api/maintenance_request')
            .success(function(data){
              console.log(data);
              $scope.requests = data;
            }).error(function(err){
              console.log(err);
            });
        };

        $scope.getRequest = function(request){
            $http.get('/api/maintenance_request/' + request._id )
                .success(function(data){
                    $scope.request = data;
                }).error(function(err){
                console.log(err);
            });
        };

        $scope.sendRequest = function(){
            // If creating is true send new user
            if($scope.creating === true){
               $http.post('/api/maintenance_request',$scope.request)
                   .success(function(data){
                     $scope.requests = data;
                   }).error(function(err){
                   console.log(err);
               });
            }
            // If creating is false edit existing user
            else{
              $http.post('/api/maintenance_request/' + $scope.request._id,$scope.request)
                  .success(function(data){
                    $scope.requests = data;
                  }).error(function(err){
                  console.log(err);
              });
            }

            //Disable creating variable to allow
            $scope.creating = false;
            //Clear all data in user variable. This is for security.
            $scope.request = {};
        };

        $scope.deleteRequest = function(request){
            $http.get('/api/request/delete/' + request._id )
            .success(function(data){
              $scope.requests = data;
            }).error(function(err){
            console.log(err);
          });
        };
    });
