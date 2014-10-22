var mongoose = require("mongoose");
var BookingSchema = mongoose.Schema({
    _id: {
        $oid: mongoose.Schema.ObjectId
    },
    status: Number,
    arr: Date,
    dep: Date,
    person_count: Number,
    room_count: Number,
    room_id: [{type:mongoose.Schema.ObjectId, ref:"room"}],
    flat_rate: {type:mongoose.Schema.ObjectId, ref:"guest"},
    category: String,
    guest_id: {type:mongoose.Schema.ObjectId, ref:"guest"},
    message: [
        {
            date: Date,
            from_guest: Number,
            subject: String,
            body: String
        }
    ]
});

module.exports = mongoose.model("booking", BookingSchema);