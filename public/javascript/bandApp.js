
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
            })
            .when('/uniform',{
                templateUrl: 'partial/uniform.jade',
                controller: 'uniformController'
            })
            .when('/logout',{
                templateUrl: 'partial/logout.jade',
                controller: 'logout'
            })
        $locationProvider.html5Mode(true);
    }).controller('logout',function($scope,$window){
        $window.location.href = '/auth/logout';
    });
