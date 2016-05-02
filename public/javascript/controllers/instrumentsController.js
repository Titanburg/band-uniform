angular.module('bandApp')
    .controller('instrumentsController',function($scope,$http){
        $scope.title = "Instruments";
        $scope.creating = false;
        $scope.instrument = {};
        $scope.instruments = [];
        $scope.order = 'group';
        $scope.filter = '';

        // Helper Functions
        $scope.setOrder = function(order){
          $scope.order = order;
        };
        $scope.setFilter = function(filter){
          $scope.filter = filter ;
        };

        // Crud Functions
        $scope.createInstrument = function(){
            $scope.creating = true;
            $scope.instrument = {};
        };
        $scope.getInstruments = function(){
          $http.get('/api/instruments')
            .success(function(data){
              console.log(data);
              $scope.instruments = data;
            }).error(function(err){
              console.log(err);
            });
        };
        $scope.getInstrument = function(instrument){
            $http.get('/api/instruments/' + instrument._id )
                .success(function(data){
                    $scope.instrument = data;
                }).error(function(err){
                console.log(err);
            });
        };
        $scope.sendInstrument = function(instrument){
            console.log(instrument);
            // If creating is true send new instrument
            if($scope.creating === true){
               $http.post('/api/instruments',$scope.instrument)
                   .success(function(data){
                     $scope.instruments = data;
                   }).error(function(err){
                   console.log(err);
               });
            }
            // If creating is false edit existing instrument
            else{
              $http.post('/api/instruments/' + $scope.instrument._id,$scope.instrument)
                  .success(function(data){
                    $scope.instruments = data;
                  }).error(function(err){
                  console.log(err);
              });
            }
            //Disable creating variable to allow
            $scope.creating = false;
            //Clear all data in instrument variable. This is for security.
            $scope.instrument = {};
            //Hide input modal
            $('#editInstrument').modal.hide;
        };
        $scope.deleteInstrument = function(instrument){
          $http.get('/api/instruments/delete/' + instrument._id )
              .success(function(data){
                $scope.instruments = data;
              }).error(function(err){
              console.log(err);
          });
        };
        $scope.editInstrument = function(instrument){
          console.log("Attempt to Edit!");
        };

    });
