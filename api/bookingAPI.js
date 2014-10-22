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
    //console.log(moment.utc(req.body.dep));
    //console.log(moment(req.body.arr))
    var begin = moment(req.body.arr);
    var end = moment(req.body.dep);

    console.log(begin.toISOString());
    /*
    var reqArr = moment.utc(req.body.arr);
    var reqDep = moment.utc(req.body.dep);
    console.log(req.body.arr);
    console.log(req.body.dep);
    setTimeTo12(reqArr);
    setTimeTo12(reqDep);

    console.log(reqArr.toDate());
    console.log(reqDep.toDate());

    bookingModel.find()
        .where('arr').lte(reqArr.valueOf())
        .select("arr dep")
        .exec(function(err, result){
            if(err) console.log(err);
            res.json(result);
        });

*/
    res.send("OK");

});


module.exports = router;
