'use strict';

angular.module('myApp')

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  var helloState = {
    name: 'app',
    url: '/',
    templateUrl: 'app/app'
  };

  var aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  };

  $stateProvider
    .state(helloState)
    .state(aboutState);
});
