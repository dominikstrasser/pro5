var router = require("express").Router();
var bookingModel = require("./../database/model/booking.js");
var moment = require("moment");

var setTimeTo12 = function(d){
    d.hour(12);
    d.minutes(0);
    d.seconds(0);
    d.milliseconds(0);
};


function bookingDAO(){

    this.getBookings = function(req, res) {
        console.log("bookingAPI - getBookings");
        bookingModel.find(function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    };

    this.getBooking = function(req, res) {
        console.log("bookingAPI - getBooking");
        bookingModel.findById(req.params._id, function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    };

    this.postBooking = function(req, res) {
        console.log("bookingAPI - postBooking");

        var booking = new bookingModel(req.body);

        booking.save(function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    };

    this.putBooking = function(req, res) {
        console.log("bookingAPI - putBooking");
        bookingModel.findOneAndUpdate({"_id" : req.params._id}, req.body, function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    };

    this.deleteBooking = function(req, res) {
        console.log("bookingAPI - deleteBooking");
        bookingModel.remove({"_id" : req.params._id},function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    };

    this.check = function(req, res) {
        console.log("bookingAPI - check");
        // !!! arr und dep kommen als ISO DATE rein!
        var reqArr = moment.utc(req.query.arr.replace(/\"/g, ""));
        var reqDep = moment.utc(req.query.dep.replace(/\"/g, ""));

        setTimeTo12(reqArr);
        setTimeTo12(reqDep);

        if (typeof reqRoom === 'undefined') {
            console.log("reqRoom undefined");
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
            .exec(function (err, result) {
                if (err) console.log(err);
                res.json(result);
            });
    };

    this.getCurrentArrivals = function(req, res){
        console.log("bookingAPI : /getCurrentArrivals");

        var today = moment.utc(req.query.cArr);
        var maxDate = moment.utc(req.query.cArr).add(7,"days");
        //console.log(req.query.cArr);
        bookingModel.find()
            .where('arr').gte(today.valueOf()).lte(maxDate.valueOf())
            .populate({
                path: "guest_id",
                select: "salutation last_name"
            })
            .populate({
                path: "room_id",
                select: "number"
            })
            .select("arr dep category salutation guest_id person_count room_id")
            .exec(function(err, result){
                if(err) console.log(err);
                //console.log(result);
                res.json(result);
            });

    };
    this.getCurrentDepartures = function(req, res){
        console.log("bookingAPI : /getCurrentDepartures");
        var today = moment.utc();
        setTimeTo12(today);
        var tomorrow = moment.utc().add(7,"days");
        setTimeTo12(tomorrow);


        bookingModel.find()
            .where('dep').gte(today.valueOf()).lte(tomorrow.valueOf())
            .populate({
                path: "guest_id",
                select: "salutation last_name"
            })
            .populate({
                path: "room_id",
                select: "number"
            })
            .select("arr dep category salutation guest_id person_count room_id")
            .exec(function(err, result){
                if(err) console.log(err);
                res.json(result);
            });

    };

    this.detail = function(req, res){
        console.log("bookingAPI : /detail");

        var myQuery;
        //console.log(req.params._id);
        if(typeof req.params._id != 'undefined'){
            myQuery = bookingModel.find({'_id' : req.params._id});
        }else{
            myQuery = bookingModel.find();
        }

        if(req.query.status == 0 || req.query.status == 1){
            myQuery.where('status').equals(req.query.status);
        }

        myQuery
            .populate({
                path: "guest_id",
                select: "salutation last_name first_name email"
            })
            .populate({
                path: "room_id",
                select: "number"
            });
        myQuery.exec(function(err, result){
                if(err) console.log(err);
                //console.log(result);
                res.json(result);
            });

    };

    this.roomList = function(req, res){
        console.log("bookingAPI : /roomList");

        var myQuery;
            myQuery = bookingModel.find();

        if(typeof req.query.start != "undefined"){

            var start = moment(req.query.start).add(-7,"days");
            var end = moment(req.query.start).add(21,"days");
            myQuery.where('dep').gte(start.valueOf());
            myQuery.where('arr').lte(end.valueOf());
        }

        myQuery
            .populate({
                path: "guest_id",
                select: "salutation last_name first_name email"
            })
            .populate({
                path: "room_id",
                select: "number"
            });
        myQuery.exec(function(err, result){
            if(err) console.log(err);

            res.json(result);
        });

    };

}

var bookingDAO = new bookingDAO();

//Exact Routes before Parameterized routes!

//extra routes
router.get("/check",bookingDAO.check);
router.get("/getCurrentArrivals", bookingDAO.getCurrentArrivals);
router.get("/getCurrentDepartures", bookingDAO.getCurrentDepartures);
router.get("/detail", bookingDAO.detail);
router.get("/detail/:_id", bookingDAO.detail);
router.get("/roomList/", bookingDAO.roomList);


//typical CRUD
router.post("/",bookingDAO.postBooking);
router.get("/",bookingDAO.getBookings);
router.get("/:_id",bookingDAO.getBooking);
router.put("/:_id",bookingDAO.putBooking);
router.delete("/:_id",bookingDAO.deleteBooking);

module.exports = router;
