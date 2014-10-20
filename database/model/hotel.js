var mongoose = require("mongoose");

var hotelSchema = mongoose.Schema({
    _id: {
        $oid: mongoose.Schema.ObjectId
    },
    name: String,
    plz: Number,
    city: String,
    address: String,
    logo: String,
    email: String,
    emailTemplate: String
});

module.exports = mongoose.model("hotel", hotelSchema);