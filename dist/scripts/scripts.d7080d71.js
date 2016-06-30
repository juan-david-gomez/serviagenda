"use strict";function AuthService(a,b,c,d,e){var f=new Firebase(d),g=b(f);this.isLoggedIn=function(){return null!==c.getAuthData()},this.logIn=function(b){return g.$authWithPassword({email:b.email,password:b.password}).then(function(a){var b=e.getUserInfo(a.uid);return b.then(function(b){return c.setAuthData(a),c.setUserInfo(b),a})},function(b){return a.reject(b)})},this.logOut=function(){g.$unauth(),c.destroy()},this.singIn=function(b){var c=this;return g.$createUser({email:b.email,password:b.password}).then(function(){return c.logIn(b)})["catch"](function(b){return a.reject(b)})}}function sessionService(a,b){this._authData=JSON.parse(b.getItem("session.authData")),this._userInfo=JSON.parse(b.getItem("session.userInfo")),this.getAuthData=function(){return this._authData},this.setAuthData=function(a){return this._authData=a,b.setItem("session.authData",JSON.stringify(a)),this},this.getAccessToken=function(){return this._authData&&this._authData.token?this._authData.token:null},this.destroy=function(){this.setAuthData(null),this.setUserInfo(null)},this.getUserInfo=function(){return this._userInfo},this.setUserInfo=function(a){return this._userInfo=a,b.setItem("session.userInfo",JSON.stringify(a)),this}}function localStorageServiceFactory(a){if(a.localStorage)return a.localStorage;throw new Error("Local storage support is needed")}var app=angular.module("firebaseAngularApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.router","firebase","ui.bootstrap","ui.calendar"]);app.constant("FIREBASE","https://serviagendaref.firebaseio.com/").config(["$stateProvider","$urlRouterProvider",function(a,b){a.state("app",{url:"/app","abstract":!0,views:{header:{templateUrl:"views/layouts/header.html",controller:"HeaderCtrl",controllerAs:"vm"},footer:{templateUrl:"views/layouts/footer.html"}},params:{menus:{"app.home":{name:"Calendario",href:"#/app/"},"app.clientes":{name:"Clientes",href:"#/app/clientes"}}}}).state("app.home",{url:"/",views:{"@":{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"vm"}},params:{requireLogin:!0}}).state("root",{url:"","abstract":!0,views:{header:{templateUrl:"views/layouts/header.html"},footer:{templateUrl:"views/layouts/footer.html"}}}).state("root.login",{url:"/login",views:{"@":{templateUrl:"views/login.html",controller:"LoginCtrl",controllerAs:"vm"}},params:{requireLogin:!1}}).state("root.registro",{url:"/registro",views:{"@":{templateUrl:"views/registro.html",controller:"RegistroCtrl",controllerAs:"vm"}},params:{requireLogin:!1}}),b.otherwise("/app/")}]).run(["$rootScope","$location","$state","auth",function(a,b,c,d){a.$on("$stateChangeStart",function(a,b,e){e.requireLogin&&d.isLoggedIn()===!1&&(a.preventDefault(),c.go("root.login"))})}]),app.controller("MainCtrl",["$scope","citas","session",function(a,b,c){a.uiConfig={calendar:{lang:"es",axisFormat:"h(:mm) a",timeFormat:"h(:mm) a",defaultView:"agendaWeek",editable:!0,header:{left:"prev,today,next",center:"title",right:"agenda,agendaWeek,agendaDay"}}};var d=b.getCitas();d.then(function(b){b.forEach(function(b){var c={title:b.title,start:new Date(b.start),end:new Date(b.end)};a.events.push(c)})}),a.events=[],a.eventsF=function(b,c,d,e){e(a.events)},a.eventSources=[a.events,a.eventsF],a.newEvent={title:"",start:"",end:""},a.addEvent=function(){a.newEvent.userId=c.getAuthData().uid,a.events.push(a.newEvent),b.registerCitas(a.newEvent),a.newEvent={title:"",start:"",end:""}}}]),app.controller("LoginCtrl",["$scope","auth","$state",function(a,b,c){var d=this;d.entrar=function(){if(console.log(a.user),a.user){var d=b.logIn(a.user);d.then(function(){c.go("app.home")})["catch"](function(a){console.error(a)})}}}]),app.controller("RegistroCtrl",["$scope","auth","$state","usuarios",function(a,b,c,d){var e=this;e.registrar=function(){if(a.user){var e=b.singIn(a.user);e.then(function(b){console.log(b);var e={nombre:a.user.nombre};d.registerUser(b.uid,e),c.go("app.home")})["catch"](function(a){console.log(a)})}}}]),app.controller("HeaderCtrl",["$scope","$stateParams","$state","session","auth",function(a,b,c,d,e){var f=this;angular.forEach(b.menus,function(a,d){c.current.name===d&&(a["class"]="active",b.menus[d]=a)}),a.menus=b.menus,e.isLoggedIn()&&(a.isLoggedIn=e.isLoggedIn(),a.user=d.getUserInfo(),f.salir=function(){e.logOut(),c.go("root.login")})}]),AuthService.$inject=["$q","$firebaseAuth","session","FIREBASE","usuarios"],app.service("auth",AuthService),sessionService.$inject=["$log","localStorage"],app.service("session",sessionService),localStorageServiceFactory.$inject=["$window"],app.factory("localStorage",localStorageServiceFactory),app.factory("usuarios",["$firebaseArray","FIREBASE",function(a,b){var c=new Firebase(b+"usuarios");return{registerUser:function(a,b){return c.child(a).set(b)},getUserInfo:function(b){var d=a(c);return d.$loaded().then(function(a){return a.$getRecord(b)})}}}]),app.factory("citas",["$firebaseArray","FIREBASE",function(a,b){var c=new Firebase(b+"citas");return{registerCitas:function(a){var b=angular.copy(a);return angular.forEach(b,function(a,c){a instanceof Date&&(b[c]=a.getTime())}),console.log(c.push(b)),!0},getCitas:function(){var b=a(c);return b.$loaded()}}}]),angular.module("firebaseAngularApp").run(["$templateCache",function(a){a.put("views/layouts/footer.html",'<div class="container"> <p><span class="glyphicon glyphicon-heart"></span> from the Yeoman team</p> </div>'),a.put("views/layouts/header.html",'<div class="navbar navbar-default" role="navigation"> <div class="container"> <div class="navbar-header"> <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#js-navbar-collapse"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#/">ServiAgenda</a> </div> <div class="collapse navbar-collapse" id="js-navbar-collapse"> <!-- TODO: Hacer que se active el dropdown para mostrar acciones del usuario en session --> <ul class="nav navbar-nav"> <li class="{{menu.class}}" ng-repeat="menu in menus"> <a href="{{menu.href}}">{{menu.name}}</a> </li> </ul> <ul class="nav navbar-nav navbar-right" ng-if="isLoggedIn"> <li uib-dropdown> <a id="single-button" role="button" uib-dropdown-toggle> {{user.nombre}} <span class="caret"></span> </a> <ul class="dropdown-menu" uib-dropdown-menu role="menu" aria-labelledby="single-button"> <li role="menuitem"><a href="#" ng-click="vm.salir()">Cerrar Sesión</a></li> </ul> </li> </ul> </div> </div> </div>'),a.put("views/login.html",'<h1>Login</h1> <div class="well container"> <form class="form-signin" role="form" ng-submit="vm.entrar()"> <input type="email" class="form-control" placeholder="Email" ng-model="user.email" required autofocus> <br> <input type="password" class="form-control" placeholder="Password" ng-model="user.password" required> <br> <input type="submit" class="btn btn-success col-xs-12" value="Entrar"> <a class="btn btn-default col-xs-12" ui-sref="root.registro">Registrate aquí</a> </form> </div>'),a.put("views/main.html",'<div class="contariner-fluid"> <div class="col-md-4"> <div class="panel panel-default"> <div class="panel-body"> <form ng-submit="addEvent()"> <input required ng-model="newEvent.title" type="text" placeholder="Title"> <input required type="datetime-local" ng-model="newEvent.start"> <input required type="datetime-local" ng-model="newEvent.end"> <input type="submit" value="Add"> </form> </div> </div> </div> <div class="col-md-8"> <div class="panel panel-default"> <div class="panel-body"> <div ui-calendar="uiConfig.calendar" ng-model="eventSources"></div> </div> </div> </div> </div>'),a.put("views/registro.html",'<h1>Registro</h1> <div class="well"> <form class="form-signin" role="form" ng-submit="vm.registrar()"> <input type="text" class="form-control" placeholder="Nombre" ng-model="user.nombre" required> <br> <input type="email" class="form-control" placeholder="Email" ng-model="user.email" required autofocus> <br> <input type="password" class="form-control" placeholder="Clave" ng-model="user.password" required> <br> <a class="btn btn-default" ui-sref="root.login">Cancelar</a> <input type="submit" class="btn btn-success" value="Registrarse"> </form> </div>')}]);