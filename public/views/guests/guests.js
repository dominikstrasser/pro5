'use strict';

angular.module('pro5_hzv.guests', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/guests', {
            templateUrl: 'views/guests/guests.html',
            controller: 'guestsCtrl'
        });
    }])

    .controller('guestsCtrl', [function() {

    }]);