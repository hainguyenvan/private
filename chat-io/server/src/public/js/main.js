var API_INSERT_ACCOUNT = 'http://localhost:9000/chatio/account/insert';
var API_GET_ACCOUNT_BY_PK = 'http://localhost:9000/chatio/account/getByPK';

var API_GET_ALL_ROOMS = 'http://localhost:9000/chatio/rooms/getAll';
var API_INSERT_ROOMS = 'http://localhost:9000/chatio/rooms/insert';
var API_GET_ROOMS_BY_PK = 'http://localhost:9000/chatio/rooms/getByPK';

var KEY_USER_PK = 'user_pk';
var KEY_ROOM_PK = 'room_pk';

// login
var app = angular.module('myAppLogin', []);
app.controller('myCtrlLogin', function ($scope, $http) {
    $scope.onRegister = function () {
        var body = {
            username: $scope.username
        };
        $scope.username = '';
        $http({
            url: API_INSERT_ACCOUNT,
            method: "POST",
            data: body
        }).then(function (res) {
            // success
            var dataRes = res.data.data;
            localStorage.setItem(KEY_USER_PK, dataRes.pk);
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
        // get account info
        let body = {
            pk: localStorage.getItem(KEY_USER_PK)
        }
        $http({
            url: API_GET_ACCOUNT_BY_PK,
            method: "POST",
            data: body
        }).then(function (res) {
            // success
            $scope.user = res.data.data;
            console.log('user: ', $scope.user);
        }, function (err) {
            // failed
            console.log('error: ', err);
        });

        // get all rooms
        $scope.getAllRoom();
    }

    $scope.getAllRoom = function () {
        // get all rooms
        $http({
            url: API_GET_ALL_ROOMS,
            method: "POST",
        }).then(function (res) {
            // success
            $scope.roomsList = res.data.data;
            console.log('rooms list: ', $scope.roomsList);
        }, function (err) {
            // failed
            console.log('error: ', err);
        });
    }

    $scope.onCreateRoom = function () {
        console.log('room name: ', $scope.roomName);
        let body = {
            name: $scope.roomName,
            members: [
                { userPK: $scope.user.pk }
            ]
        }
        $http({
            url: API_INSERT_ROOMS,
            method: "POST",
            data: body
        }).then(function (res) {
            // success
            console.log('create room: ', body);
            $scope.getAllRoom();
        }, function (err) {
            // failed
            console.log('error: ', err);
        });
    }

    $scope.onClickChatRoom = function (roomPK) {
        localStorage.setItem(KEY_ROOM_PK, roomPK);
        window.location.href = "http://localhost:9000/chatio/chatroom";
    }
});


// chatroom
var app = angular.module('myAppChatroom', []);
app.controller('myCtrlChatroom', function ($scope, $http) {

    $scope.init = function () {
        $scope.getUserByPK();
        $scope.getRoomsByPK();
    }

    $scope.getUserByPK = function () {
        let body = {
            pk: localStorage.getItem(KEY_USER_PK)
        }
        $http({
            url: API_GET_ACCOUNT_BY_PK,
            method: "POST",
            data: body
        }).then(function (res) {
            // success
            $scope.user = res.data.data;
            console.log('user: ', $scope.user);
        }, function (err) {
            // failed
            console.log('error: ', err);
        });
    }

    $scope.getRoomsByPK = function () {
        var body = {
            pk: localStorage.getItem(KEY_ROOM_PK)
        };
        $http({
            url: API_GET_ROOMS_BY_PK,
            method: "POST",
            data: body
        }).then(function (res) {
            // success
            var dataRes = res.data.data;
            $scope.room = dataRes;
            console.log('data: ', dataRes);
        }, function (err) {
            // failed
            console.log('error: ', err);
        });
    }
});