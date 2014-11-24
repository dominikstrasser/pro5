var mongoose = require("mongoose");
var guestSchema = mongoose.Schema({
    _id: {
        $oid: mongoose.Schema.ObjectId
    },
    first_name: String,
    last_name: String,
    salutation: String,
    title: String,
    email: String,
    phone: String,
    plz: Number,
    city: String,
    address: String,
    country: String,
    interests: [String],
    note: String,
    birthday: { type: Date, default: Date.now },
    booking_id: [mongoose.Schema.ObjectId]
});

module.exports = mongoose.model("guest", guestSchema);