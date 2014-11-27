var router = require("express").Router();
var guestModel = require("./../database/model/guest.js");


function guestDAO(){

    this.getGuests = function(req, res) {
        console.log("guestAPI - getGuests");
        guestModel.find(function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    };

    this.getGuest = function(req, res) {
        console.log("guestAPI - getGuest");
        guestModel.findById(req.params._id,function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    };

    this.postGuest = function(req, res) {
        console.log("guestAPI - postGuest");
        var guest = new guestModel(req.body);
        guest.save(function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    };

    this.putGuest = function(req, res) {
        console.log("guestAPI - putGuest");
        guestModel.findOneAndUpdate({"_id" : req.params._id}, req.body, function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    };

    this.deleteGuest = function(req, res) {
        console.log("guestAPI - deleteGuest");
        guestModel.remove({"_id" : req.params._id},function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    };

}

var guestDAO = new guestDAO();

//Exact Routes before Parameterized routes!

//extra routes

//typical CRUD
router.post("/",guestDAO.postGuest);
router.get("/",guestDAO.getGuests);
router.get("/:_id",guestDAO.getGuest);
router.put("/:_id",guestDAO.putGuest);
router.delete("/:_id",guestDAO.deleteGuest);

module.exports = router;
