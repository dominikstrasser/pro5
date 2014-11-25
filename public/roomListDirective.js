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
            });
            scope.$watch("bookings", function(n,o){
                if(typeof n != 'undefined') {
                    scope.dataCounter++;
                }
            });

            scope.$watch("startday", function(n,o){
                console.log("startday");
                console.log(n);
                if(typeof n != 'undefined') {
                    scope.dataCounter++;
                }
            });

            scope.$watch("dataCounter", function(n,o){
                if(n == 3) {
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

                    init,
                    renderHeader,
                    renderBody,
                    render,
                    initDaysArray,
                    markToday;



                //Erstellt Array mit den Datums von -7 Tage bis + 23 Tage
                initDaysArray = function () {
                    scope.startday.add(-7, "days");
                    for (var i = 0; i < 30; i++) {
                        days.push(new Object(scope.startday.add(1, "days").date()));
                    }
                };


                renderHeader = function(){
                    var monthName = document.createElement("span");
                    monthName.innerHTML = today.month();
                    monthName.setAttribute("class", "rl_roomName");
                    rl_header.appendChild(monthName);

                    for(var i = 0; i < days.length; i++){
                        var d = document.createElement("span");
                        if(i == 6){
                            d.setAttribute("class", "today");
                        }
                        d.innerHTML = days[i];
                        rl_header.appendChild(d);
                    }
                };


                renderBody = function(){
                    for(var i = 0; i < scope.rooms.length; i++){
                        var rl_room = document.createElement("div");
                        rl_room.setAttribute("class", "rl_room");
                        var roomName = document.createElement("span");
                        roomName.setAttribute("class", "rl_roomName");
                        roomName.innerHTML = scope.rooms[i].name;

                        for(var j = 0; j < scope.bookings.length; j++) {

                            if(scope.bookings[j].room_id == scope.rooms[i]._id) {
                                var rl_booking = document.createElement("span");
                                rl_booking.setAttribute("class", "rl_booking");
                                var bArr = $moment(scope.bookings[j].arr);
                                var bDep = $moment(scope.bookings[j].dep);
                                var duration = $moment.duration(bArr.diff(startDate));
                                //days ist arrival
                                var start = Math.round(duration.asDays());

                                var end = $moment.duration(bDep.diff(bArr)).asDays();

                                var bLeft = (100 - 12.5 + 25*start);
                                var bWidth = end*25;
                                rl_booking.setAttribute("style", "left:"+ bLeft +"px; width: "+ bWidth +"px");
                                rl_booking.innerHTML = scope.bookings[j].guest_id;
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
                    rl_wrapper.appendChild(rl_header);
                    rl_wrapper.appendChild(rl_body);
                    el.html(rl_wrapper.outerHTML);
                };

                markToday = function(){
                    console.log(rl_header.childNodes);
                };


                init = function(){
                    rl_wrapper = document.createElement("div");
                    rl_wrapper.setAttribute("class", "rl_wrapper");
                    rl_header = document.createElement("div");
                    rl_header.setAttribute("class", "rl_header");
                    rl_body = document.createElement("div");
                    rl_body.setAttribute("class", "rl_body");

                    days = [];
                    today = $moment();

                    startDate = moment.utc([
                        today.year(),
                        today.month(),
                        today.date(),
                        12, 0, 0, 0]);

                    startDate.add(-7, "days");

                    initDaysArray();
                    markToday();
                    render();
                };

                init();
            };
        }
    }
});