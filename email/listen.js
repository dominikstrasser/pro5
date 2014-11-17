var MailListener = require("mail-listener2");

var bookingModel = require("./../database/model/booking.js");
var cfg = require("./config.js");

var mailListener = new MailListener({
    username: cfg.user,
    password: cfg.password,
    host: cfg.host,
    port: cfg.port, // imap port
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    mailbox: "INBOX", // mailbox to monitor
    searchFilter: ["UNSEEN"], // the search filter being used after an IDLE notification has been retrieved
    markSeen: true, // all fetched email willbe marked as seen and not fetched next time
    fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
    mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
    attachments: true, // download attachments as they are encountered to the project directory
    attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
});



// stop listening


mailListener.on("server:connected", function(){
    console.log("imapConnected");
});

mailListener.on("server:disconnected", function(){
    console.log("imapDisconnected");
    mailListener.start();
});

mailListener.on("error", function(err){
    console.log(err);
});

var checkSubject = function(subj){

    var bId = subj.indexOf("Anfrage Nr. ");
    if(bId > -1){
        var strId = subj.substr(bId + 12,24);
        var mongoObjectId = new RegExp("^[0-9a-fA-F]{24}$");
        if(strId.match(mongoObjectId)) {
            console.log("GEHT");
            console.log(strId);
            return strId;
        }
    }
    return false;
};

mailListener.on("mail", function(mail, seqno, attributes){
    // do something with mail object including attachments

    var id = checkSubject(mail.headers.subject);
    if(id){
        var msg = {
            body : mail.html,
            from_guest : 1,
            subject : mail.headers.subject,
            date : mail.headers.date
        };
        bookingModel.findOneAndUpdate({"_id" : id},{$push: {"messages": msg}},function(err, result){
            if(err) console.log(err);
            console.log("Email wurde zu Buchung gespeichert");
        });
    }

    // mail processing code goes here
});


mailListener.on("attachment", function(attachment){
    console.log(attachment.path);
});

var contr = {

    start: function(){
        mailListener.start(); // start listening
    },
    stop: function(){
        mailListener.stop();
    },
    checkSubject: function(subj){
        return checkSubject(subj);
    }
};

module.exports = contr;


// it's possible to access imap object from node-imap library for performing additional actions. E.x.
//mailListener.imap.move(:msguids, :mailboxes, function(){})