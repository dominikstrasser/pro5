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

router.get("/:guestId", function (req, res) {
    console.log("guestAPI - get : /:guestId");

    console.log(req.params.guestId);

    guestModel.find({"_id" :req.params.guestId}, function (err, result) {
        if (err) throw new Error(err);
        res.json(result);
    });
});

module.exports = router;
