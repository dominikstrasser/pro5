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
angular.module('pro5_hzv.guestService', ['ngResource']).factory('guestMainDataService', function($resource){
    return $resource('api/guest/544f503e31925fc402810f03/', {},{
        getSingleGuest: {method:'GET', params:{}, isArray:true}
    });
});