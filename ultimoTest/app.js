(function () {
	var app = angular.module('helloApp', ['ui.router', 'angular-maps','ngHello','angular-storage','angular.morris']);

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

		.state('home', {
			url: "/login",
			template: "home.html"
		})

		.state('login.statistics', {
			url: "statistics",
			templateUrl: "dashboardBodyParts/statistics.html",
			controller: 'statistics'
		})

		.state('login.worldMapView', {
			url: "worldMapView",
			templateUrl: "dashboardBodyParts/worldMapView.html",
			controller:'maps'
		})

		.state('login.data', {
			url: "data",
			templateUrl: "dashboardBodyParts/data.html"
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
				self.location.href = "#/";
			}
		});
	});

	app.controller('maps', ['$scope', function($scope) {

	    $scope.valueRange = [0,100];
	    $scope.colorRange = ["#F03B20", "#FFEDA0"];
	    $scope.dimension = 600;
	    $scope.mapWidth = 600;
	    $scope.descriptiveText = 'failure %';
	    $scope.countryFillColor = "#aaa";
	    $scope.countryBorderColor = "#fff";
	    $scope.worldData = [
	        {
	          "countryCode": "AFG",
	          "value": 10
	        },
	        {
	          "countryCode": "USA",
	          "value": 99
	        },
	        {
	          "countryCode": "CAN",
	          "value": 50
	        },
	        {
	          "countryCode": "ISR",
	          "value": 2
	        },
	        {
	          "countryCode": "NLD",
	          "value": 30
	        }
	      ];
	}]);

	app.controller('TestController', function ($scope, $rootScope, hello, $timeout) {
		$scope.whoami = "";

		if( $rootScope.user === null ){
			self.location.href = "#/";
		}else{
			$scope.whoami = "Hey " + $rootScope.user.name;
		}
	});


	app.controller('statistics', function ($scope) {
		// $scope.data = [
    //   { y: "2006", a: 100 },
    //   { y: "2007", a: 75 },
    //   { y: "2008", a: 50 },
    //   { y: "2009", a: 75 },
    //   { y: "2010", a: 50 },
    //   { y: "2011", a: 750 },
    //   { y: "2012", a: 1000 }
    // ];
    // $scope.xaxis = 'y';
    // $scope.yaxis = '["a"]';
	});




	app.controller('LoginController', function ($scope, $rootScope, hello, store, $timeout) {
		$scope.whoami = "";
		$scope.social = "lalalaa";

		if( $rootScope.user !== null ){
			console.log('SOLO CUANDO CARGA PAGINA user not null osea loggeado');
			$scope.whoami = $rootScope.user.name;
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


		$scope.test = function (){

console.log('asd');
// self.location. = "#/test";


		};

		hello.on("auth.login", function (auth) {
			hello(auth.network).api('/me').then(function( user ) {
				var displayName = user.name.split(' ');
				user.first_name = displayName[0].toLowerCase();
				user.last_name = displayName[displayName.length - 1].toLowerCase();
				user.fbid = user.id;
        user.choto = 'choto';
				$scope.user = user;

				$timeout(function() {//Do NOT delete
					$rootScope.user = user;
					store.set('user', user );

console.log(store.get('user'));

					$scope.whoami = $rootScope.user.name;
					$scope.thumbnail = $rootScope.user.thumbnail;
				});
			});
		});
	});
})();
