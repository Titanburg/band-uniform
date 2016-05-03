/**
 * Created by Kyle Walter on 2/29/2016.
 */
angular.module('bandApp')
    .controller('usersController',function($scope,$http,share){
        $scope.title = "Users";

        // Users information
        $scope.user = {}; // Used for selected user
        $scope.users = []; // Used for all users

        $scope.urequest = {};
        $scope.urequests = [];

        $scope.newPass = '';
        $scope.simpleView = true;

        // Userd to detect if a new user is being created
        $scope.creating = false;

        // Ordering
        $scope.order = 'local.state';

        // Filtering
        $scope.selection = 1;
        $scope.filter = {local:{state:1}};

        $scope.instruments = [
          {name:'Winds'},
          {name:'Sousas'},
          {name:'Percussion'},
          {name:'Drum Majors'}
        ];

        $scope.filters = [
            {
              id:1,
              name:'Active',
              filter:{
                local:{
                  state:1,
                }
              }
            },
            {
              id:2,
              name:'Pending',
              filter:{
                local:{
                  state:0,
                }
              }
            },
            {
              id:3,
              name:'Admin',
              filter:{
                local:{
                  admin:true
                }
              }

            },
            {
              id:4,
              name:'Woodwinds',
              filter:{
                other:{
                  instrument:'Woodwinds'
                }
              }
            },
            {
              id:5,
              name:'Sousas',
              filter:{
                other:{
                  instrument:'Sousas'
                }
              }
            },
            {
              id:6,
              name:'Percussion',
              filter:{
                other:{
                  instrument:'Percussion'
                }
              }
            },
            {
              id:6,
              name:'Drum Majors',
              filter:{
                other:{
                  instrument:'Drum Majors'
                }
              }
            },
            {
              id:8,
              name:'All',
              filter:{}
            }
          ];

        // Helper Functions
        $scope.setOrder = function(order){
          $scope.order= 'local.' + order;
        };
        $scope.setFilter = function(filter){
          $scope.filter = filter;
        };
        $scope.toggleMode = function(){
          $scope.simpleView = !$scope.simpleView;
        };
        $scope.simpleOff = function(){
          $scope.simpleView = true;
        };
        $scope.editSelection = function(index){
          $scope.selection = index;
          // $scope.newPass = '';
          // $scope.user.local.password = '';
          // $scope.user.sizes.sex='Male';
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

        $scope.activateUser = function(user,state){
            $scope.getUser(user,function(){
                $scope.user.local.state = state;
                $scope.sendUser(true, user);
                  // ,function(){
                  // console.log('her saved');
                // });
                // console.log("plssss pls1");
            });
            // console.log("plssss pls");
            // $scope.sendEmailConfirmation(user);
        };

        // $scope.sendEmailConfirmation = function(user) {
        //   console.log(user);
        //   $http({
        //     method: 'POST',
        //     url: '/api/user/sendConfirmation',
        //     data: user,
        //     headers: {'Content-Type': 'application/json'}
        //   }).success(function(data){
        //       console.log("I think email sent? ...maybe??");
        //     }).error(function(error){
        //       console.log(error);
        //     });
        // };

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
              var count = 0;
              data.forEach(function(user){
                if(!user.local.active) count++;
              });
              share.setRequest(count);
            }).error(function(err){
              console.log(err);
            });
        };
        $scope.getUser = function(user,callback){
            $http.get('/api/user/' + user._id )
                .success(function(data){
                    $scope.user = data;
                    if($scope.user.local && $scope.user.local.state) $scope.user.local.state = $scope.user.local.state.toString();
                    callback();
                }).error(function(err){
                callback(err);
            });
        };
        $scope.sendUser = function(isValid, user,callback){
          if(isValid){
            // If creating is true send new user
            if($scope.creating === true){
               $http.post('/api/user',$scope.user)
                   .success(function(data){
                     $scope.users = data;
                    //  callback();
                   }).error(function(err){
                   console.log(err);
                   callback(err);
               });
            }
            // If creating is false edit existing user
            else{
              $http.post('/api/user/' + $scope.user._id,$scope.user)
                  .success(function(data){
                    $scope.users = data;
                    // callback();
                  }).error(function(err){
                  console.log(err);
                  callback(err);
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

        $scope.bestMatch = function(id){
            $http.post('/api/uniform_request/'+ id)
                .success(function(data){
                    $scope.urequest = data;
                }).error(function(err){
                console.log(err);
            });
        };

        $scope.sendUrequest = function(){
          $scope.urequest={
            userNumber        : $scope.user._id,
            jacketNumber      : '1',
            jumpsuitNumber    : '1',
            chest             : $scope.user.sizes.chest,
            armlength         : $scope.user.sizes.armlength,
            waist             : $scope.user.sizes.waist,
            seat              : $scope.user.sizes.seat,
            outseam           : $scope.user.sizes.outseam,
            complete          : false
          };
          $http.post('/api/uniform_request',$scope.urequest)
              .success(function(data){
                console.log($scope.urequest);
              }).error(function(err){
              console.log(err);
          });
        };

    });
