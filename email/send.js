var nodemailer = require('nodemailer');
var cfg = require("./config.js");
// create reusable transporter object using SMTP transport


var transporter = nodemailer.createTransport({
    service: 'Hotmail',
    auth: {
        user: cfg.user,
        pass: cfg.password
    }
});

module.exports = transporter;