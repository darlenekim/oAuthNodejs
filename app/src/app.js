var app = angular.module("myApp", ['ui.router', 'LocalStorageModule'])

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "../src/views/home.html",
      controller: "homeController"
    })
    .state("profile", {
      url: "/profile",
      templateUrl: "../src/views/profile.html",
      controller: "homeController",
      resolve: { authenticate: authenticate}
    })
    .state("login", {
      url: "/login",
      templateUrl: "../src/views/login.html",
      controller: "homeController"
    })
    .state("register", {
      url: "/register",
      templateUrl: "../src/views/register.html",
      controller: "homeController"
    })
})

// Configure every outgoing request with new headers found in authInterceptorService
app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptorService');
});

// Load user data into the authService when the app boots up.
app.run(['authService', function (authService) {
  authService.getAuthData();
}]);


function authenticate($q, authService, $state, $timeout) {
	console.log(authService.authentication.isAuth);
  if (authService.authentication.isAuth) {
    // Resolve the promise successfully
    return $q.when()
  }
	else {
    $timeout(function() {
      // This code runs after the authentication promise has been rejected.
      $state.go('login')
    })

    // Reject the authentication promise to prevent the state from loading
    return $q.reject()
  }
}