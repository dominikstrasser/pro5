'use strict';

angular.module('pro5_hzv.roomList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/roomList', {
    templateUrl: 'views/roomList/roomList.html',
    controller: 'roomListCtrl'
  });
}])

.controller('roomListCtrl', ['$scope', '$moment',function($scope, $moment) {
        $scope.arr = $moment().toISOString();
        $scope.dep = $moment().toISOString();

        $scope.currentGuest;
        $scope.email;
        $scope.last_name;

        $scope.$watch('last_name', function(newValue, oldValue) {
            console.log("test");
            if(newValue == "Dominik"){

            }
        });

}]);