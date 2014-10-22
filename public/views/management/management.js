'use strict';

angular.module('pro5_hzv.management', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/management', {
            templateUrl: 'views/management/management.html',
            controller: 'managementCtrl'
        });
    }])

    .controller('managementCtrl', [function() {

    }]);