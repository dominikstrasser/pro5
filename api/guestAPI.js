var router = require("express").Router();
var guestModel = require("./../database/model/guest.js");
router.get("/", function (req, res) {
    console.log("guestAPI - get : /");
    guestModel.find(function (err, result) {
        if (err) throw new Error(err);
        res.json(result);
    });
});

router.post("/", function (req, res) {
    console.log("guestAPI - post : /");
    var guest = new guestModel(req.body);
    console.log(guest);
    guest.save(function (err, result) {
        if (err) throw new Error(err);
        res.json(result);
    });
});

module.exports = router;
