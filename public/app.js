'use strict';

// Declare app level module which depends on views, and components
angular.module('pro5_hzv', [
    'ngRoute',
    'ngResource',
    'mgcrea.ngStrap.datepicker',
    'pro5_hzv.dashboard',
    'pro5_hzv.roomList',
    'pro5_hzv.requests',
    'pro5_hzv.bookings',
    'pro5_hzv.guests',
    'pro5_hzv.management',
    'angular-momentjs',
    'pro5_hzv.dataService'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/dashboard'});
}])
    .config(function($datepickerProvider) {
        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'dd. MMMM yyyy',
            startWeek: 1,
            autoclose: "true"
            //delay: { show: 500, hide: 100000 }
        });
    })
    .controller("indexCtrl", ['$scope','guestProvider', function ($scope, guestProvider) {


        var cGuestId;

        $scope.getGuest = function (_id) {
            guestProvider.get({ _id: _id }, function(data) {
                $scope.guest = data;
                cGuestId = data._id;
            });
        };


        $scope.saveGuest = function () {
            delete $scope.guest['_id'];

            guestProvider.update({"_id": cGuestId}, $scope.guest, function (data) {
                //data saved. do something here.
                console.log("data was saved");
            });

        }
}]);
