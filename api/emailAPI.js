var router = require("express").Router();

var bookingModel = require("./../database/model/booking.js");
var guestModel = require("./../database/model/guest.js");

var transporter = require("./../email/send.js");


router.post("/:_id", function (req, res) {
    console.log("emailAPI - post: /");

    var mailOptions = {
        from: "hotelzimmerverwaltung@gmail.com", // sender address
        to: 'strasserdominik@hotmail.com', // list of receivers
        subject: req.body.subject, // Subject line
        //text: req.body.body // plaintext body
        html: req.body.body // html body
    };


    transporter.sendMail(mailOptions, function(err, result){
       if(err) console.log(err);
        console.log("Email wurde versandt");
        req.body.from_guest = 0;
        bookingModel.findOneAndUpdate({"_id" : req.params._id},{$push: {"messages": req.body}},function(err, result){
           if(err) console.log(err);
            console.log("Email wurde zu Buchung gespeichert");
            res.status(200).end();
        });
    });
});


module.exports = router;
