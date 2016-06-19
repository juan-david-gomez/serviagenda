'use strict';

/**
 * @ngdoc service
 * @name firebaseAngularApp.AuthService
 * @description
 * # AuthService
 * Service in the firebaseAngularApp.
 */
  function AuthService($q, $firebaseAuth, session, FIREBASE,usuarios){

    var ref = new Firebase(FIREBASE);
    var authObj = $firebaseAuth(ref);

    this.isLoggedIn = function(){
      return session.getAuthData() !== null;
    };

    this.logIn = function(user){
      return authObj.$authWithPassword({
          email: user.email,
          password: user.password
        })
        .then(
          function(authData){
            session.setAuthData(authData);

            var userInfo = usuarios.getUserInfo(authData.uid);
            
            return userInfo.then(function  (data) {
              session.setUserInfo(data);
              // console.log($q);
              return authData;
            });

          },
          function(error){
            return $q.reject(error);
          }
        );

    };

    this.logOut = function(){
      authObj.$unauth();
      session.destroy();
    };

    this.singIn = function(user) {
    	var self = this;
    	return authObj.$createUser({
			  email: user.email,
			  password: user.password
		}).then(function() {
			  return self.logIn(user);
		}).catch(function(error) {
			  return $q.reject(error);
		});
    };

  }

  // Inject dependencies
  AuthService.$inject = ['$q', '$firebaseAuth', 'session','FIREBASE','usuarios'];
  
app
  .service('auth', AuthService);
