angular.module('pro5_hzv.dashboardFormDirective',[])
    .directive('dashboardForm', function($moment) {
        return {
            restrict: 'E',
            replace:true,
            templateUrl:'temp/dashboard-form.html',
            scope: {
                data : '=',
                completeDataSet : '=',
                handleSubmit: '&'
            },
            controller: function($scope) {

                //$scope.guests = guestProvider.query();
                $scope.requestForm = {};

                if($scope.data !== undefined){ // if input is given use input
                    $scope.requestForm = $scope.data;

                }else{ // use standard values
                    $scope.requestForm.email = '';// This will hold the selected item
                    $scope.requestForm.last_name = ''; // This will hold the selected item
                    $scope.requestForm.status =  0;
                    $scope.requestForm.person_count = 1;
                    $scope.requestForm.room_count =  1;
                    $scope.requestForm.doubleRoom_count = 1;
                    $scope.requestForm.room_id = [];
                    $scope.requestForm.category = "NF";
                }


                $scope.emailerror = true;

                $scope.onItemSelected = function(selectedItem) { // this gets executed when an item is selected
                    if($scope.requestForm.last_name) $scope.requestForm.email = selectedItem['email'];
                    if($scope.requestForm.email) $scope.requestForm.last_name = selectedItem['last_name'];

                };

                $scope.testBooking = function(form){
                    console.log("testbookin");
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    //return re.test(email);
                    if(re.test($scope.requestForm.email)){
                        $scope.emailerror = false;
                    }

                    if(form.$valid && !$scope.emailerror){

                        var arr = moment.utc([
                            $scope.requestForm.arr.getFullYear(),
                            $scope.requestForm.arr.getMonth(),
                            $scope.requestForm.arr.getDate(),
                            12, 0, 0, 0]);

                        var dep = moment.utc([
                            $scope.requestForm.dep.getFullYear(),
                            $scope.requestForm.dep.getMonth(),
                            $scope.requestForm.dep.getDate(),
                            12, 0, 0, 0]);

                        //console.log(arr);

                        $scope.requestForm.arr = arr.toDate();
                        $scope.requestForm.dep = dep.toDate();
                        //console.log($scope.requestForm);
                        $scope.handleSubmit({form : $scope.requestForm});
                        //bookingProvider.save($scope.requestForm);
                    };

                };
            }
        }
    });