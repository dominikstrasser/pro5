//var mongoPath = require("./dbConfig.js");
var fs = require('fs');

var mongoPath = process.env.mongoPath;

if (fs.existsSync("../dbConfig.js")) {
    var mongoPath = require("./dbConfig.js")
}

var mongoose  = require("mongoose");
mongoose.connect(mongoPath);
var db = mongoose.connection;
db.on("error", function(err){console.log(err)});
module.exports = db;
