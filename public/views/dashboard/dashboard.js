'use strict';

angular.module('pro5_hzv.dashboard', [
    'ngRoute'
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'views/dashboard/dashboard.html',
            controller: 'dashboardCtrl'
        });
    }])

    .controller('dashboardCtrl', ['$scope', '$moment', 'bookingProvider', function($scope, $moment, bookingProvider) {

        $scope.arrivals = {};
        $scope.departures = {};
        var setTimeTo12 = function(d){
            d.hour(12);
            d.seconds(0);
            d.minutes(0);
            d.milliseconds(0);
        };

        var today = new Date();

        var cArr = moment.utc([
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            12, 0, 0, 0]);

        $scope.arrivals = bookingProvider.currentArrivals({"cArr" : cArr.toDate()},function(){
            console.log("FERTIG1");
        });
        $scope.departures = bookingProvider.currentDepartures({"cArr" : cArr.toDate()},function(){
            console.log("FERTIG2");
        });


    }]).controller("requestFormController", function($scope, $moment, bookingProvider, guestProvider, roomProvider){

        $scope.guests = guestProvider.query();


        var testbooking = {};
        testbooking.email = '';// This will hold the selected item
        testbooking.last_name = ''; // This will hold the selected item
        testbooking.status =  0;
        testbooking.person_count = 1;
        testbooking.room_count =  1;
        testbooking.doubleRoom_count = 1;
        testbooking.room_id = [];
        testbooking.category = "NF";

        $scope.booking = testbooking;


        $scope.handleForm = function(form){
            console.log(form);
            console.log("save");
        }

        /*$scope.$watch('requestForm.last_name', function(n, o){
         angular.forEach($scope.guests, function(guest, key){
         if(guest.last_name === n) {
         $scope.requestForm.email = guest.email;
         };
         });
         });

        var setTimeTo12 = function(d){
            d.hour(12);
            d.seconds(0);
            d.minutes(0);
            d.milliseconds(0);
        };


        //###################### Directive ##########################

        $scope.guests = guestProvider.query();
        dataFactory.get('states.json').then(function(data) {
         $scope.items = data;
         });
        $scope.requestForm = {};
        $scope.requestForm.email = '';// This will hold the selected item
        $scope.requestForm.last_name = ''; // This will hold the selected item

        $scope.onItemSelected = function(selectedItem) { // this gets executed when an item is selected
            console.log(selectedItem);
            console.log("asdfs");

            if($scope.requestForm.last_name) $scope.requestForm.email = selectedItem['email'];
            if($scope.requestForm.email) $scope.requestForm.last_name = selectedItem['last_name'];

        };

        $scope.requestForm.status =  0;
        $scope.requestForm.person_count = 5;
        $scope.requestForm.room_count =  1;
        $scope.requestForm.doubleRoom_count = 1;
        $scope.requestForm.room_id = [];
        $scope.requestForm.category = "NF";

        $scope.updateEmail = function(item) {
         angular.forEach($scope.guests, function(guest, key){
         if(guest.last_name === item) {
         $scope.requestForm.e_mail = guest.email;
         };
         });
         console.log(item);
         };
         $scope.updateName = function(item) {
         angular.forEach($scope.guests, function(guest, key){
         if(guest.email === item) {
         $scope.requestForm.last_name = guest.last_name;
         };
         });
         console.log(item);
         };


        $scope.testBooking = function(){

            //console.log($scope.requestForm);

            var arr = moment.utc([
                $scope.requestForm.arr.getFullYear(),
                $scope.requestForm.arr.getMonth(),
                $scope.requestForm.arr.getDate(),
                12, 0, 0, 0]);

            var dep = moment.utc([
                $scope.requestForm.dep.getFullYear(),
                $scope.requestForm.dep.getMonth(),
                $scope.requestForm.dep.getDate(),
                12, 0, 0, 0]);

            //console.log(arr);

            $scope.requestForm.arr = arr.toDate();
            $scope.requestForm.dep = dep.toDate();
            console.log($scope.requestForm);
            //bookingProvider.save($scope.requestForm);

        };


         roomProvider.query(function(data){
         $scope.all_rooms = data;
         $scope.available_rooms = $scope.all_rooms.slice(0);
         });

         $scope.$watchCollection("requestForm", function(newValue, oldValue){
         if(typeof newValue != 'undefined') {
         if ($moment(newValue.arr).isValid() && $moment(newValue.dep).isValid()) {

         var data = {};
         data.arr = $moment(newValue.arr);
         setTimeTo12(data.arr);
         data.dep = $moment(newValue.dep);
         setTimeTo12(data.dep);

         bookingProvider.check(data, function(data){

         $scope.remove_rooms = data;
         $scope.available_rooms = $scope.all_rooms.slice(0);

         for (var i = 0; i < $scope.available_rooms.length; i++) {
         for (var j = 0; j < data.length; j++) {
         if ($scope.available_rooms[i]._id == data[j].room_id[0]) {
         $scope.available_rooms.splice(i, 1);
         i--;
         break;
         }
         }
         }
         });
         }
         }
         });
         */

    }).controller("dashboardRoomListController", function($scope, $moment, bookingProvider, roomProvider) {


        $scope.startday = $moment();
        $scope.startday.millisecond(0);
        $scope.startday.second(0);
        $scope.startday.minute(0);
        $scope.startday.utc().hours(12);

        roomProvider.query(function (data) {
            $scope.rooms = data;
        });

        var refreshRoomList = function () {
            bookingProvider.roomList({"start": $scope.startday.toDate()}, function (data) {
                $scope.bookings = data;
            });
        };

        $scope.$watch("startday", function (n, o) {
            if (typeof n != 'undefined') {
                refreshRoomList();
            }
        }, true);

        $scope.filteredRooms = [];
        $scope.selectedRooms = [];

        $scope.$watch("selectedRooms", function (n, o) {
            $scope.currentBooking.room_id = n;
        }, true);


        $scope.increaseDate = function () {
            $scope.startday.add(7, "days");
            //console.log("increaseDate" + $scope.startday.toDate());
        };
        $scope.decreaseDate = function () {
            $scope.startday.add(-7, "days");
            //console.log("decreaseDate" + $scope.startday.toDate());
        };

    });