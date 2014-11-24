var maillistener = require("./../email/listen.js");



exports.testEmailSubject = function(test){

    var e = maillistener.checkSubject("Anfrage Nr. 5469bebaa610319c85b78f7e");
    var ne1 = maillistener.checkSubject("Anfrage Nr. xyz");
    var ne2 = maillistener.checkSubject("Anfrage Nr. 5469beb aa610319c85b78f7e");
    var ne3 = maillistener.checkSubject("Anfrage Nr.  5469bebaa610319c85b78f7e");
    var ne4 = maillistener.checkSubject("Anfrage  5469bebaa610319c85b78f7e");
    var ne5 = maillistener.checkSubject("5469bebaa610319c85b78f7e");

    test.equal("5469bebaa610319c85b78f7e", e);
    test.notEqual("5469bebaa610319c85b78f7e", ne1);
    test.notEqual("5469bebaa610319c85b78f7e", ne2);
    test.notEqual("5469bebaa610319c85b78f7e", ne3);
    test.notEqual("5469bebaa610319c85b78f7e", ne4);
    test.notEqual("5469bebaa610319c85b78f7e", ne5);
    test.done();
};