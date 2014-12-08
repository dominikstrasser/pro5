angular.module('pro5_hzv.dashboardAktuellDirective',[])
    .directive('aktuellDir', function($moment) {
    return {
        restrict: 'E',
        replace:true,
        //templateUrl:'temp/dashboard-anreisen.html',
        template: '<div ng-include="contentUrl"></div>',
        scope: {
            bookings: '=',
            day:'@',
            opened:'@',
            contentUrl:'@'
        },
        link: function(scope, element, attrs) {

            var setTimeTo12 = function(d){
                d.hour(12);
                d.seconds(0);
                d.minutes(0);
                d.milliseconds(0);
            };




            scope.$watch("bookings", function(n,o){

                if(typeof n != 'undefined') {
                }

            },true);

            scope.$watch("opened", function(n,o){

                if(typeof n != 'undefined') {
                }
            });

            if(scope.day == 1) scope.dayWord = "Heute";
            if(scope.day == 2) scope.dayWord = "Morgen";
            if(scope.day == 3) scope.dayWord = "Kommende Woche";
            scope.today = $moment().utc();
            scope.tomorrow = $moment.utc(scope.today).add(1,"days");
            setTimeTo12(scope.today);
            setTimeTo12(scope.tomorrow);


            scope.checkDate = function(d){

                d = $moment(d);

                if(d.isSame(scope.today, "days")) return 1;
                if(d.isSame(scope.tomorrow, "days")) return 2;
                if(d.isAfter(scope.tomorrow, "days")) return 3;
            };
        }
    }
});