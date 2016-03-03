
// bandApp angular module creation
angular.module('bandApp',['ngRoute'])
    .config(function($routeProvider,$locationProvider){
        $routeProvider
            .when('/users',{
                templateUrl: 'partial/users.jade',
                controller: 'usersController'
            })
            .when('/logout',{
                templateUrl: 'partial/logout.jade',
                controller: 'logout'
            });
        $locationProvider.html5Mode(true);
    }).controller('logout',function($scope,$window){
        
            $window.location.href = '/auth/logout';
        
    })
