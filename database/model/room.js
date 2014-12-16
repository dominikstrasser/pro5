var mongoose = require("mongoose");
var roomSchema = mongoose.Schema({
    _id: {
        $oid: mongoose.Schema.ObjectId
    },
    number: Number,
    name: String,
    s_beds: Number,
    d_beds: Number,
    price: Number,
    category: String,
    extra: [String]
});

module.exports = mongoose.model("room", roomSchema);