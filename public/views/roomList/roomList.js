'use strict';

angular.module('pro5_hzv.roomList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/roomList', {
    templateUrl: 'views/roomList/roomList.html',
    controller: 'roomListCtrl'
  });
}])

.controller('roomListCtrl', ['$scope', '$moment', '$http',function($scope, $moment, $http) {

        $scope.email = {};
        $scope.email.subject = "test";
        $scope.email.body = "test";
        $scope.email.date = new Date();

        $scope.sendEmail = function(){
            console.log($scope.email.body);
            $http.post("api/email/" + "5459e28dd60b8ae519904f3a", $scope.email)
                .success(function(data, status, headers,config){
                console.log(data);
            });
        };


        $scope.currentGuest;
        $scope.email;
        $scope.last_name;
        $scope.anfrage = {};
        $scope.anfrage.arr = $moment().toISOString();
        $scope.anfrage.dep = $moment().add(2,"days").toISOString();

        $http.get("api/room/")
            .success(function(data, status, headers, config){
                $scope.all_rooms = data;
                $scope.available_rooms = $scope.all_rooms.slice(0);
            });

        $scope.$watchCollection("anfrage", function(newValue, oldValue){
            if($moment(newValue.arr).isValid() && $moment(newValue.dep).isValid()) {
                $http.post("api/booking/check", newValue)
                    .success(function (data, status, headers, config) {
                        $scope.remove_rooms = data;
                        $scope.available_rooms = $scope.all_rooms.slice(0);
                        for (var i = 0; i < $scope.available_rooms.length; i++) {
                            for (var j = 0; j < data.length; j++) {
                                if ($scope.available_rooms[i]._id == data[j].room_id[0]) {
                                    $scope.available_rooms.splice(i,1);
                                    i--;
                                    break;
                                }
                            }
                        }
                    });
            }

        });
}]).filter('testFilter', function() {
        return function(input, status) {
            if(typeof status === 'undefined' || status == "") return input;
            var out = [];
            for (var i = 0; i < input.length; i++) {
                if (input[i].beds == status)
                    out.push(input[i]);
            }
            return out;
        };
    }).directive('contenteditable', ['$sce', function($sce) {
        return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: function(scope, element, attrs, ngModel) {
                if (!ngModel) return; // do nothing if no ng-model

                // Specify how UI should be updated
                ngModel.$render = function() {
                    element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
                };

                // Listen for change events to enable binding
                element.on('blur keyup change', function() {
                    scope.$apply(read);
                });
                read(); // initialize

                // Write data to the model
                function read() {
                    var html = element.html();
                    // When we clear the content editable the browser leaves a <br> behind
                    // If strip-br attribute is provided then we strip this out
                    if ( attrs.stripBr && html == '<br>' ) {
                        html = '';
                    }
                    ngModel.$setViewValue(html);
                }
            }
        };
    }]);