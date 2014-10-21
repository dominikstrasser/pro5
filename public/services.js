angular.module('pro5_hzv.bookingService', ['ngResource'])
	.factory('bookingService', function($resource){
        return $resource('api/booking/getCurrentArrivals/', {}, {
            currentArrivals: {method:'GET', params:{}, isArray:true}
        });
    }
	);