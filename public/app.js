'use strict';

// Declare app level module which depends on views, and components
angular.module('pro5_hzv', [
    'ngRoute',
    'pro5_hzv.dashboard',
    'pro5_hzv.view2',
    'angular-momentjs',
    'pro5_hzv.bookingService'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/dashboard'});
}]);

angular.module("pro5_hzv").controller("testController", function($scope){
    $scope.currentUser = "currentUser - Objekt";
});
