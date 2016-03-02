/**
 * Created by Kyle Walter on 2/29/2016.
 */
angular.module('bandApp')
    .controller('usersController',function($scope,$http){
        $scope.title = "Users";
        $scope.creating = false;
        $scope.user = {};
        $scope.users = [];
        $scope.order = 'local.firstName';
        $scope.filter = '';

        // Helper Functions
        $scope.setOrder = function(order){
          $scope.order= 'local.' + order;
        };
        $scope.setFilter = function(filter,value){
          // $scope.filter = filter + ':' + value ;
          // console.log($scope.filter);
        };

        // Crud Functions
        $scope.createUser = function(){
            $scope.creating = true;
            $scope.user = {};
        };
        
        $scope.getUsers = function(){
          $http.get('/api/user')
            .success(function(data){
              console.log(data);
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
            if($scope.creating === true){
               $http.post('/api/user',$scope.user)
                   .success(function(data){
                     $scope.users = data;
                   }).error(function(err){
                   console.log(err);
               });
               $scope.creating = false;
            }else{
              $http.post('/api/user/' + $scope.user._id,$scope.user)
                  .success(function(data){
                    $scope.users = data;
                  }).error(function(err){
                  console.log(err);
              });
            }
            

        };
        
        $scope.deleteUser = function(user){
          $http.get('/api/user/delete/' + user._id )
              .success(function(data){
                $scope.users = data;
              }).error(function(err){
              console.log(err);
          });
        };
        $scope.getUsers();

    });
