'use strict';

/**
 * @ngdoc service
 * @name firebaseAngularApp.citas
 * @description
 * # usuarios
 * Factory in the firebaseAngularApp.
 */
app
  .factory('citas', function ($firebaseObject, FIREBASE) {
    
    var ref = new Firebase(FIREBASE+'citas');
    

    // Public API here
    return {
      registerCitas: function (citasScope) {
        // console.log(uid);
        var citas = angular.copy(citasScope);
        angular.forEach(citas,function  (val,key) {
          if(val instanceof Date){
            citas[key] = val.getTime();
          }
        })

        console.log(ref.push(citas));
        return true;
        
      },
      getCitas: function  () {

        var citas = $firebaseObject(ref);
        return citas;

      }

    };
  });
