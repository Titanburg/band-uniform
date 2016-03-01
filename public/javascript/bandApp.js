
// bandApp angular module creation
angular.module('bandApp',['ngRoute'])
    .config(function($routeProvider,$locationProvider){
        $routeProvider
            .when('/users',{
                templateUrl: 'partials/users.jade',
                controller: 'usersController'
            });
        $locationProvider.html5Mode(true);
    });