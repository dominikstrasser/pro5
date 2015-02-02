'use strict';

angular.module('pro5_hzv.bookings', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/bookings', {
            templateUrl: 'views/bookings/bookings.html',
            controller: 'bookingsCtrl'
        });
    }])
    .controller('bookingsCtrl', ["$scope", "bookingProvider", "guestProvider", "roomProvider", "$moment", "$location" , function($scope, bookingProvider, guestProvider, roomProvider, $moment, $location) {
        $scope.reqs = bookingProvider.detail({'status': 1});

        $scope.panels = [
            {
                "title": "Collapsible Group Item #1",
                "body": "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
            },
            {
                "title": "Collapsible Group Item #2",
                "body": "Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee."
            },
            {
                "title": "Collapsible Group Item #3",
                "body": "Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade."
            }
        ];
        $scope.panels.activePanel = -1;

        $scope.currentRequest = {};

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

        var manageFilteredRooms = function(_id){

            for(var i = 0; i < $scope.rooms.length; i++){
                if($scope.rooms[i]._id != _id){
                    $scope.filteredRooms.push($scope.rooms[i]._id);
                }
            }
            refreshRoomList();
        };


    }]);


