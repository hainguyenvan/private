var app = angular.module('myAppLogin', []);
app.controller('myCtrlLogin', function ($scope) {

    $scope.firstName = "John";
    $scope.lastName = "Doe";

    $scope.onRegister = function () {
        console.log('username: ', $scope.username);
        $scope.username = '';
    }
});