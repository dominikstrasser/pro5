angular.module('pro5_hzv.roomListDirective',[])
    .directive('roomList', function($moment) {
    return {
        restrict: 'E',
        replace:true,
        template:"<div></div>",
        scope: {
            rooms: '=rooms',
            bookings: '=bookings',
            startday: '=startday',
            selectedRooms: '=selectedRooms',
            filteredRooms:'=filteredRooms'
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
                if(typeof n != 'undefined') {
                    scope.dataCounter++;
                }
            },true);

            scope.$watch("startday", function(n,o){
                if(typeof n != 'undefined') {
                    scope.dataCounter++;
                }
            },true);

            scope.$watch("dataCounter", function(n,o){
                if(n >= 4) {
                    start();
                }
            });

            scope.$watch("selectedRooms", function(n,o){

                if(typeof n != 'undefined') {

                }
            },true);

            scope.$watch("filteredRooms", function(n,o){

                if(typeof n != 'undefined') {
                    scope.dataCounter++;
                }
            },true);


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
                    roomNameWidth,

                    init,
                    renderHeader,
                    renderBody,
                    renderRoom,
                    renderBooking,
                    render,
                    filterRoom,
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
                    monthName.setAttribute("class", "rl_month");
                    rl_header.appendChild(monthName);

                    for(var i = 0; i < days.length; i++){
                        var d = document.createElement("span");
                        d.innerHTML = days[i];
                        rl_header.appendChild(d);
                    }
                };

                renderBooking = function(booking){


                    var rl_booking = document.createElement("span");

                    if (booking.status == 1) {
                        rl_booking.setAttribute("class", "rl_booking booked");
                    } else {
                        rl_booking.setAttribute("class", "rl_booking");
                    }
                    var bArr = $moment(booking.arr);
                    var bDep = $moment(booking.dep);

                    var duration = $moment.duration(bArr.diff(startDate));

                    //Anzahl der Tage vom Beginn der Ansicht bis zum "start" der Buchung (arrival)
                    var start = Math.round(duration.asDays());

                    //Anzahl der Tage zwischen Arrival und Departure
                    var end = $moment.duration(bDep.diff(bArr)).asDays();

                    var bLeft = (roomNameWidth + 12.5 + dayWidth * start);
                    var bWidth = end * dayWidth;
                    rl_booking.setAttribute("style", "left:" + bLeft + "px; width: " + bWidth + "px");
                    rl_booking.setAttribute("data-id", booking.guest_id._id);
                    if(typeof booking.guest_id.salutation == "undefined"){
                        rl_booking.innerHTML = booking.guest_id.last_name;
                    }else{
                        rl_booking.innerHTML = booking.guest_id.salutation + " " + booking.guest_id.last_name;
                    }


                    rl_booking.addEventListener("click", function (e) {
                        var id = e.target.getAttribute("data-id");
                    }, false);

                    return rl_booking;

                };
                renderRoom = function(room){

                    var rl_room = document.createElement("div");
                    rl_room.setAttribute("class", "rl_room");
                    var id = scope.selectedRooms.indexOf(room._id);
                    if(id != -1){
                        rl_room.classList.add("selectedRoom");
                    }
                    rl_room.setAttribute("data-id",room._id);
                    rl_room.addEventListener("click", function (e) {
                        var id = e.target.getAttribute("data-id");
                        var i = scope.selectedRooms.indexOf(id);
                        if(i == -1) {
                            scope.selectedRooms.push(id);
                            this.classList.add("selectedRoom");
                        }else{
                            scope.selectedRooms.splice(i, 1);
                            this.classList.remove("selectedRoom");
                        }
                        scope.$apply();
                    }, true);

                    var rl_roomName = document.createElement("span");
                    rl_roomName.setAttribute("class", "rl_roomName");


                    rl_roomName.innerHTML =  "<span class='type'>#" + room.number +"</span>" + room.name;
                    rl_room.appendChild(rl_roomName);
                    for(var j = 0; j < scope.bookings.length; j++) {
                        if (scope.bookings[j].room_id[0]._id == room._id) {
                        var rl_booking = renderBooking(scope.bookings[j]);
                        rl_room.appendChild(rl_booking);
                        }
                    }
                    return rl_room;
                };

                filterRoom = function(room_id) {
                    for (var i = 0; i < scope.filteredRooms.length; i++) {
                        if (room_id == scope.filteredRooms[i]){
                            return false;
                        }
                    }
                    return true;
                };


                renderBody = function(){
                    for(var i = 0; i < scope.rooms.length; i++){

                        if(scope.filteredRooms.length == 0){
                            var rl_room = renderRoom(scope.rooms[i]);
                            rl_body.appendChild(rl_room);
                        }
                        else{
                            if(filterRoom(scope.rooms[i]._id)){
                                var rl_room = renderRoom(scope.rooms[i]);
                                rl_body.appendChild(rl_room);
                            }
                        }
                    }
                };


                render = function(){
                    renderHeader();
                    renderBody();
                    markToday();

                    rl_wrapper.appendChild(rl_header);
                    rl_wrapper.appendChild(rl_body);
                    while (el[0].hasChildNodes()) {
                        el[0].removeChild(el[0].lastChild);
                    }
                    el[0].appendChild(rl_wrapper);
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
                    today.hour(12);

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
                    dayWidth = 30;
                    roomNameWidth = 230;
                    initDates();
                    initDaysArray();
                    render();

                };

                init();
            };
        }
    }
});