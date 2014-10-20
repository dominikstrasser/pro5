var q = require("q");
//var db = require('./dbConnection.js');
var moment = require('moment');

var mongoose = require("mongoose");

mongoose.connect("mongodb://testUser:mtd_pro5@ds063859.mongolab.com:63859/pro5_hotel");
var db = mongoose.connection;

var roomModel = require("./../model/room.js");
var bookingModel = require("./../model/booking.js");
var guestModel = require("./../model/guest.js");

var roomData = require("./room.json");
var bookingData = require("./booking.json");
var guestData = require("./guest.json");

db.on("error", function(){
    console.log("Mongoose Error");
});
db.on("close", function(){
    console.log("Mongoose Error");
});



db.once("open", function(){
    console.log("Mongoose open");

    var removeRoomData = function() {
        console.log("reset.js - Room:remove");
        var deferred = q.defer();
        roomModel.remove({}, function (err) {
            if (err) deferred.reject();
            deferred.resolve("removeRoomData finished");
        });
        return deferred.promise;
    };

    var removeBookingData = function() {
        console.log("reset.js - Booking:remove");
        var deferred = q.defer();
        bookingModel.remove({}, function (err) {
            if (err) deferred.reject();
            deferred.resolve("removeBookingData finished");
        });
        return deferred.promise;
    };

    var removeGuestData = function(){
        console.log("reset.js - Guest:remove");
        var deferred = q.defer();
        guestModel.remove({}, function (err) {
            if (err) deferred.reject(err);
            deferred.resolve("removeGuestData finished");
        });
        return deferred.promise;
    };


    var insertData = function(){
        /*
        *   1) Insert 3 Rooms
        *   2) Insert 3 Guests
        *   3) Insert 3 Bookings with Room and GuestID
        * */
        var insertDataCounter = roomData.length + guestData.length;

        for(var i = 0; i < roomData.length; i++) {
            var testRoom = new roomModel(roomData[i]);
            testRoom.save(function (err, result) {
                if (err) console.log(err);
                console.log("reset.js - Room:saved");
                if(--insertDataCounter == 0) insertBookings();
            });
        }


        for(var i = 0; i < guestData.length; i++) {
            var testGuest = new guestModel(guestData[i]);
            testGuest.save(function (err, result) {
                if (err) console.log(err);
                console.log("reset.js - Guest:saved");
                if(--insertDataCounter == 0) insertBookings();
            });
        }
    };


    var findRoomId = function(bookingNr){
        var deferred = q.defer();
        roomModel.findOne({"number": (bookingNr)},"_id", function(err, result){
            if(err) deferred.reject(err);
            bookingData[bookingNr].room_id.push(result._id);
            deferred.resolve(bookingNr);
        });
        return deferred.promise;
    };

    var names = ["Dominik", "Thomas", "Markus"];
    var findGuestId = function(bookingNr) {
        var deferred = q.defer();
        guestModel.findOne({"first_name": names[bookingNr]}, "_id", function (err, result) {
            if(err) deferred.reject(err);
            bookingData[bookingNr].guest_id = result._id;
            deferred.resolve(bookingNr);
        });
        return deferred.promise;
    };

    var saveBookingCount = bookingData.length;
    var saveBooking = function(bookingNr) {
        var deferred = q.defer();

        var today = moment.utc();
        today.hour(12);
        today.minutes(00);
        today.seconds(00);
        today.milliseconds(0);

        console.log(today.valueOf());
        bookingData[bookingNr].arr = today.valueOf();
        bookingData[bookingNr].dep = today.valueOf();

        var testBooking = new bookingModel(bookingData[bookingNr]);
        testBooking.save(function (err, result) {
            if (err) deferred.reject(err);
            console.log("reset.js - Booking:saved");
            deferred.resolve();
            if(--saveBookingCount == 0) changeBookingTimes();
        });
        return deferred.promise;
    };

    var insertBookings = function(){

        for(var i = 0; i < bookingData.length; i++){
            findRoomId(i)
                .then(function(data){return findGuestId(data)})
                .then(function(data){return saveBooking(data)});
        };
    };


    var changeBookingTimes = function(){

        var d = moment.utc();
        d.hour(12);
        d.seconds(00);
        d.minutes(00);
        d.milliseconds(0);
        var days = [];
        for(var i = 0; i < 3; i++){
            days.push(moment(d).add(i, "day"));
        }
        bookingModel.find(function(err, result){
            if(err) console.log(err);
            for(var i = 0; i < result.length; i++) {
                result[i].arr = days[i].valueOf();
                result[i].dep = moment(days[i]).add(3,"day").valueOf();
                result[i].save(function (err, result) {
                    if (err) console.log(err);
                    console.log("geht");
                });
            }
            console.log(result.length);
        });

    };





    q.all([
        removeBookingData(),
        removeGuestData(),
        removeRoomData()
    ]).then(function(){
        console.log("remove:COMPLETE");
        insertData();
    });
});

