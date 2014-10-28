'use strict';

// Declare app level module which depends on views, and components
angular.module('pro5_hzv', [
    'ngRoute',
    'pro5_hzv.dashboard',
    'pro5_hzv.roomList',
    'pro5_hzv.requests',
    'pro5_hzv.bookings',
    'pro5_hzv.guests',
    'pro5_hzv.management',
    'angular-momentjs',
    'pro5_hzv.bookingService',
    'pro5_hzv.guestService'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/dashboard'});
}])
    .controller("indexCtrl", ['$scope','guestMainDataService', function ($scope, guestMainDataService) {
    $scope.guest = {};
    $scope.guest.id = '544f503e31925fc402810f03';
    guestMainDataService.getSingleGuest(function(data) {
        $scope.guest = data[0];
    });
    console.log('indexCtrl working!');
    console.log($scope.guest);
}]);