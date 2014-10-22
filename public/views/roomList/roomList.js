'use strict';

angular.module('pro5_hzv.roomList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/roomList', {
    templateUrl: 'views/roomList/roomList.html',
    controller: 'roomListCtrl'
  });
}])

.controller('roomListCtrl', [function() {

}]);