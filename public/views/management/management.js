'use strict';

angular.module('pro5_hzv.management', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/management', {
            templateUrl: 'views/management/management.html',
            controller: 'managementCtrl'
        });
    }])

    .controller('managementCtrl', ["$scope", "roomProvider", function($scope, roomProvider) {
        $scope.rooms = roomProvider.query();
        $scope.newRoom = {};
        $scope.newRoom.s_beds = 0;
        $scope.newRoom.d_beds = 0;

        $scope.addRoomForm = false;
        $scope.addRoomFormButtonDisabled = false;
        $scope.updateRoomButtonDisabled = false;

        $scope.updateRoom = function(id){
            $scope.updateRoomButtonDisabled = true;
            roomProvider.update($scope.rooms[id],function(data){

            });
        };
        $scope.deleteRoom = function(id){
            roomProvider.delete({"_id" : $scope.rooms[id]._id},function(data){
                console.log("deleted");
                console.log(data);
                $scope.rooms.splice(id,1);
            });
        };

        $scope.saveRoom = function(){
            $scope.addRoomFormButtonDisabled = true;
            roomProvider.save($scope.newRoom, function(data){
                $scope.addRoomFormButtonDisabled = false;
                $scope.addRoomForm = false;

                $scope.rooms.unshift($scope.newRoom);
                $scope.newRoom = {};
            });
        };


    }]);