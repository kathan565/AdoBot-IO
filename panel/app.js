App = angular.module('AdoBot', [
    'ui.router',
    'ngRoute',
    'btford.socket-io',
    'ui.bootstrap',
    'ngAnimate',
    'toastr',
    'angular-duration-format',
    'angularMoment',
    'http-auth-interceptor',
    'uiGmapgoogle-maps',
    'angular-loading-bar',
  ])
  .config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
    var config = {
      key: 'AIzaSyCvAhUhWmN2WX7BYdSsxTIXCh89YqAHC30',
      v: '3.32', //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    }
    if ((/herokuapp/).test(window.location.host))
      config.key = 'AIzaSyCvAhUhWmN2WX7BYdSsxTIXCh89YqAHC30'
    uiGmapGoogleMapApiProvider.configure(config);
  }])
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }])
  .run([
    '$http',
    '$rootScope',
    function($http, $rootScope) {
      $http.defaults.headers.common.username = localStorage.getItem('username')
      $http.defaults.headers.common.password = localStorage.getItem('password')
      $rootScope.$on('event:auth-loginRequired', function(event, data) {
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        window.location.reload()
      })
    }
  ])
