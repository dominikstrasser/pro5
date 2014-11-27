'use strict';

angular.module('pro5_hzv.guests', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/guests', {
            templateUrl: 'views/guests/guests.html',
            controller: 'guestsCtrl'
        });
    }])

    .controller('guestsCtrl', ['$scope', 'guestProvider', function($scope, guestProvider) {
        $scope.guests = guestProvider.query();

        $scope.updateGuest = function(id){
            guestProvider.update($scope.guests[id]);
        };

        $scope.saveGuest = function(){
            console.log("1");
            guestProvider.save($scope.newGuest, function(data){
                console.log(data);
                console.log("2");
            });
        };



    }]);