'use strict';

angular.module('pro5_hzv.requests', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/requests', {
            templateUrl: 'views/requests/requests.html',
            controller: 'requestsCtrl'
        });
    }])

    .controller('requestsCtrl', ["$scope", "bookingProvider", function($scope, bookingProvider) {

        $scope.reqs = bookingProvider.detail({'status': 0}, function(data){
            console.log(data);
        });
    }]).controller('emailController', ["$scope", "$sce", "emailProvider", function($scope, $sce, emailProvider){

        $scope.email = {};
        $scope.email.begin = $sce.trustAsHtml("<p>Liebe Familie Mustermann<br>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.<br></p>");
        $scope.email.end = $sce.trustAsHtml("<p>Mit freundlichen Grüßen<br>Sebastian Sammer</p>");
        $scope.email.text = $sce.trustAsHtml("<p>TEXT</p>");

        $scope.sendEmail = function(){
            console.log("SENDEMAIL");
        }

    }]);