angular.module('pro5_hzv.dataService', ['ngResource'])
    .factory('bookingProvider', function($resource){
        return $resource('api/bookings/:_id', {_id : "@_id"},{
            currentArrivals: {method:'GET', url:'api/bookings/getCurrentArrivals/', isArray:true},
            currentDepartures: {method:'GET', url:'api/bookings/getCurrentDepartures/', isArray:true},
            check: {method: "GET", url:'api/bookings/check/', isArray:true},
            setStatus: {method: "POST", url:'api/bookings/setStatus/:_id'},
            update: {method: 'PUT' },
            detail: {method: "GET", url:'api/bookings/detail/:_id', isArray:true},
            roomList: {method: "GET", url:'api/bookings/roomList/', isArray:true}
        });
    }).factory('guestProvider', function($resource){
        return $resource('api/guests/:_id', {_id : "@_id"},{
            update: {method: 'PUT' }
        });
    }).factory('roomProvider', function($resource){
        return $resource('api/rooms/:_id', {_id : "@_id"},{
            update: {method: 'PUT' }
        });
    }).factory('emailProvider', function($resource){
        return $resource('api/emails/:_id', {},{
            update: {method: 'PUT' }
        });
    });
