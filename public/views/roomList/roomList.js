'use strict';

angular.module('pro5_hzv.roomList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/roomList', {
    templateUrl: 'views/roomList/roomList.html',
    controller: 'roomListCtrl'
  });
}])

.controller('roomListCtrl', ['$scope', '$moment', 'roomProvider', 'bookingProvider',function($scope, $moment, roomProvider, bookingProvider) {
        $scope.startday = $moment();
        $scope.startday.millisecond(0);
        $scope.startday.second(0);
        $scope.startday.minute(0);
        $scope.startday.utc().hours(12);

        roomProvider.query(function(data){
             $scope.rooms = data;
        });

        var refreshRoomList = function() {
            bookingProvider.roomList({"start": $scope.startday.toDate()}, function (data) {
                $scope.bookings = data;
            });
        };

        $scope.$watch("startday", function(n,o){
            if(typeof n != 'undefined') {
                refreshRoomList();
            }
        },true);

        $scope.filteredRooms = ["547c24dbf8b19f2c19578496","547c24dbf8b19f2c19578495"];
        $scope.selectedRooms = [];
        $scope.$watch("selectedRooms",function(n,o){
           console.log(n);
            console.log("controller");
        },true);
        //$scope.selectedRooms = [];




        $scope.increaseDate = function(){
            $scope.startday.add(7, "days");
            //console.log("increaseDate" + $scope.startday.toDate());
        };
        $scope.decreaseDate = function(){
            $scope.startday.add(-7, "days");
            //console.log("decreaseDate" + $scope.startday.toDate());
        };
}]);