'use strict';

angular.module('pro5_hzv.guests', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/guests', {
            templateUrl: 'views/guests/guests.html',
            controller: 'guestsCtrl'
        });
    }])

    .controller('guestsCtrl', ['$scope', 'guestProvider', function($scope, guestProvider) {
        guestProvider.query(function(data) {
            $scope.guests = data;
            //console.log($scope.guests);
        });
    }]);