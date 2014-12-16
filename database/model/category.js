var mongoose = require("mongoose");
var categorySchema = mongoose.Schema({
    _id: {
        $oid: mongoose.Schema.ObjectId
    },
    name: String,
    prices: [{
        type : String,
        price: Number
    }]
});

module.exports = mongoose.model("category", categorySchema);