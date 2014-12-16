'use strict';

angular.module('pro5_hzv.roomList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/roomList', {
    templateUrl: 'views/roomList/roomList.html',
    controller: 'roomListCtrl'
  });
}])

.controller('roomListCtrl', ['$scope', '$moment', 'roomProvider', 'bookingProvider', 'guestProvider',function($scope, $moment, roomProvider, bookingProvider, guestProvider) {

        $scope.currentBooking = {};
        $scope.guests = guestProvider.query();

        $scope.startday = $moment();
        $scope.startday.millisecond(0);
        $scope.startday.second(0);
        $scope.startday.minute(0);
        $scope.startday.utc().hours(12);

        $scope.saveBooking = function(){
            console.log($scope.currentBooking);
            bookingProvider.save($scope.currentBooking, function(data){
                console.log("gespeichert");
                console.log(data);
            });

        };

        $scope.handleForm = function(form){
            console.log(form);
            $scope.currentBooking = form;
            $scope.currentBooking.room_id = $scope.selectedRooms;
            console.log("save");
        };


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

        //$scope.filteredRooms = ["5478bae704eb543e7598ed8a","5478bae704eb543e7598ed8b"];
        $scope.filteredRooms = [];
        $scope.selectedRooms = [];
        $scope.$watch("selectedRooms",function(n,o){
            $scope.currentBooking.room_id = n;
        },true);




        $scope.increaseDate = function(){
            $scope.startday.add(7, "days");
            //console.log("increaseDate" + $scope.startday.toDate());
        };
        $scope.decreaseDate = function(){
            $scope.startday.add(-7, "days");
            //console.log("decreaseDate" + $scope.startday.toDate());
        };
}]);