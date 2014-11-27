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


        var today = new Date();

        var cArr = moment.utc([
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            12, 0, 0, 0]);

        $scope.arrivals = bookingProvider.currentArrivals({"cArr" : cArr.toDate()});
        $scope.departures = bookingProvider.currentDepartures({"cArr" : cArr.toDate()});


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
        $scope.requestForm.doubleRoom_count = 1;
        $scope.requestForm.room_id = [];
        $scope.requestForm.category = "NF";


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
            //console.log($scope.requestForm);
            //bookingProvider.save($scope.requestForm);

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