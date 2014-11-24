
var request = require("request");


var testBooking = {
    "status": 0,
    "person_count": 2,
    "room_count": 2,
    "room_id": [],
    "category": "HP",
    "messages": [
        {
            "date": 1413300202,
            "from_guest": 0,
            "subject": "booking nr 12345",
            "body": "here is my offer..."
        },
        {
            "date": 1413300202,
            "from_guest": 1,
            "subject": "booking nr 12345777777",
            "body": "Yoo, im taking the room"
        }
    ]
};

// Inserts a new Booking and checks the response.
// Inserted Booking has 2 more Keys (_id and v)

exports.testPostBooking = function(test){

    request({
        uri: "http://localhost:3000/api/bookings",
        method: "POST",
        form:testBooking
    }, function(error, response, body) {
        var b = JSON.parse(body);
        test.ok(Object.keys(testBooking).length + 2 == Object.keys(b).length,
            "Eingefügte Buchung != Response"
        );

        test.done();
    });


};