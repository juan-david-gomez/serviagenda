'use strict';

/**
 * @ngdoc function
 * @name firebaseAngularApp.controller:RegistroCtrl
 * @description
 * # RegistroCtrl
 * Controller of the firebaseAngularApp
 */
app
  .controller('RegistroCtrl', function ($scope,auth,$state,usuarios) {

  	var vm = this;

    vm.registrar = function() {
    	if ($scope.user) {
  		 	var promise = auth.singIn($scope.user);
  		 	promise.then(function  (data) {
  		 		console.log(data);
  		 		var userInfo = {
  		 			nombre : $scope.user.nombre,
  		 		};
  		 		usuarios.registerUser(data.uid,userInfo);
  		 		
  		 		$state.go('app.home');
  		 	}).catch(function(error) {
  		 	  //TODO: caprturar el error y mostrarlo al usuario 
			  console.log(error);
			});
    	}
    };
  });
