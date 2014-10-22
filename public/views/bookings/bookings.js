'use strict';

angular.module('pro5_hzv.bookings', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/bookings', {
            templateUrl: 'views/bookings/bookings.html',
            controller: 'bookingsCtrl'
        });
    }])

    .controller('bookingsCtrl', [function() {

    }]);