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

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: cfg.user, // sender address
    to: 'strasserdominik@hotmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});