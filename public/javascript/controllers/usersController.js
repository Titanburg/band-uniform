/**
 * Created by Kyle Walter on 2/29/2016.
 */
angular.module('bandApp')
    .controller('usersController',function($scope,$http){
        $scope.title = "Users";

        // Users information
        $scope.user = {}; // Used for selected user
        $scope.users = []; // Used for all users

        $scope.newPass = '';
        $scope.simpleView = true;

        // Userd to detect if a new user is being created
        $scope.creating = false;

        // Ordering
        $scope.order = 'local.firstName';

        // Filtering
        $scope.selection = 1;
        $scope.filter = '';

        $scope.instruments = [
          {name:'Woodwinds'},
          {name:'Sousas'},
          {name:'Percussion'},
          {name:'Drum Majors'}
        ];

        // Helper Functions
        $scope.setOrder = function(order){
          $scope.order= 'local.' + order;
        };
        $scope.setFilter = function(filter){
          $scope.filter = filter ;
        };
        $scope.toggleMode = function(){
          $scope.simpleView = !$scope.simpleView;
        };
        $scope.simpleOff = function(){
          $scope.simpleView = true;
        };
        $scope.editSelection = function(index){
          $scope.selection = index;
          $scope.newPass = '';
          $scope.user.local.password = '';
          $scope.user.sizes.sex='Male';
        };
        $scope.isSelected = function(index){
          return $scope.selection == index;
        };
        $scope.invalidPassword = function(){
          if($scope.user.local){
            if($scope.creating)
              return $scope.user.local.password === '';
            return false;
          }
          return true;
        };
        $scope.diffPassword = function(){
          if($scope.user.local)
            return $scope.user.local.password !== $scope.newPass;
          return true;
        };

        // Crud Functions
        $scope.createUser = function(){
            $scope.creating = true;
            $scope.user = {local:{admin:false},sizes:{sex:false}};
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
        $scope.sendUser = function(isValid){
          if(isValid){
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
            //Clear newPass variable for security
            $scope.newPass = '';

            $('#editUser').modal('hide');

          }else{

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

    });
