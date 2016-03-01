
// bandApp angular module creation
angular.module('bandApp',[])
    .config(function($routeProvider){
        $routeProvider
            .when('/users',{
                templateUrl: 'partials/users.jade',
                controller: 'usersController'
            });
    });