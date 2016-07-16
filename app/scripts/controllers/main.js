'use strict';

/**
 * @ngdoc function
 * @name firebaseAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firebaseAngularApp
 http://www.jvandemo.com/learn-how-to-make-authentication-in-your-angular-applications-simpler-and-more-consistent/
 */
app
  .controller('MainCtrl', function ($scope,citas,session) {

    function getDayClass(data) {
      console.log(data);
        // var date = data.date,
        //   mode = data.mode;
        // if (mode === 'day') {
        //   var dayToCheck = new Date(date).setHours(0,0,0,0);

        //   for (var i = 0; i < $scope.events.length; i++) {
        //     var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        //     if (dayToCheck === currentDay) {
        //       return $scope.events[i].status;
        //     }
        //   }
        // }

      return 'hola';
    }

    $scope.options = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

  	$scope.uiConfig = {
  	    calendar: {
  	        lang: 'es',
  	        axisFormat: 'h(:mm) a',
      			timeFormat: 'h(:mm) a',
            height:'400px',
      			defaultView: 'agendaWeek',
      	    editable: false,
            allDaySlot: false,
      	    header: {
      	        left: 'prev,today,next',
      			   	center: 'title',
      				  right: 'agenda,agendaWeek,agendaDay',
  	        },
            views: {
                basic: {
                    // options apply to basicWeek and basicDay views
                },
                agenda: {
                    // options apply to agendaWeek and agendaDay views
                },
                week: {
                  columnFormat:'dddd D',
                    // options apply to basicWeek and agendaWeek views
                },
                day: {
                    // options apply to basicDay and agendaDay views
                }
            }

  	    }
  	};

    var citasList = citas.getCitas();
    citasList.then(function  (data) {
      data.forEach(function  (ob) {
        var newEvent = {
          title: ob.title,
          start: new Date(ob.start),
          end: new Date(ob.end),
        };
        $scope.events.push(newEvent);
      });
    });

    $scope.events = [];
    $scope.eventsF = function (start, end, timezone, callback) {
      callback($scope.events);
    };
    $scope.eventSources = [$scope.events,$scope.eventsF];
    
});
