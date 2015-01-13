'use strict';

angular.module('pro5_hzv.requests', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/requests', {
            templateUrl: 'views/requests/requests.html',
            controller: 'requestsCtrl'
        });
    }])

    .controller('requestsCtrl', ["$scope", "bookingProvider", "guestProvider", "roomProvider", "$moment" , function($scope, bookingProvider, guestProvider, roomProvider, $moment) {

        $scope.reqs = bookingProvider.detail({'status': 0});

        $scope.guests = guestProvider.query();

        $scope.startday = $moment();
        $scope.startday.millisecond(0);
        $scope.startday.second(0);
        $scope.startday.minute(0);
        $scope.startday.utc().hours(12);

        roomProvider.query(function(data){
            $scope.rooms = data;
        });

        $scope.filteredRooms = [];
        $scope.selectedRooms = [];


        var refreshRoomList = function() {
            bookingProvider.roomList({"start": $scope.startday.toDate()}, function (data) {
                $scope.bookings = data;
            });
        };

        $scope.$watch("startday", function(n,o){
            if(typeof n != 'undefined') {
                refreshRoomList();
            }
        },true);


        $scope.currentRequest = {};

        var manageFilteredRooms = function(_id){

            for(var i = 0; i < $scope.rooms.length; i++){
                if($scope.rooms[i]._id != _id){
                    $scope.filteredRooms.push($scope.rooms[i]._id);
                }
            }
            refreshRoomList();
        };


        $scope.getDetail = function(_id){
            document.getElementById("reqCollapse").close();
            document.getElementById("reqFormCollapse").open();
            document.getElementById("reqRoomListCollapse").open();
            document.getElementById("reqEmailCollapse").open();
            $scope.filteredRooms = [];
            bookingProvider.detail({_id: _id}, function(data){
                $scope.currentRequest = data[0];
                manageFilteredRooms(data[0].room_id[0]._id);
            });
        };


        $scope.increaseDate = function(){
            $scope.startday.add(7, "days");
            //console.log("increaseDate" + $scope.startday.toDate());
        };
        $scope.decreaseDate = function(){
            $scope.startday.add(-7, "days");
            //console.log("decreaseDate" + $scope.startday.toDate());
        };




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







        $scope.toTrustedHtml = function(data){
            return $sce.trustAsHtml(data);
        };

        $scope.handleDrop = function() {
            alert('Item has been dropped');
        };

    }]);