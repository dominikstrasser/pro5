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

        $scope.dayAnimation = function(section){

            if($scope.selected === section){
                $scope.selected = false;
            }else {
                $scope.selected = section;
            }
            console.log(section);

        };

        $scope.isSelected = function(section){

            return $scope.selected === section;
        };

        $scope.dayEntryAnimation = function(section){
            if($scope.selectedEntry === section){
                $scope.selectedEntry = false;
            }else {
                $scope.selectedEntry = section;
            }
        };

        $scope.isSelectedEntry = function(section){

            return $scope.selectedEntry === section;
        };

        $scope.today = moment().utc();
        $scope.tomorrow = moment.utc($scope.today).add(1, "days");
        setTimeTo12($scope.today);
        setTimeTo12($scope.tomorrow);

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


    });