var q = require("q");
//var db = require('./dbConnection.js');
var moment = require('moment');

var mongoose = require("mongoose");

//mongoose.connect("mongodb://testUser:mtd_pro5@ds063859.mongolab.com:63859/pro5_hotel");
mongoose.connect('mongodb://localhost/pro5_hotel');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

var roomModel = require("./../model/room.js");
var bookingModel = require("./../model/booking.js");
var guestModel = require("./../model/guest.js");

var bookingData = require("./booking3000.json");



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
        var insertDataCounter = 3000;

        for(var i = 0; i < 3000; i++) {
            var testBooking = new bookingModel(bookingData);
            testBooking.save(function (err, result) {
                if (err) console.log(err);
                console.log("reset.js - Booking:saved");
                if(--insertDataCounter == 0){
                    var end = new Date();

                    process.exit();
                }
            });
        }
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

