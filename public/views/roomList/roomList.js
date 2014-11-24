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

        bookingProvider.query(function(data){
            $scope.bookings = data;
        });

}]);