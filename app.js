var express = require("express");
var app = express();

var path = require("path");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var db = require("./database/dbConnection.js");
var routes = require("./routes/index.js");

//ASDFASDF
// yihhaaaaaa

db.once("open", function(){
    console.log("db open");
    var roomAPI = require("./api/roomAPI.js");
    var hotelAPI = require("./api/hotelAPI.js");
    var bookingAPI = require("./api/bookingAPI.js");
    var guestAPI = require("./api/guestAPI.js");
    app.use("/api/room", roomAPI);
    app.use("/api/booking", bookingAPI);
    app.use("/api/guest", guestAPI);
    app.use("/api/hotel", hotelAPI);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use("/",routes);


app.listen(3000, function(){
console.log("Express server listening on port 3000");
});