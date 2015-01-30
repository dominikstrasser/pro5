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
            checkGuest(function(){
                delete $scope.currentBooking.email;
                delete $scope.currentBooking.last_name;
                bookingProvider.save($scope.currentBooking, function(data){
                    refreshRoomList();
                    $scope.currentBooking = {};
                    $scope.filteredRooms = [];
                    $scope.selectedRooms = [];
                });
            });

        };

        var checkGuest = function(cb){
            console.log($scope.currentBooking);
            if($scope.currentBooking.guest_id == ''){
                console.log("NEUER GAST MUSS ANGELEGT WERDEN");
                var newGuest = {};
                newGuest.email = $scope.currentBooking.email;
                newGuest.last_name = $scope.currentBooking.last_name;
                guestProvider.save(newGuest, function(data){
                    console.log("neuer gast angelegt...");
                    console.log(data);
                    $scope.currentBooking.guest_id = data._id;
                    cb();
                });
            }else{
                cb();
            }
        };

        $scope.handleForm = function(form){
            console.log(form);
            $scope.currentBooking = form;
            checkRooms(function(){
                console.log("checked rooms...");
                $scope.currentBooking.room_id = $scope.selectedRooms;
            });
        };


        var checkRooms = function(cb){

            var data = {};
            data.arr = $moment($scope.currentBooking.arr);
            //setTimeTo12(data.arr);
            data.dep = $moment($scope.currentBooking.dep);
            //setTimeTo12(data.dep);

            bookingProvider.check(data, function(d){
                console.log(d);
                $scope.filteredRooms = [];
                for(var i = 0; i < d.length; i++){
                    $scope.filteredRooms.push(d[i].room_id[0]);
                }

                cb();
            });

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