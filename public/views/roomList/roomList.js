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
        roomProvider.query(function(data){
             $scope.rooms = data;
        });

        var refreshRoomList = function() {
            bookingProvider.roomList({"start": $scope.startday.toDate()}, function (data) {
                $scope.bookings = data;
                console.log(data);
            });
        };

        $scope.$watch("startday", function(n,o){
            if(typeof n != 'undefined') {
                console.log("startday änderung");
                refreshRoomList();
            }
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