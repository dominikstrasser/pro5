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

        $scope.currentDate = "first";
        $scope.isCurrentDate = function(date) {
            var check = true;
            var dateBuffer = date;
            date = $moment(date);
            if ($scope.currentDate != "first") {
                if (date.isSame($scope.currentDate, "days")) {
                    check = true;
                } else {
                    check = false;
                }
            }
            $scope.currentDate = dateBuffer;
            return check;
        };

        $scope.displayDate = function (d) {
            var dateBuffer = d;
            d = $moment(d);
            if(d.isSame($scope.today, "days")){
                return "Heute";
            }else{
                if(d.isSame($scope.tomorrow, "days")) {
                    return "Morgen";
                } else {
                    return dateBuffer;
                }
            }
        };

        $scope.checkDate = function(d){
            d = $moment(d);
            if(d.isSame($scope.today, "days")) return 1;
            if(d.isSame($scope.tomorrow, "days")) return 2;
            if(d.isAfter($scope.tomorrow, "days")) return 3;
        };

        $scope.selected = [];
        $scope.selectedEntry = [];
        $scope.init = function(index){
            if(index == 1){
                $scope.selected[index] = false;
            }else{
                $scope.selected[index] = true;
            }
        };
        $scope.dayAnimation = function(index){

            if(index in $scope.selected && $scope.selected[index]){
                $scope.selected[index] = false;
            }else {
                $scope.selected[index] = true;
            }
            console.log(index);

        };
        $scope.isSelected = function(index){
            if ($scope.selected[index]) {
                return true;
            } else {
                return false;
            }

        };
        $scope.initEntry = function(parentIndex, index, parentLast, first){
            if(first == index) {
                $scope.selectedEntry[parentIndex] = new Array();
                for (var i = 0; i < parentLast; i++) {
                    $scope.selectedEntry[parentIndex][index] = true;
                }
            }
            $scope.selected[parentIndex][index] = true;
        };

        $scope.dayEntryAnimation = function(parentIndex, index){
            if(parentIndex in $scope.selectedEntry) {

                if ($scope.selectedEntry[parentIndex][index]) {
                    $scope.selectedEntry[parentIndex][index] = false;
                } else {
                    $scope.selectedEntry[parentIndex][index] = true;
                }
            }
        };

        $scope.isSelectedEntry = function(parentIndex, index){
            if(parentIndex in $scope.selectedEntry) {
                if ($scope.selectedEntry[parentIndex][index]) {
                    return true;
                } else {
                    return false;
                }
            }
        };

        $scope.today = moment().utc();
        $scope.tomorrow = moment.utc($scope.today).add(1, "days");
        setTimeTo12($scope.today);
        setTimeTo12($scope.tomorrow);


        /*
         * NICHT UTC?!?!?!?!?
         * */

        var today = new Date();

        var cArr = moment.utc([
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            12, 0, 0, 0]);

        $scope.arrivalsOrder = [];
        $scope.arrivals = bookingProvider.currentArrivals(function(data){
            var array = [];

                angular.forEach(data, function (item) {

                    var counter = 0;

                    var day = $moment(item.arr).day();
                    if (array[day] != undefined) {

                        while(array[day][counter] != undefined) {
                            counter++;
                        }
                        array[day][counter] = item;

                    } else {
                        var key = counter;
                        var obj = {};
                        obj[key] = item;
                        array[day] = obj;
                    }

                });

            console.log(array);
            $scope.arrivalsOrder = array;
        });
        $scope.departuresOrder = [];
        $scope.departures = bookingProvider.currentDepartures(function(data){
            var array = [];

            angular.forEach(data, function (item) {

                var counter = 0;

                var day = $moment(item.dep).day();
                if (array[day] != undefined) {

                    while(array[day][counter] != undefined) {
                        counter++;
                    }
                    array[day][counter] = item;

                } else {
                    var key = counter;
                    var obj = {};
                    obj[key] = item;
                    array[day] = obj;
                }

            });

            console.log(array);
            $scope.departuresOrder = array;
        });

    }])


    .controller("requestFormController", function($scope, $moment, bookingProvider, guestProvider, roomProvider){


        var setTimeTo12 = function(d){
            d.hour(12);
            d.seconds(0);
            d.minutes(0);
            d.milliseconds(0);
        };

        $scope.requestForm = {};
        $scope.requestForm.status =  0;
        $scope.requestForm.person_count = 1;
        $scope.requestForm.room_count =  1;
        $scope.requestForm.room_id = [];
        $scope.requestForm.category = "TEST";


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

            console.log(arr);

            $scope.requestForm.arr = arr.toDate();
            $scope.requestForm.dep = dep.toDate();
            bookingProvider.save($scope.requestForm);

        };

        /*
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

    });