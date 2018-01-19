app.service('authInterceptorService', ['$q', '$injector', '$location', 'localStorageService', function ($q, $injector, $state, localStorageService) {

this.request = function(config) {
  config.headers = config.headers || {};

  var authData = localStorageService.get('authorizationData');
  console.log(authData);
  if (authData) {
    config.headers.Authorization = authData.token;
  }
  return config;
}

}]);