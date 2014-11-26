'use strict';

// Declare app level module which depends on views, and components
angular.module('pro5_hzv', [
    'ngAnimate',
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
    'pro5_hzv.dataService',
    'pro5_hzv.dragDropDirective',
    'pro5_hzv.roomListDirective',
    'eee-c.angularBindPolymer'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/dashboard'});
}])
    .config(function($datepickerProvider) {
        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'dd.MM.yyyy',
            startWeek: 1,
            autoclose: "true",
            delay: { show: 100, hide: 1000000000 }
        });
    })
    .controller("indexCtrl", ['$scope','guestProvider', function ($scope, guestProvider) {


        var cGuestId;
        $scope.active = false;

        $scope.getGuest = function (_id) {
            guestProvider.get({ _id: '5474b1d06aa7d9455aae4862' }, function(data) {
                $scope.guest = data;
                cGuestId = data._id;
            });
            $scope.active = true;
        };


        $scope.saveGuest = function () {
            delete $scope.guest['_id'];

            guestProvider.update({"_id": cGuestId}, $scope.guest, function (data) {
                //data saved. do something here.
                console.log("data was saved");
            });

        }
}]).directive('contenteditable', function () {
        return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel) return; // do nothing if no ng-model

                // Specify how UI should be updated
                ngModel.$render = function () {
                    element.html(ngModel.$viewValue || '');
                };

                // Listen for change events to enable binding
                element.on('blur keyup change', function () {
                    scope.$apply(readViewText);
                });

                // No need to initialize, AngularJS will initialize the text based on ng-model attribute

                // Write data to the model
                function readViewText() {
                    var html = element.html();
                    // When we clear the content editable the browser leaves a <br> behind
                    // If strip-br attribute is provided then we strip this out
                    if (attrs.stripBr && html == '<br>') {
                        html = '';
                    }
                    ngModel.$setViewValue(html);
                }
            }
        };
    });