angular.module('authorizeSample', [
'ui.router',
])

.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    template: '<h1>Home</h1>'
  })
  .state("login", {
    url: "/login",
    templateUrl: '/JustPlay/restrictedArea/borrar.html',
    controller: function($scope, $state, Authorization) {
      $scope.onLogin = function() {
        console.log('onLogin');
        Authorization.go('private');
      };
    }
  })
  .state('private', {
    url: '/private',
    template: '<h1>Private</h1>',
    data: {
      authorization: true,
      redirectTo: 'login'
    }
  })
  .state('dashboard', {
    url: '/dashboard',
    template: '<h1>dashboard</h1>',
    data: {
      authorization: true,
      redirectTo: 'login',
      memory: true
    }
  })
  .state('secret', {
    url: '/secret',
    template: '<h1>Secret</h1>',
    data: {
      authorization: true,
      redirectTo: 'login',
      memory: true
    }
  });

})

.run(function($rootScope, $state, Authorization) {

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (!Authorization.authorized) {
      console.log('not autorised');
      if (Authorization.memorizedState && (!_.has(fromState, 'data.redirectTo') || toState.name !== fromState.data.redirectTo)) {
        Authorization.clear();
        console.log('autorization clear');
      }
      if (_.has(toState.data, 'authorization') && _.has(toState.data, 'redirectTo')) {
console.log(' autorised');
        if (_.has(toState.data, 'memory')) {
          console.log(' autorised memorised');
          Authorization.memorizedState = toState.name;
        }
        $state.go(toState.data.redirectTo);
      }
    }

  });

  $rootScope.onLogout = function() {
    Authorization.clear();
    $state.go('home');
  };
})

.service('Authorization', function($state) {

  this.authorized = false,
  this.memorizedState = null;

  var
  clear = function() {
    this.authorized = false;
    this.memorizedState = null;
  },

  go = function(fallback) {
    this.authorized = true;
    var targetState = this.memorizedState ? this.memorizedState : fallback;
    $state.go(targetState);
  };

  return {
    authorized: this.authorized,
    memorizedState: this.memorizedState,
    clear: clear,
    go: go
  };
});
