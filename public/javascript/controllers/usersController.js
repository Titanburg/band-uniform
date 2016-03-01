/**
 * Created by Kyle Walter on 2/29/2016.
 */
angular.module('bandApp')
    .controller('usersController',function($scope){
        $scope.title = "This is the users page."
        $scope.users = [
            {
                firstName:'Kyle',
                lastName:'Walter',
                email:'walter.kl26@gmail.com'
            },
            {
                firstName:'Kirk',
                lastName:'Powell',
                email:'kirk@thegamestoreapp.com'
            },
            {
                firstName:'Andrew',
                lastName:'Korous',
                email:'AJkorous@gmail.com'
            },
            {
                firstName:'Kaitlyn',
                lastName:'Jarrett',
                email:'kjarrett316@gmail.com'
            }
        ];
    });