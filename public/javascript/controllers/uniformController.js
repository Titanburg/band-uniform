angular.module('bandApp')
    .controller('uniformController',function($scope,$http){
      $scope.title = "Jacket";
      $scope.creating = false;
      $scope.jacket = {};
      $scope.jackets = [];
      $scope.jumpsuit = {};
      $scope.jumpsuits = [];
      $scope.requestSelect = true;
      $scope.jacketSelect = false;
      $scope.jumpsuitSelect = false;

      $scope.selectType = function(type){
        if("requests"===type){
          $scope.requestSelect = true;
          $scope.jacketSelect = false;
          $scope.jumpsuitSelect = false;
        }else if ("jackets"===type) {
          $scope.requestSelect = false;
          $scope.jacketSelect = true;
          $scope.jumpsuitSelect = false;
        }else {
          $scope.requestSelect = false;
          $scope.jacketSelect = false;
          $scope.jumpsuitSelect = true;
        }
      };


      $scope.getJumpsuits = function(){
        $http.get('/api/jumpsuit')
          .success(function(data){
            $scope.jumpsuits = data;
          }).error(function(err){
            console.log(err);
          });
      };

      $scope.createJumpsuit = function(){
          $scope.creating = true;
          $scope.jumpsuit = {};
      };

      $scope.getJumpsuits = function(){
        $http.get('/api/jumpsuit')
          .success(function(data){
            console.log(data);
            $scope.jumpsuits = data;
          }).error(function(err){
            console.log(err);
          });
      };

      $scope.getJumpsuit = function(jumpsuit){
          $http.get('/api/jumpsuit/' + jumpsuit._id )
              .success(function(data){
                  $scope.jumpsuit = data;
              }).error(function(err){
              console.log(err);
          });
      };

      $scope.sendJumpsuit = function(){
          // If creating is true send new user
          if($scope.creating === true){
             $http.post('/api/jumpsuit',$scope.jumpsuit)
                 .success(function(data){
                   $scope.jumpsuits = data;
                 }).error(function(err){
                 console.log(err);
             });
          }
          // If creating is false edit existing user
          else{
            $http.post('/api/jumpsuit/' + $scope.jumpsuit._id,$scope.jumpsuit)
                .success(function(data){
                  $scope.jumpsuits = data;
                }).error(function(err){
                console.log(err);
            });
          }

          //Disable creating variable to allow
          $scope.creating = false;
          //Clear all data in user variable. This is for security.
          $scope.jumpsuit = {};
      };

      $scope.deleteJumpsuit = function(jumpsuit){
          $http.get('/api/jumpsuit/delete/' + jumpsuit._id )
          .success(function(data){
            $scope.jumpsuits = data;
          }).error(function(err){
          console.log(err);
        });
      };


      $scope.getJackets = function(){
        $http.get('/api/jacket')
          .success(function(data){
            $scope.jackets = data;
          }).error(function(err){
            console.log(err);
          });
      };

      $scope.createJacket = function(){
          $scope.creating = true;
          $scope.jacket = {};
      };

      $scope.getJackets = function(){
        $http.get('/api/jacket')
          .success(function(data){
            console.log(data);
            $scope.jackets = data;
          }).error(function(err){
            console.log(err);
          });
      };

      $scope.getJacket = function(jacket){
          $http.get('/api/jacket/' + jacket._id )
              .success(function(data){
                  $scope.jacket = data;
              }).error(function(err){
              console.log(err);
          });
      };

      $scope.sendJacket = function(){
          // If creating is true send new user
          if($scope.creating === true){
             $http.post('/api/jacket',$scope.jacket)
                 .success(function(data){
                   $scope.jackets = data;
                 }).error(function(err){
                 console.log(err);
             });
          }
          // If creating is false edit existing user
          else{
            $http.post('/api/jacket/' + $scope.jacket._id,$scope.jacket)
                .success(function(data){
                  $scope.jackets = data;
                }).error(function(err){
                console.log(err);
            });
          }

          //Disable creating variable to allow
          $scope.creating = false;
          //Clear all data in user variable. This is for security.
          $scope.jacket = {};
      };

      $scope.deleteJacket = function(jacket){
          $http.get('/api/jacket/delete/' + jacket._id )
          .success(function(data){
            $scope.jackets = data;
          }).error(function(err){
          console.log(err);
        });
      };

  });
