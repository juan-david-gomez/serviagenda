'use strict';

/**
 * @ngdoc function
 * @name firebaseAngularApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the firebaseAngularApp
 */
app
  .controller('LoginCtrl', function ($scope,auth,$state) {

  	var vm = this;

    vm.entrar = function() {
    		console.log($scope.user);
    	if ($scope.user) {
  		 	var promise = auth.logIn($scope.user);
  		 	promise.then(function  () {
  		 		$state.go('app.home');
  		 	}).catch(function(error) {
			  	console.error(error);
			});
    	}
    };

  });
