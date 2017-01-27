(function () {

	var app = angular.module('helloApp', ['ngFileUpload','ui.router','ngHello','angular-storage','angular.morris']);

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

		.state('login.distribution', {
			url: "distribution",
			templateUrl: "dashboardBodyParts/distributionSRC/UploadFiles/uploadFiles.html",
			controller:'distributionController'

		})


		.state('login.upgrade', {
			url: "upgrade",
			templateUrl: "dashboardBodyParts/upgrade.html",

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


		window.onresize = function(event) {

$( "#container" ).remove();
$( "#createMap" ).append( '<div id="container" class="w3-container"></div>');

var map2 = new Datamap({
				element: document.getElementById('container'),
				projection: 'mercator',
				fills: {
					HIGH: '#afafaf',
					LOW: 'rgb(0%, 25%, 53%)',
					MEDIUM: '004080',
					Nothing: 'grey',
					choto:'#99ccff',
					defaultFill: '#a9a9a9'
				},
				data: {
						IRL: {
								fillKey: 'LOW',
								numberOfThings: 2002
						},
						USA: {
								fillKey: 'MEDIUM',
								numberOfThings: 10381
						},
						ARG: {
								fillKey: 'choto',
								numberofChorros: 10381
						}
				},
				responsive: true,

				geographyConfig: {
						popupTemplate: function(geo, data) {

if (geo.id == "ARG") {
return ['<div class="hoverinfo"><strong>',
			'Number of chorros in ' + geo.properties.name,
			': ' + data.numberofChorros,
			'</strong></div>'].join('');
}else {

return ['<div class="hoverinfo"><strong>',
				'Number of things in ' + geo.properties.name,
				': ' + data.numberOfThings,
				'</strong></div>'].join('');
}

						}

				}

		});


		};

		var map = new Datamap({
		        element: document.getElementById('container'),
						projection: 'mercator',
		        fills: {
							HIGH: '#afafaf',
							LOW: 'rgb(0%, 25%, 53%)',
							MEDIUM: '004080',
							Nothing: 'grey',
							choto:'#99ccff',
							defaultFill: '#a9a9a9'
		        },
						height: null, //if not null, datamaps will grab the height of 'element'
    width: null,
		        data: {
		            IRL: {
		                fillKey: 'LOW',
		                numberOfThings: 2002
		            },
		            USA: {
		                fillKey: 'MEDIUM',
		                numberOfThings: 10381
		            },
		            ARG: {
		                fillKey: 'choto',
		                numberofChorros: 10381
		            }
		        },
						responsive: true,

		        geographyConfig: {

		            popupTemplate: function(geo, data) {

if (geo.id == "ARG") {
	return ['<div class="hoverinfo"><strong>',
					'Number of chorros in ' + geo.properties.name,
					': ' + data.numberofChorros,
					'</strong></div>'].join('');
}else {

		return ['<div class="hoverinfo"><strong>',
						'Number of things in ' + geo.properties.name,
						': ' + data.numberOfThings,
						'</strong></div>'].join('');
}

		            }

		        }

		    });



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

// distributionController
	app.controller('distributionController',['$rootScope','Upload','$window', '$http',function($rootScope,Upload,$window,$http){
	    var vm = this;
      vm.showDrop = true;
			vm.addFiles = false;

vm.delete = function(index) {

vm.files.splice(index,1);

if (0 == vm.files.length) {//if file array is empty shows browse and dropbox again
  vm.showDrop = true;
		vm.addFiles = false;
}


}


vm.drop = function(){

vm.showDrop = false;
	vm.addFiles = true;

}


vm.showAccordionContent = function(index){

	var x = document.getElementById(vm.files[index].name);

	     if (x.className.indexOf("w3-show") == -1) {
	         x.className += " w3-show";
	     } else {
	         x.className = x.className.replace(" w3-show", "");
	     }

}

	    vm.submit = function(){ //function to call on form submit

	        if (vm.upload_form.file.$valid && vm.files) { //check if from is valid
	            vm.upload(vm.files); //call upload function
	        }else{
	console.log('algo mal');
	        }
	    }



	    vm.upload = function (file) {

	vm.files = file;
	vm.userDetails = $rootScope.user;

// vm.files.forEach(function (item) {
//   console.log(item);
// })

	        Upload.upload({
	            url: 'http://localhost:8002/upload', //webAPI exposed to upload the file
	            data:{file:vm.files} //pass file as data, should be user ng-model
	        }).then(function (resp) { //upload function returns a promise
	            if(resp.data.error_code === 0){ //validate success
	                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
	            } else {
	                $window.alert('an error occured');
	            }
	        }, function (resp) { //catch error
	            console.log('Error status: ' + resp.status);
	            $window.alert('Error status: ' + resp.status);
	        }, function (evt) {
	            console.log(evt);
	            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
	            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
	        });
	    };
	}]);


	app.controller('LoginController', function ($scope, $rootScope, hello, store, $timeout,$http) {
		$scope.whoami = "";
		$scope.social = "lalalaa";

		if( $rootScope.user !== null ){
			console.log('SOLO CUANDO CARGA PAGINA user not null osea loggeado');
			$scope.whoami = $rootScope.user.name;


			$http({//when page is loaded and user is logged in updates dateTime
							method : "POST",
							url : "http://localhost:8002/searchUser",
							data:{mandado:$rootScope.user.name}
					}).then(function mySucces() {
							// vm.myWelcome = response.data;
					}, function myError() {
							// vm.myWelcome = response.statusText;
					});


		}



		$scope.loginFace = function () {
			hello('facebook').login();
		$rootScope.socialLogIn = "facebook";
		};

		$scope.loginGmail = function () {
			hello('google').login();
		$rootScope.socialLogIn = "google";
		};

		$scope.logout = function () {
						// store.remove('user'); //Just to restore User problems
			hello('facebook').logout().then(function() {
				$timeout(function() {

					$http({//Updates SessionTime If User Exist
									method : "POST",
									url : "http://localhost:8002/searchUser",
									data:{mandado:$rootScope.user.name}
							}).then(function mySucces() {
									// vm.myWelcome = response.data;
							}, function myError() {
									// vm.myWelcome = response.statusText;
							});

					store.remove('user');
					$scope.whoami = "";
					$rootScope.user = {};
					$rootScope.socialLogIn = "";
				});
			}, function(e) {
				alert('Signed out error: ' + e.error.message);
			});
		};


		$scope.test = function (){
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

											$http({//Updates SessionTime If User Exist
															method : "POST",
															url : "http://localhost:8002/searchUser",
															data:{mandado:$rootScope.user.name,
															socialLogIn: $rootScope.socialLogIn}
													}).then(function mySucces() {
															// vm.myWelcome = response.data;
													}, function myError() {
															// vm.myWelcome = response.statusText;
													});



				});
			});
		});
	});
})();
