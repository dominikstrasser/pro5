var router = require("express").Router();
var hotelModel = require("./../database/model/hotel.js");

router.get("/", function(req, res){
    console.log("hotelAPI : /");
    hotelModel.find(function(err,result){
        if(err) console.log(err);
        res.json(result);
    });

});

router.get("/dashboard", function(req, res){
    console.log("hotelAPI : /dashboard");
    hotelModel.find({}, 'name logo', function(err,result){
        if(err) console.log(err);
        res.json(result);
    });
});

module.exports = router;
