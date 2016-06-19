'use strict';

/**
 * Auth Refenrece http://www.jvandemo.com/learn-how-to-make-authentication-in-your-angular-applications-simpler-and-more-consistent/
 * @ngdoc overview
 * @name firebaseAngularApp
 * @description
 * # firebaseAngularApp
 *
 * Main module of the application.
 */
 /*global app: true*/
var app = angular
  .module('firebaseAngularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'firebase',
    'ui.bootstrap',
    'ui.calendar'
  ]);
  app.constant('FIREBASE','https://testauthjuan.firebaseio.com/')
  .config(function ($stateProvider, $urlRouterProvider) {
   $stateProvider
      //Estados y rutas - App seccion  
      .state('app', {
        url: '/app',
        abstract: true,
        views: {
            'header': {
              templateUrl: 'views/layouts/header.html',
              controller: 'HeaderCtrl',
              controllerAs: 'vm'
            },
            'footer':{
              templateUrl: 'views/layouts/footer.html',
              // controller: 'FooterCtrl'
            },
        },
        params :{
          'menus':{
            'app.home':{
              'name' : 'Calendario',
              'href' : '#/app/',
            },
            'app.clientes':{
              'name' : 'Clientes',
              'href' : '#/app/clientes',
            }
          },
        }
      })
      
      .state('app.home', {
          url: '/',
          views: {
            '@': {
              templateUrl: 'views/main.html',
              controller: 'MainCtrl',
              controllerAs: 'vm'
            }
          },
          params: {
            'requireLogin': true, 
          },
      })

      //Estados y rutas - Root seccion  
      .state('root', {
        url: '',
        abstract: true,
        views: {
            'header': {
              templateUrl: 'views/layouts/header.html',
              // controller: 'HeaderCtrl'
            },
            'footer':{
              templateUrl: 'views/layouts/footer.html',
              // controller: 'FooterCtrl'
            },
        },
      })

      .state('root.login', {
        url: '/login',
        views: {
          '@': {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'vm'
          }
        },
        params: {
          'requireLogin': false,
        }, 
      })
      .state('root.registro', {
        url : '/registro',
        views: {
          '@': {
            templateUrl: 'views/registro.html',
            controller: 'RegistroCtrl',
            controllerAs: 'vm'
          }
        },
        params: {
          'requireLogin': false, 
        },
      });

    $urlRouterProvider.otherwise('/app/');
    
  }).run(function($rootScope, $location, $state, auth) {


    $rootScope.$on('$stateChangeStart', function(e, toState, toParams) {
      
        if(!toParams.requireLogin){
           return; // no need to redirect 
        }

        // now, redirect only not authenticated
        if(auth.isLoggedIn() === false) {
            e.preventDefault(); // stop current execution
            $state.go('root.login'); // go to login
        }
    });
});
