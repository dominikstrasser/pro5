'use strict';

// Declare app level module which depends on views, and components
angular.module('pro5_hzv', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'ngResource',
    'mgcrea.ngStrap.datepicker',
    'mgcrea.ngStrap.tooltip',
    'mgcrea.ngStrap.typeahead',
    'mgcrea.ngStrap.collapse',
    'pro5_hzv.dashboard',
    'pro5_hzv.roomList',
    'pro5_hzv.requests',
    'pro5_hzv.bookings',
    'pro5_hzv.guests',
    'pro5_hzv.management',
    'angular-momentjs',
    'pro5_hzv.dataService',
    'pro5_hzv.dragDropDirective',
    'pro5_hzv.roomListDirective',
    'pro5_hzv.dashboardAktuellDirective',
    'pro5_hzv.dashboardFormDirective',
    'pro5_hzv.bindPolymerDirective'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/dashboard'});
}])
    .config(function($datepickerProvider) {
        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'dd.MM.yyyy',
            startWeek: 1,
            autoclose: "true",
            delay: { show: 100, hide: 1000000 }
        });
    }).config(function($collapseProvider) {
        angular.extend($collapseProvider.defaults, {
            animation: 'am-flip-x'
        });
    })
    .controller("indexCtrl", ['$scope','guestProvider','$document', function ($scope, guestProvider, $document) {


        var cGuestId;
        $scope.active = false;

        $scope.getGuest = function (e, _id) {
            guestProvider.get({ _id: _id }, function(data) {
                $scope.guest = data;
                cGuestId = data._id;
            });
            $scope.active = true;
        };

        $scope.$on( 'getGuest', $scope.getGuest);

       // var guestTargets = $document[0].getElementsByClassName('getGuest');
       // console.log(guestTargets);

        $scope.saveGuest = function () {
            delete $scope.guest['_id'];

            guestProvider.update({"_id": cGuestId}, $scope.guest, function (data) {

                //data saved. do something here.
                console.log("data was saved");
            });

        }
}])
    .directive('contenteditable', function () {
        return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel) return; // do nothing if no ng-model

                // Specify how UI should be updated
                ngModel.$render = function () {
                    element.html(ngModel.$viewValue || '');
                };

                // Listen for change events to enable binding
                element.on('blur keyup change', function () {
                    scope.$apply(readViewText);
                });

                // No need to initialize, AngularJS will initialize the text based on ng-model attribute

                // Write data to the model
                function readViewText() {
                    var html = element.html();
                    // When we clear the content editable the browser leaves a <br> behind
                    // If strip-br attribute is provided then we strip this out
                    if (attrs.stripBr && html == '<br>') {
                        html = '';
                    }
                    ngModel.$setViewValue(html);
                }
            }
        };
    }).directive('typeahead', function($timeout, $document) {
        return {
            restrict: 'E',
            scope: {
                items: '=',
                prompt: '@',
                maintitle: '@',
                subtitle: '@',
                subsubtitle: '@',
                customtype: '@',
                name: '@',
                model: '=',
                onSelect: '&'
            },
            link: function(scope, elem, attrs) {

                var maintitle = scope.maintitle;
                var model = scope.model;

                /*scope.looseFocus = function(evt) {
                    console.log(evt);
                    //scope.selected = true;
                    // TODO loose focus
                };*/

                $document.bind('click', function() { // ohne unbind wird es zweimal ausgeführt
                    scope.selected = true;
                    scope.$apply();
                });

                elem.on('click', function() {
                    event.stopPropagation();
                });

                //scope.exp = '{\''+maintitle+'\':'+model+'}';
                scope.expr = function(query) {
                    return function(item) {
                        var re = new RegExp(query, 'gi');
                        return item[scope.maintitle].match(re);
                    }
                };

                scope.handleSelection = function(selectedItem) {
                    scope.model = selectedItem[scope.maintitle];
                    scope.current = -1;
                    scope.selected = true;
                    $timeout(function() {
                        scope.onSelect({selectedItem : selectedItem});
                    }, 200);
                };
                scope.current = -1; 
                scope.selected = true; // hides the list initially
                scope.isCurrent = function(index) {
                    return scope.current == index;
                };
                scope.setCurrent = function(index) {
                    scope.current = index;
                };
                scope.handleKey = function(evt, matches) {
                    var size = matches.length;
                    if(!/(38|40|13|9)/.test(evt.keyCode)){
                        scope.selected = false;
                        return;
                    };
                    if(evt.keyCode === 38 && scope.current >= 0 && scope.model.length) scope.current--;
                    if(evt.keyCode === 40 && scope.current < size-1 && scope.model !== undefined) scope.current++;

                    // Select with enter
                    if(evt.keyCode === 13 && scope.model.length && size > 0 && scope.current >= 0) {
                        scope.model = matches[scope.current][scope.maintitle];
                        var currentMatch = matches[scope.current];
                        scope.selected = true;
                        $timeout(function() {
                            scope.onSelect({selectedItem : currentMatch});
                        }, 200);
                       // $typeahead.select(scope.$activeIndex);
                        scope.current = -1;
                        evt.preventDefault();
                        evt.stopPropagation();
                    }else if(evt.keyCode === 13) {
                        scope.selected = true;
                        evt.preventDefault();
                        evt.stopPropagation();
                    }

                    // Let ngSubmit pass if the typeahead tip is hidden
                  /*  if($typeahead.$isVisible()) {
                        evt.preventDefault();
                        evt.stopPropagation();
                    }*/
/*
                    // Navigate with keyboard
                    else if(evt.keyCode === 38 && scope.$activeIndex > 0) scope.$activeIndex--;
                    else if(evt.keyCode === 40 && scope.$activeIndex < scope.$matches.length - 1) scope.$activeIndex++;
                    else if(angular.isUndefined(scope.$activeIndex)) scope.$activeIndex = 0;
                    scope.$digest();
                    */
                };
            },
            templateUrl: 'custom_elements/custom-tooltip/custom-tooltip.html'
        };
    });