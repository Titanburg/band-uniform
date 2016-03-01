
// bandApp angular module creation
angular.module('bandApp',['ngRoute'])
    .config(function($routeProvider){
        $routeProvider
            .when('/users',{
                templateUrl: 'partials/users.jade',
                controller: 'usersController'
            });
    });