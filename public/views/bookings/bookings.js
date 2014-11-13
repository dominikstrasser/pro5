'use strict';

angular.module('pro5_hzv.bookings', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/bookings', {
            templateUrl: 'views/bookings/bookings.html',
            controller: 'bookingsCtrl'
        });
    }])

    .controller('bookingsCtrl', ["$scope", "bookingProvider", function($scope, bookingProvider) {
        $scope.reqs = bookingProvider.detail({'status': 1});
    }]);