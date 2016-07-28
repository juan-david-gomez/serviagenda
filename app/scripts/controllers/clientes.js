'use strict';

/**
 * @ngdoc function
 * @name firebaseAngularApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the firebaseAngularApp
 */
app
  .controller('clientesCtrl', function ($scope,auth,$state) {

  	var vm = this;

    $scope.$on('modal.closing', function(event, reason, closed){
        console.log(event);
        console.log(reason);
        console.log(closed);
        if(false)
            event.preventDefault(); //You can use this to prevent the modal from closing            
        else
           $state.go('app.clientes');        
    });

    $scope.cancel = function  () {
        $scope.$close("calcel");
    }
    $scope.save = function  () {
        
    }

  });
