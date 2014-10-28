var router = require("express").Router();
var roomModel = require("./../database/model/room.js");
router.get("/", function (req, res) {
    console.log("roomAPI : /");
    roomModel.find(function (err, result) {
        if (err) throw new Error(err);
        res.json(result);
    });
});

router.get("/id", function (req, res) {
    console.log("roomAPI : /");
    roomModel.find({}, '_id', function (err, result) {
        if (err) throw new Error(err);
        res.json(result);
    });
});

module.exports = router;
