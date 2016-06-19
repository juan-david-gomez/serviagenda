'use strict';

/**
 * @ngdoc service
 * @name firebaseAngularApp.sessionService
 * @description
 * # sessionService
 * Service in the firebaseAngularApp.
 */
function sessionService($log, localStorage){
	/*jshint validthis: true */
    this._authData = JSON.parse(localStorage.getItem('session.authData'));
    this._userInfo = JSON.parse(localStorage.getItem('session.userInfo'));

    this.getAuthData = function(){
      return this._authData;
    };

    this.setAuthData = function(authData){
      this._authData = authData;
      localStorage.setItem('session.authData', JSON.stringify(authData));
      return this;
    };

    this.getAccessToken = function(){
      if(this._authData && this._authData.token){
        return this._authData.token;
      }
      return null;
    };

    this.destroy = function(){
      this.setAuthData(null);
      this.setUserInfo(null);
    };



    this.getUserInfo = function(){
      return this._userInfo;
    };

    this.setUserInfo = function(userInfo){
      this._userInfo = userInfo;
      localStorage.setItem('session.userInfo', JSON.stringify(userInfo));
      return this;
    };

}


  // Inject dependencies
sessionService.$inject = ['$log', 'localStorage'];

app
  .service('session', sessionService);
