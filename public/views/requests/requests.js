'use strict';

angular.module('pro5_hzv.requests', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/requests', {
            templateUrl: 'views/requests/requests.html',
            controller: 'requestsCtrl'
        });
    }])

    .controller('requestsCtrl', ["$scope", "bookingProvider", function($scope, bookingProvider) {

        $scope.reqs = bookingProvider.detail({'status': 0});
    }]).controller('emailController', ["$scope", "$sce", "bookingProvider", "emailProvider", function($scope, $sce, bookingProvider, emailProvider){

        $scope.email = {};
        $scope.email.begin = $sce.trustAsHtml("<p>Liebe Familie Mustermann<br>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.<br></p>");
        $scope.email.end = $sce.trustAsHtml("<p>Mit freundlichen Grüßen<br>Sebastian Sammer</p>");
        $scope.email.text = $sce.trustAsHtml("<p class='drop' >&nbsp;</p>");

        $scope.testBox = {};
        $scope.testBox.title = "testBox"
        $scope.testBox.text = "Das ist ein Test";

        $scope.enableEmail = false;


        $scope.sendEmail = function(){
            $scope.enableEmail = true;
            var emailData = {"body" : $scope.email.begin + $scope.email.text + $scope.email.end};
            emailData.subject = "Buchung xyz";
            emailData.date = Date.now();
            emailProvider.save({'_id' : $scope.currentRequest._id}, emailData, function(data){
                console.log(data);
                $scope.enableEmail = false;
                bookingProvider.detail({_id: "5464ade0e4b0ac2744f1503e"}, function(data){
                    $scope.currentRequest = data[0];
                });

            });
        };


        $scope.currentRequest = {};
        bookingProvider.detail({_id: "5464ade0e4b0ac2744f1503e"}, function(data){
            $scope.currentRequest = data[0];
        });

        $scope.toTrustedHtml = function(data){
            return $sce.trustAsHtml(data);
        };

        $scope.handleDrop = function() {
            alert('Item has been dropped');
        };

    }]);