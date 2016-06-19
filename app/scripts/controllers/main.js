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
  .controller('MainCtrl', function ($scope) {
  	 var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
  	$scope.uiConfig = {
	    calendar: {
	        lang: 'es',
	        // height: 450,
	        axisFormat: 'h(:mm) a',
			timeFormat: 'h(:mm) a',
			defaultView: 'agendaWeek',
	        editable: true,
	        header: {
	           left: 'prev,today,next',
				center: 'title',
				right: 'agenda,agendaWeek,agendaDay',
	        }
	    }
	};
	
	$scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
    };
    /* event source that contains custom events on the scope */
    $scope.events = [
      {title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
    ];
    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
	}

	$scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
});
