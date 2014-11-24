angular.module('pro5_hzv.filters', []).filter('orderDate', [ '$moment' ,function($moment) {
    return function(input) {

    // if(input.$resolved) {
         var array = [];
         console.log(input);
         //var currentDay = input[0];
         //console.log(currentDay);


          angular.forEach(input, function(item) {
              var day = $moment(item.arr).day();
              //var counter = 0;
              if (array[day] != undefined) {
                  array[day][item._id] = item;

                  console.log(array[day]);
              }else {
                  var key = item._id;
                  var obj = {};
                  obj[key] = item;
                  array[day] = obj;
              }
              //array[day][counter] = {buffer: item};


          /*var arr = $moment(item.arr);
          if (arr.isSame(currentDay, "days")) {
          object[currentDay][counter++] = item;
          //counter++;
          } else {
              counter = 0;
          while (object[currentDay][counter]) {
              counter++;
          }
          //currentDay = input.arr;
          object[currentDay][counter] = item;
          }*/



          });
         console.log(array);
         return array;
     }
    //}
} ]);