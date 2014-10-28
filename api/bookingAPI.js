var router = require("express").Router();
var bookingModel = require("./../database/model/booking.js");
var moment = require("moment");

var setTimeTo12 = function(d){
    d.hour(12);
    d.minutes(0);
    d.seconds(0);
    d.milliseconds(0);
};

router.get("/", function(req, res){
    console.log("bookingAPI : /");
    bookingModel.find(function(err,result){
        if(err) console.log(err);
        res.json(result);
    });
});

router.get("/getCurrentArrivals", function(req, res){
    console.log("bookingAPI : /getCurrentArrivals");
    var today = moment.utc();
    setTimeTo12(today);
    var tomorrow = moment.utc().add(7,"days");
    setTimeTo12(tomorrow);

    bookingModel.find()
        .where('arr').gte(today.valueOf()).lte(tomorrow.valueOf())
        .populate({
            path: "guest_id",
            select: "last_name"
        })
        .populate({
            path: "room_id",
            select: "number"
        })
        .select("arr salutation guest_id person_count room_id")
        .exec(function(err, result){
            if(err) console.log(err);
            //console.log(result);
            res.json(result);
        });

});

router.get("/getCurrentDepartures", function(req, res){
    var today = moment.utc();
    setTimeTo12(today);
    var tomorrow = moment.utc().add(7,"days");
    setTimeTo12(tomorrow);


    bookingModel.find()
        .where('dep').gte(today.valueOf()).lte(tomorrow.valueOf())
        .populate({
            path: "guest_id",
            select: "last_name"
        })
        .populate({
            path: "room_id",
            select: "number"
        })
        .select("dep salutation guest_id person_count room_id")
        .exec(function(err, result){
            if(err) console.log(err);
            res.json(result);
        });

});

router.post("/check", function(req, res){
    // !!! arr und dep kommen als ISO DATE rein!

    var reqArr = moment.utc(req.body.arr);
    var reqDep = moment.utc(req.body.dep);


    setTimeTo12(reqArr);
    setTimeTo12(reqDep);

    /*
    console.log(reqArr.toISOString());
    console.log(reqDep.toISOString());
    */
    //.where('arr').lte(reqDep.valueOf())
    if(typeof reqRoom === 'undefined'){
        console.log("ASDFASDFASDF");
    }
    /*
    * get all bookings earlier than the departure of the new booking
    * and find the bookings which departure later than the arrial of the new booking
    * this is the list of rooms which are not available
    * */
    bookingModel.find()
        .select("room_id")
        .where('arr').lt(reqDep)
        .where('dep').gt(reqArr)
        .exec(function(err, result){
        if(err) console.log(err);
        res.json(result);
        });
});


module.exports = router;
