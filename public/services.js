angular.module('pro5_hzv.bookingService', ['ngResource'])
    .factory('arrivalService', function($resource){
        return $resource('api/booking/getCurrentArrivals/', {}, {
            currentArrivals: {method:'GET', params:{}, isArray:true}
        });
    }
).factory('departureService', function($resource){
        return $resource('api/booking/getCurrentDepartures/', {},{
            currentDepartures: {method:'GET', params:{}, isArray:true}
        });
    });