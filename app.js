var express = require("express");
var app = express();
var logger = require('morgan');
var path = require("path");

var port = process.env.PORT || 3000;

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var db = require("./database/dbConnection.js");
var routes = require("./routes/index.js");

//var emailListener = require("./email/listen.js");
//emailListener.start();
//app.use(logger('dev'));

db.once("open", function(){
    console.log("db open");
    var roomAPI = require("./api/roomAPI.js");
    var hotelAPI = require("./api/hotelAPI.js");
    var bookingAPI = require("./api/bookingAPI.js");
    var guestAPI = require("./api/guestAPI.js");
    var categoryAPI = require("./api/categoryAPI.js");
    //var emailAPI = require("./api/emailAPI.js");
    app.use("/api/rooms", roomAPI);
    app.use("/api/bookings", bookingAPI);
    app.use("/api/guests", guestAPI);
    app.use("/api/hotel", hotelAPI);
    app.use("/api/categories", categoryAPI);
    //app.use("/api/emails", emailAPI);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use("/",routes);


app.listen(port, function(){
console.log("Express server listening on port 3000");
});
