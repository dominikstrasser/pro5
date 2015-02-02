'use strict';

angular.module('pro5_hzv.requests', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/requests', {
            templateUrl: 'views/requests/requests.html',
            controller: 'requestsCtrl'
        });
    }])

    .controller('requestsCtrl', ["$scope", "bookingProvider", "guestProvider", "roomProvider", "$moment", "$location" , function($scope, bookingProvider, guestProvider, roomProvider, $moment, $location) {

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

        $scope.bookBooking = function(){
            console.log("bookBooking - set status = 1");
            $scope.currentRequest.status = 1;
            console.log($scope.currentRequest);
            bookingProvider.setStatus($scope.currentRequest,function(data){
                console.log("GEBUCHT!");
                $location.path("/bookings");
            });
        };






    }]).controller('emailController', ["$scope", "$sce", "bookingProvider", "emailProvider", "$moment", function($scope, $sce, bookingProvider, emailProvider, $moment){

        $scope.email = {};
        $scope.email.begin = $sce.trustAsHtml("<br>Im folgenden finden Sie die Informationen zu Ihrer Anfrage. Sofoern alles zu Ihrer zufriedenheit ist, schreiben Sie uns einfach als Antwort auf diese E-Mail, dass Sie das Zimmer fix buchen wollen. <br></p>");

        $scope.email.end = $sce.trustAsHtml("<p>Mit freundlichen Grüßen<br>Hotel Sammer</p>");
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

            var emailSalutation = "Lieber " + $scope.currentRequest.guest_id.salutation + " " + $scope.currentRequest.guest_id.last_name;
            var emailDetails = "<ul><li>Abfahrt: " + $moment($scope.currentRequest.arr).format('DD. MMMM YYYY') + "</li><li>Ankunft: " +$moment($scope.currentRequest.arr).format('DD. MMMM YYYY') + "</li><li>Personen: " + $scope.currentRequest.person_count + "</li></ul>";


            var emailData = {"body" : emailSalutation + $scope.email.begin + emailDetails + $scope.email.text + $scope.email.end};
            emailData.subject = "Anfrage Nr. " + $scope.currentRequest._id;
            emailData.date = Date.now();

            emailProvider.save({'_id' : $scope.currentRequest._id}, emailData, function(data){
                $scope.enableEmail = false;
                bookingProvider.detail({_id: $scope.currentRequest._id}, function(data){
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