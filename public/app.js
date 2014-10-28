'use strict';

// Declare app level module which depends on views, and components
angular.module('pro5_hzv', [
    'ngRoute',
    'mgcrea.ngStrap.datepicker',
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
    .config(function($datepickerProvider) {
        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'dd. MMMM yyyy',
            startWeek: 1,
            autoclose: "true"
            //delay: { show: 500, hide: 100000 }
        });
    })
    .controller("indexCtrl", ['$scope','guestMainDataService', function ($scope, guestMainDataService) {
    $scope.guest = {};
    $scope.guest.id = '544f503e31925fc402810f03';
    guestMainDataService.getSingleGuest(function(data) {
        $scope.guest = data[0];
    });
    console.log('indexCtrl working!');
    console.log($scope.guest);
}]);
