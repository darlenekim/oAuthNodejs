app.controller("homeController", function($scope, $state, $stateParams, authService) {

  $scope.user = {
    email: "",
    password: ""
  };
  $scope.loginError = false;
  $scope.registerError = false;

  $scope.login = function() {
    $scope.loginError = false;

    if($scope.user.email && $scope.user.password) {
      authService.login($scope.user)
    }
    else {

      $scope.loginError = true;
    }
  }

  $scope.logOut = function() {
    authService.logOut()
  }

  $scope.register = function() {
      $scope.registerError = false
      if($scope.user.firstName && $scope.user.lastName && $scope.user.email && $scope.user.password && $scope.user.confirmPassword && $scope.user.password === $scope.user.confirmPassword) {
        authService.register($scope.user)
      }
      else {
        $scope.registerError = true
      }
    }
  })
