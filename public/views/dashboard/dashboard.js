'use strict';

angular.module('pro5_hzv.dashboard', [
    'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'views/dashboard/dashboard.html',
    controller: 'dashboardCtrl'
  });
}])

.controller('dashboardCtrl', ['$scope', '$http', '$moment', 'bookingService', function($scope, $http, $moment, bookingService) {

        $scope.arrivals = {};
        var setTimeTo12 = function(d){
            d.hour(12);
            d.seconds(0);
            d.minutes(0);
            d.milliseconds(0);
        };
        $scope.today = $moment.utc();
        setTimeTo12($scope.today);
        $scope.tomorrow = $moment.utc($scope.today).add(1,"days");

        $scope.arrivals = bookingService.currentArrivals();
        //$scope.departures = bookingService.currentArrivals();
}]);