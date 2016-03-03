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
        $scope.confirmPass = '';
        $scope.simpleView = true;
        

        // Helper Functions
        $scope.setOrder = function(order){
          $scope.order= 'local.' + order;
        };
        $scope.setFilter = function(filter){
          $scope.filter = filter ;
        };
        $scope.toggleMode = function(){
          $scope.simpleView = !$scope.simpleView;
        }

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
            // If creating is true send new user
            if($scope.creating === true){
               $http.post('/api/user',$scope.user)
                   .success(function(data){
                     $scope.users = data;
                   }).error(function(err){
                   console.log(err);
               });
            }
            // If creating is false edit existing user
            else{
              $http.post('/api/user/' + $scope.user._id,$scope.user)
                  .success(function(data){
                    $scope.users = data;
                  }).error(function(err){
                  console.log(err);
              });
            }
            
            //Disable creating variable to allow 
            $scope.creating = false;
            //Clear all data in user variable. This is for security.
            $scope.user = {};
            //Clear confirmPass variable for security
            $scope.confirmPass = '';

        };
        $scope.deleteUser = function(user){
          $http.get('/api/user/delete/' + user._id )
              .success(function(data){
                $scope.users = data;
              }).error(function(err){
              console.log(err);
          });
        };

    });
