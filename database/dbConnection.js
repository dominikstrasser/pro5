//var mongoPath = require("./dbConfig.js");
console.log(require("./dbConfig.js"));
var mongoPath = process.env.mongoPath | require("./dbConfig.js");
var mongoose  = require("mongoose");
mongoose.connect(mongoPath);
var db = mongoose.connection;
db.on("error", function(err){console.log(err)});
module.exports = db;
