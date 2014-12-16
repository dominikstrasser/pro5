var router = require("express").Router();
var roomModel = require("./../database/model/room.js");
var categoryModel = require("./../database/model/category.js");


function roomDAO(){

    this.getRooms = function(req, res) {
        console.log("roomAPI - getRooms");
        roomModel.find(function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    };

    this.getRoom = function(req, res) {
        console.log("roomAPI - getRoom");
        roomModel.findById(req.params._id,function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    };

    this.postRoom = function(req, res) {
        console.log("roomAPI - postRoom");
        var room = new roomModel(req.body);
        room.save(function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    };

    this.putRoom = function(req, res) {
        console.log("roomAPI - putRoom");
        roomModel.findOneAndUpdate({"_id" : req.params._id}, req.body, function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    };

    this.deleteRoom = function(req, res) {
        console.log("roomAPI - deleteRoom");
        roomModel.remove({"_id" : req.params._id},function (err, result) {
            if (err) console.log(err);
            res.json(result);
        });
    };


}

var roomDAO = new roomDAO();

//Exact Routes before Parameterized routes!

//extra routes

//typical CRUD
router.post("/",roomDAO.postRoom);
router.get("/",roomDAO.getRooms);
router.get("/:_id",roomDAO.getRoom);
router.put("/:_id",roomDAO.putRoom);
router.delete("/:_id",roomDAO.deleteRoom);

module.exports = router;
