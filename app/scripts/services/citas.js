'use strict';

/**
 * @ngdoc service
 * @name firebaseAngularApp.citas
 * @description
 * # usuarios
 * Factory in the firebaseAngularApp.
 */
app
  .factory('citas', function ($firebaseArray, FIREBASE) {
    
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

        var fire = $firebaseArray(ref);
        // console.log()
        console.log(ref.push(citas));
        return true;
        // return false;
        
      },
      getCitas: function  (uid) {

        // var userInfo = $firebaseArray(ref.child(uid));
        var userInfo = $firebaseArray(ref);

        return userInfo.$loaded()
              .then(function (arr) 
              {
                // console.log(arr.$getRecord(uid)); 
                // delete userInfo["$$conf"];
                return arr.$getRecord(uid);
              });
      }

    };
  });
