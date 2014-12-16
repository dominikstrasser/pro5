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
        $scope.email.text = $sce.trustAsHtml("<p class='drop' ></p>");

        $scope.wellness = {};
        $scope.wellness.title = "Wellness";
        $scope.wellness.text = "Das ist ein Wellness Textbaustein";

        $scope.golf = {};
        $scope.golf.title = "Golf";
        $scope.golf.text = "Das ist ein Golf Textbaustein";

        $scope.kultur = {};
        $scope.kultur.title = "Kultur";
        $scope.kultur.text = "Das ist ein Kultur Textbaustein";

        $scope.enableEmail = false;


        $scope.sendEmail = function(){
            $scope.enableEmail = true;
            var emailData = {"body" : $scope.email.begin + $scope.email.text + $scope.email.end};
            emailData.subject = "Anfrage Nr. 5480ca10ec89333b3733852f";
            emailData.date = Date.now();
            emailProvider.save({'_id' : $scope.currentRequest._id}, emailData, function(data){
                $scope.enableEmail = false;
                bookingProvider.detail({_id: "5480ca10ec89333b3733852f"}, function(data){
                    $scope.currentRequest = data[0];
                });
            });
        };


        $scope.currentRequest = {};
        bookingProvider.detail({_id: "5480ca10ec89333b3733852f"}, function(data){
            $scope.currentRequest = data[0];
        });

        $scope.toTrustedHtml = function(data){
            return $sce.trustAsHtml(data);
        };

        $scope.handleDrop = function() {
            alert('Item has been dropped');
        };

    }]);