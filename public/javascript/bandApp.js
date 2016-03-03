
// bandApp angular module creation
angular.module('bandApp',['ngRoute'])
    .config(function($routeProvider,$locationProvider){
        $routeProvider
            .when('/users',{
                templateUrl: 'partial/users.jade',
                controller: 'usersController'
            })
            .when('/maintenance_request',{
                templateUrl: 'partial/maintenance_request.jade',
                controller: 'maintenanceController'
            });
        $locationProvider.html5Mode(true);
    });
