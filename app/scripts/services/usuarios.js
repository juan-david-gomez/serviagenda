'use strict';

/**
 * @ngdoc service
 * @name firebaseAngularApp.usuarios
 * @description
 * # usuarios
 * Factory in the firebaseAngularApp.
 */
app
  .factory('usuarios', function ($firebaseArray, FIREBASE) {
    
    var ref = new Firebase(FIREBASE+'usuarios');
    

    // Public API here
    return {
      registerUser: function (uid,userInfo) {
        // console.log(uid);
        return ref.child(uid).set(userInfo);
        
      },
      getUserInfo: function  (uid) {

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
