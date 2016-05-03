var app = angular.module('bandApp')
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
                    $('#createInstrument').modal('hide');
                  }).error(function(err){
                  console.log(err);
               });
            }
            // If creating is false edit existing instrument
            else{
              $http.post('/api/instruments/' + $scope.instrument._id,$scope.instrument)
                  .success(function(data){
                    $scope.instruments = data;
                    $('#editInstrument').modal('hide');
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

app.directive('nameValidate', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

                scope.nameValidLength = (viewValue && viewValue.length >= 4 ? 'valid' : undefined);
                scope.nameHasChar = (viewValue && /[A-z0-9]/.test(viewValue)) ? 'valid' : undefined;
                // scope.nameHasNumber = (viewValue && /\d/.test(viewValue)) ? 'valid' : undefined;

                if(scope.nameValidLength && scope.nameHasChar) {
                    ctrl.$setValidity('name', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('name', false);                    
                    return undefined;
                }

            });
        }
    };
});

app.directive('groupValidate', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

                scope.nameValidLength = (viewValue && viewValue.length >= 1 ? 'valid' : undefined);
                // scope.nameHasLetter = (viewValue && /[A-z]/.test(viewValue)) ? 'valid' : undefined;
                // scope.nameHasNumber = (viewValue && /\d/.test(viewValue)) ? 'valid' : undefined;

                if(scope.nameValidLength) {
                    ctrl.$setValidity('group', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('group', false);                    
                    return undefined;
                }

            });
        }
    };
});