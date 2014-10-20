var router = require("express").Router();
var guestModel = require("./../database/model/guest.js");
router.get("/", function (req, res) {
    console.log("guestAPI : /");
    guestModel.find(function (err, result) {
        if (err) throw new Error(err);
        res.json(result);
    });
});

module.exports = router;
