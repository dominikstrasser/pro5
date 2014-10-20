var router = require("express").Router();
var hotelModel = require("./../database/model/hotel.js");

router.get("/", function(req, res){
    console.log("hotelAPI : /");
    hotelModel.find(function(err,result){
        if(err) console.log(err);
        res.json(result);
    });

});

module.exports = router;
