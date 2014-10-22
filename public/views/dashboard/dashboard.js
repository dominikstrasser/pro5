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

        $scope.checkDate = function(d){
            d = moment(d);
            if(d.isSame($scope.today, "days")) return 1;
            if(d.isSame($scope.tomorrow, "days")) return 2;
            if(d.isAfter($scope.tomorrow, "days")) return 3;
        };

        $scope.today = moment().utc();
        $scope.tomorrow = moment.utc($scope.today).add(1, "days");
        setTimeTo12($scope.today);
        setTimeTo12($scope.tomorrow);

        $scope.arrivals = bookingService.currentArrivals(function(){

        });

}]);