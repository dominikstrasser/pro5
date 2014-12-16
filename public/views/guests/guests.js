'use strict';

angular.module('pro5_hzv.guests', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/guests', {
            templateUrl: 'views/guests/guests.html',
            controller: 'guestsCtrl'
        });
    }])

    .controller('guestsCtrl', ['$scope', 'guestProvider', function($scope, guestProvider) {

        $scope.addGuestForm = false;
        $scope.addGuestFormButtonDisabled = false;
        $scope.updateGuestButtonDisabled = false;
        $scope.guests = guestProvider.query();

        $scope.updateGuest = function(id){
            $scope.updateGuestButtonDisabled = true;
            guestProvider.update($scope.guests[id],function(data){

            });
        };
        $scope.deleteGuest = function(id){
            guestProvider.delete({"_id" : $scope.guests[id]._id},function(data){
                console.log("deleted");
                console.log(data);
                $scope.guests.splice(id,1);
            });
        };

        $scope.saveGuest = function(){
            $scope.addGuestFormButtonDisabled = true;
            guestProvider.save($scope.newGuest, function(data){
                $scope.addGuestFormButtonDisabled = false;
                $scope.addGuestForm = false;
                document.getElementById('newGuestCollapse').toggle();
                $scope.guests.unshift($scope.newGuest);
                $scope.newGuest = {};
            });
        };



    }]);