var API_USERS = 'http://localhost:9000/chatio/users';
var API_GET_USER_BY_ID = 'http://localhost:9000/chatio/users/getByID';

var API_ROOMS = 'http://localhost:9000/chatio/users';

var KEY_USER_ID = 'user_id';

// login
var app = angular.module('myAppLogin', []);
app.controller('myCtrlLogin', function ($scope, $http) {
    $scope.onRegister = function () {
        var body = {
            username: $scope.username
        };
        $scope.username = '';
        $http({
            url: API_USERS,
            method: "POST",
            data: body
        }).then(function (res) {
            // success
            var dataRes = res.data.data;
            localStorage.setItem(KEY_USER_ID, dataRes.id);
            window.location.href = "http://localhost:9000/chatio/rooms-list";
        }, function (err) {
            // failed
            console.log('error: ', err);
        });
    }
});


// room list
var app = angular.module('myAppRoomsList', []);
app.controller('myCtrlRoomsList', function ($scope, $http) {

    $scope.init = function () {
        let body = {
            userID: localStorage.getItem(KEY_USER_ID)
        }
        $http({
            url: API_GET_USER_BY_ID,
            method: "POST",
            data: body
        }).then(function (res) {
            // success
            $scope.user = res.data.data;
            console.log('user: ',$scope.user);
        }, function (err) {
            // failed
            console.log('error: ', err);
        });
    }
});