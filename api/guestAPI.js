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

router.get("/:_id", function (req, res) {
    console.log("guestAPI - get : /:_id");
    console.log(req.params._id);
    guestModel.findOne({"_id" :req.params._id}, function (err, result) {
        if (err) throw new Error(err);
        res.json(result);
    });
});

router.post("/:_id", function (req, res) {
    console.log(req.params._id);

    delete req.body._id; // wichtig: ID kann man nicht updaten

    guestModel.findOneAndUpdate({"_id" : req.params._id}, req.body,
        function (err, result)
            {
                if (err) throw new Error(err);
                res.json(result);
            }
    );

});

module.exports = router;
