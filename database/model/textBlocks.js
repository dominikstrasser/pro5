var mongoose = require("mongoose");

var textBlockSchema = mongoose.Schema({
    _id: {
        $oid: mongoose.Schema.ObjectId
    },
    category: String,
    name: String,
    text: String
});

module.exports = mongoose.model("textBlock", textblockSchema);