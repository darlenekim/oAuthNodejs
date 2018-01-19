app.factory('authService', ['$http', '$q', '$state', 'localStorageService', function ($http, $q, $state, localStorageService) {

  var authServiceFactory = {};
  var serviceBase = "http://localhost:3000"

  var _authentication = {
    isAuth: false,
    isAdmin: false
  }

  var _login = function(user) {
    $http.post(serviceBase + "/users/login", user)
      .then(function(response) {
        var user = response.data.user;
        var token = response.data.token;

        localStorageService.set('authorizationData',
        {
          userId: user._id,
          token: token,
          email: user.email
        })
        _getAuthData()

        console.log(response);
        $state.go('profile')
      },
      function(error) {
        console.log(error);
        _logOut();
      })
  }

  var _register = function(user) {
    $http.post(serviceBase + "/users/register", user)
      .then(function(response) {
        $state.go("login")
      },
      function(error) {
        console.log(error);
      })
  }

  var _logOut = function() {
    localStorageService.remove('authorizationData')

    _authentication.isAdmin = false;
    _authentication.isAuth = false;
    $state.go('home');
  }

  var _getAuthData = function() {
    var authData = localStorageService.get('authorizationData')
    if(authData) {
      _authentication.userId = authData.userId;
      _authentication.email = authData.email;
      _authentication.isAdmin = authData.isAdmin;
      _authentication.isAuth = true;
    }
  }

  authServiceFactory.login = _login;
  authServiceFactory.register = _register;
  authServiceFactory.logOut = _logOut;
  authServiceFactory.getAuthData = _getAuthData;
  authServiceFactory.authentication = _authentication;

  return authServiceFactory;
}]);
