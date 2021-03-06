
// bandApp angular module creation
angular.module('bandApp',['ngRoute'])
    .config(function($routeProvider,$locationProvider){
        $routeProvider
            .when('/users',{
              templateUrl: 'partial/users',
              controller: 'usersController'
            })
            .when('/account',{
              templateUrl: 'partial/account',
              controller: 'usersController'
            })
            .when('/maintenance_request',{
              templateUrl: 'partial/maintenance_request',
              controller: 'maintenanceController'
            })
            .when('/uniform',{
                templateUrl: 'partial/uniform',
                controller: 'uniformController'
            })
            .when('/instruments',{
                templateUrl: 'partial/instruments',
                controller: 'instrumentsController'
            })
            .when('/logout',{
              templateUrl: 'partial/logout',
              controller: 'logout'
            })
            .otherwise({
                templateUrl: 'partial/oops'
            });
        $locationProvider.html5Mode(true);
    }).controller('logout',function($scope,$window){
        $window.location.href = '/auth/logout';
    }).factory('share',function(){
      var requests = 0;
      return {
        setRequest: function(value){
          console.log('set ',value);
          requests = value;
        },
        getRequests: function(){
          return requests;
        }
      };
    });
