'use strict';

/**
 * @ngdoc function
 * @name firebaseAngularApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the firebaseAngularApp
 */
app
  .controller('HeaderCtrl', function ($scope,$stateParams,$state,session,auth) {

    var vm = this;
    angular.forEach($stateParams.menus, function  (obj,index) {

        if($state.current.name === index){
            obj.class='active';
            $stateParams.menus[index] = obj;            
        }
    });

  	$scope.menus = $stateParams.menus;
  	
    if (auth.isLoggedIn()) {

      $scope.isLoggedIn = auth.isLoggedIn(); 
      $scope.user = session.getUserInfo();
	   vm.salir = function() {
            auth.logOut();
            $state.go('root.login');
      };

    }
  });
