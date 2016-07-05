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
     /* event source that contains custom events on the scope */
     // $scope.events = [
     //   {title: 'All Day Event',start: new Date(y, m, d,1,10),end: new Date(y,m,d,3,16)},
     //   // {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
     //   // {title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
     //   // {title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
     //   // {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
     //   // {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
     // ];
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

    /*
    $scope.newEvent = {
      title: '',
      start: '',
      end: ''
    };

    $scope.addEvent = function(){
      $scope.newEvent.userId = session.getAuthData().uid;
      $scope.events.push($scope.newEvent);
      citas.registerCitas($scope.newEvent);

      $scope.newEvent = {
        title: '',
        start: '',
        end: ''
      };
    };
    */
});
