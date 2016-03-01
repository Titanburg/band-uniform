
// bandApp angular module creation
angular.module('bandApp')
    .config(function($routeProvider,$locationProvider){
        $routeProvider
            .when('/users',{
                templateUrl: 'partial/users.jade',
                controller: 'usersController'
            });
        $locationProvider.html5Mode(true);
    });