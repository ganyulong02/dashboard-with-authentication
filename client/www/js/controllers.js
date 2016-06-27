angular.module('starter')

  .controller('LoginCtrl', function ($scope, AuthService, $ionicPopup, $state) {
    $scope.user = {
      name: '',
      password: ''
    };

    $scope.login = function () {
      AuthService.login($scope.user).then(function (msg) {
        $state.go('inside');
      }, function (errMsg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: errMsg
        });
      });
    };
  })

  .controller('RegisterCtrl', function ($scope, AuthService, $ionicPopup, $state) {
    $scope.user = {
      name: '',
      password: ''
    };

    $scope.signup = function () {
      AuthService.register($scope.user).then(function (msg) {
        $state.go('outside.login');
        var alertPopup = $ionicPopup.alert({
          title: 'Register success!',
          template: msg
        });
      }, function (errMsg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Register failed!',
          template: errMsg
        });
      });
    };
  })

  .controller('InsideCtrl', function ($scope, AuthService, API_ENDPOINT, $http, $state) {
    $scope.destroySession = function () {
      AuthService.logout();
    };

    $scope.getInfo = function () {
      $http.get(API_ENDPOINT.url + '/memberinfo').then(function (result) {
        $scope.memberinfo = result.data.msg;
      });
    };

    $scope.logout = function () {
      AuthService.logout();
      $state.go('outside.login');
    };

    $scope.type = 'Line';
    $scope.labels = [];
    $scope.series = ['Time series'];
    $scope.data = [
        []
    ];
    $scope.options = {
      showTooltips: false,
      animation: false,
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true,
            max:100
          }
        }]
      }
    };

    $scope.counter = 0;

    for (var i = 0; i < 19; i++) {
      $scope.labels.push(i.toString());
    }

    $scope.pushData = function (data) {
      $scope.counter += 1;
      $scope.data[0].push(data);
      if ($scope.counter > 20) {
        $scope.labels.push($scope.counter.toString());
        $scope.labels.shift();
        $scope.data[0].shift();
      }
      $scope.$apply();
    };

    window.startDashboard($scope.pushData);
  })

  .controller('AppCtrl', function ($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
    $scope.$on(AUTH_EVENTS.notAuthenticated, function (event) {
      AuthService.logout();
      $state.go('outside.login');
      var alertPopup = $ionicPopup.alert({
        title: 'Session Lost!',
        template: 'Sorry, You have to login again.'
      });
    });
  });
