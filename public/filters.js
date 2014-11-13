angular.module('pro5_hzv.filters', []).filter('orderDate', [ '$moment' ,function($moment) {
    return function(input) {

        /*var today = moment().utc();
        var tomorrow = moment.utc(today).add(1, "days");
        setTimeTo12(today);
        setTimeTo12(tomorrow);*/


        var object = {};
        var currentDay = input[0].arr;
        var counter = 0;

        angular.forEach(input, function(item) {

            var arr = $moment(item.arr);
            if (arr.isSame(currentDay, "days")) {
                object[currentDay][counter] = item;
                counter++;
            } else {
                counter = 0;
                currentDay = input.arr;
                object[currentDay][counter] = item;
            }

        });

        return object;

    }
} ]);