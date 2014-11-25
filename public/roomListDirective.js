angular.module('pro5_hzv.roomListDirective',[])
    .directive('roomList', function($moment) {
    return {
        restrict: 'E',
        replace:true,
        template:"<div></div>",
        scope: {
            rooms: '=rooms',
            bookings: '=bookings',
            startday: '=startday'
        },
        link: function(scope, element, attrs) {
            // again we need the native object
            var el = element;

            scope.dataCounter = 0;
            scope.$watch("rooms", function(n,o){

                if(typeof n != 'undefined') {
                    scope.dataCounter++;
                }
            },true);
            scope.$watch("bookings", function(n,o){
                console.log("bookings");
                if(typeof n != 'undefined') {
                    scope.dataCounter++;
                }
            },true);

            scope.$watch("startday", function(n,o){
                //console.log("ROOMS")
                //console.log(n);
                if(typeof n != 'undefined') {
                    scope.dataCounter++;
                }
            },true);

            scope.$watch("dataCounter", function(n,o){
                if(n >= 3) {
                    start();
                }
            });


            //start wird aufgerufen nachdem startday, bookings und rooms geladen wurden
            var start = function() {

                var rl_wrapper,
                    rl_header,
                    rl_body,
                    rl_room,
                    rl_booking,
                    days,
                    today,
                    startDate,
                    dayWidth,

                    init,
                    renderHeader,
                    renderBody,
                    renderBooking,
                    render,
                    initDaysArray,
                    initDates,
                    markToday,
                    monthAsWord;


                //Erstellt Array mit den Datums von -7 Tage bis + 23 Tage
                initDaysArray = function () {
                    var helpDate = $moment(startDate);
                    for (var i = 0; i < 30; i++) {
                        days.push(new Object(helpDate.date()));
                        helpDate.add(1, "days");
                    }
                };

                monthAsWord = function(x){
                    var months = [
                        "Jänner",
                        "Februar",
                        "März",
                        "April",
                        "Mai",
                        "Juni",
                        "Juli",
                        "August",
                        "September",
                        "Oktober",
                        "November",
                        "Dezember"];

                    return months[x];
                };


                renderHeader = function(){
                    var monthName = document.createElement("span");
                    monthName.innerHTML = monthAsWord(startDate.month());
                    monthName.setAttribute("class", "rl_roomName");
                    rl_header.appendChild(monthName);

                    for(var i = 0; i < days.length; i++){
                        var d = document.createElement("span");
                        d.innerHTML = days[i];
                        rl_header.appendChild(d);
                    }
                };

                renderBooking = function(arr, dep){
                    var rl_booking = document.createElement("span");
                    rl_booking.setAttribute("class", "rl_booking");
                    var bArr = $moment(arr);
                    var bDep = $moment(dep);
                    var duration = $moment.duration(bArr.diff(startDate));

                    //Anzahl der Tage vom Beginn der Ansicht bis zum "start" der Buchung (arrival)
                    var start = Math.round(duration.asDays());

                    //Anzahl der Tage zwischen Arrival und Departure
                    var end = $moment.duration(bDep.diff(bArr)).asDays();

                    var bLeft = (100 - 12.5 + dayWidth*start);
                    var bWidth = end*dayWidth;
                    rl_booking.setAttribute("style", "left:"+ bLeft +"px; width: "+ bWidth +"px");
                    return rl_booking;
                };


                renderBody = function(){
                    for(var i = 0; i < scope.rooms.length; i++){
                        var rl_room = document.createElement("div");
                        rl_room.setAttribute("class", "rl_room");
                        var roomName = document.createElement("span");
                        roomName.setAttribute("class", "rl_roomName");
                        roomName.innerHTML = scope.rooms[i].name;

                        for(var j = 0; j < scope.bookings.length; j++) {
                            if(scope.bookings[j].room_id[0]._id == scope.rooms[i]._id) {
                                var rl_booking = renderBooking(scope.bookings[j].arr, scope.bookings[j].dep);
                                rl_booking.innerHTML = scope.bookings[j].guest_id.last_name;
                                rl_room.appendChild(rl_booking);
                            }
                        }


                        rl_room.appendChild(roomName);
                        rl_body.appendChild(rl_room);
                    }
                };


                render = function(){
                    renderHeader();
                    renderBody();
                    markToday();

                    rl_wrapper.appendChild(rl_header);
                    rl_wrapper.appendChild(rl_body);
                    el.html(rl_wrapper.outerHTML);
                };

                markToday = function(){
                    var duration = $moment.duration(today.diff(startDate));
                    var t = Math.round(duration.asDays());
                    //Wenn die Dauer von t (also Start Datum der Anzeige - Heute) ...
                    if(t >=0 && t <=30){
                        rl_header.childNodes[t+1].setAttribute("class", "today")
                    }



                };

                initDates = function(){
                    today = $moment();
                    today.millisecond(0);
                    today.second(0);
                    today.minute(0);
                    today.utc().hour(12);

                    startDate = moment.utc([
                        scope.startday.year(),
                        scope.startday.month(),
                        scope.startday.date(),
                        12, 0, 0, 0]);

                    startDate.add(-7, "days");

                };

                init = function(){
                    rl_wrapper = document.createElement("div");
                    rl_wrapper.setAttribute("class", "rl_wrapper");
                    rl_header = document.createElement("div");
                    rl_header.setAttribute("class", "rl_header");
                    rl_body = document.createElement("div");
                    rl_body.setAttribute("class", "rl_body");

                    //Tage im Header -> 30 Tage
                    days = [];
                    dayWidth = 25;
                    initDates();
                    initDaysArray();
                    render();

                };

                init();
            };
        }
    }
});