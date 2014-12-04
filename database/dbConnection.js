//
var mongoPath;
if(typeof process.env.MONGOLABPATH != "undefined") {
    mongoPath = process.env.MONGOLABPATH;
}else{
    mongoPath = require("./dbConfig.js");
}
var mongoose  = require("mongoose");
mongoose.connect(mongoPath);
var db = mongoose.connection;
db.on("error", function(err){console.log(err)});
module.exports = db;
