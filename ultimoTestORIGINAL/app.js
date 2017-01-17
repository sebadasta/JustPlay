(function () {
	var app = angular.module('helloApp', ['ui.router','ngHello','angular-storage']);

	app.config( function($stateProvider, $urlRouterProvider, helloProvider) {
		helloProvider.init({
			facebook: '728098144022836',
			google: "769395586214-jni7dp75c9nj18edh7louk47a6uj6bef.apps.googleusercontent.com"
		}, {redirect_uri: 'redirect.html'});


		$urlRouterProvider.otherwise("/");

		$stateProvider.state('login', {
			url: "/",
			templateUrl: "home.html",
			controller: "LoginController"
		})

		.state('test', {
			url: "/test",
			templateUrl: "test.html",
			controller: "TestController"
		})

		.state('home', {
			url: "/login",
			template: "home.html"
		})
		.state('dashBoard', {
			url: "/dashBoard",
			template: "<button>yyy</button>"

		});
	});

	app.run(function($rootScope, store, hello, $timeout) {
		$rootScope.user = null;
		$rootScope.$on('$locationChangeStart', function() {

			var user = store.get('user');

			if (user) {
				//Very Important for redirecting if User is logged
				$rootScope.user = user;
			} else {
				self.location.href = "#/dashBoard";
			}
		});
	});

	app.controller('TestController', function ($scope, $rootScope, hello, $timeout) {
		$scope.whoami = "";

		if( $rootScope.user === null ){
			self.location.href = "#/";
		}else{
			$scope.whoami = "Hey " + $rootScope.user.name;
		}
	});

	app.controller('LoginController', function ($scope, $rootScope, hello, store, $timeout) {
		$scope.whoami = "";
		$scope.social = "lalalaa";

		if( $rootScope.user !== null ){
			console.log('SOLO CUANDO CARGA PAGINA user not null osea loggeado');
			// self.location.href = "#/dashBoard";
			$scope.whoami = "Hey " + $rootScope.user.name;
		}

		$scope.loginFace = function () {
			hello('facebook').login();
			$scope.social = "facebook";
		};

		$scope.loginGmail = function () {
			hello('google').login();
			$scope.social = "google";
		};

		$scope.logout = function () {
			hello('facebook').logout().then(function() {
				$timeout(function() {
					store.remove('user');
					$scope.whoami = "";
					$rootScope.user = {};
				});
			}, function(e) {
				alert('Signed out error: ' + e.error.message);
			});
		};

		hello.on("auth.login", function (auth) {
			hello(auth.network).api('/me').then(function( user ) {
				var displayName = user.name.split(' ');
				user.first_name = displayName[0].toLowerCase();
				user.last_name = displayName[displayName.length - 1].toLowerCase();
				user.fbid = user.id;
        user.choto = 'choto';
				$scope.user = user;
				$timeout(function() {
					$rootScope.user = user;
					store.set('user', user );
console.log(store.get('user'));

					$scope.whoami = "Hey " + $rootScope.user.name;
				});
			});
		});
	});
})();
