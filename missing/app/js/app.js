'use strict';

/* App Module */

angular.module('missingapp', ['missingapp.directives', 'missingapp.filters', 'ngSanitize']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {
        templateUrl: 'partials/default.html'}).
      when('/missing-child', {
        templateUrl: 'partials/missing-list-child.html',
        controller: MissingCtrl}).
      when('/missing-child/:name', {
        templateUrl: 'partials/missing-detail-child.html',
        controller: MissingCtrl}).
      when('/missing-vulnerable-adult', {
        templateUrl: 'partials/missing-list-adult.html',
        controller: MissingCtrl}).
      when('/missing-vulnerable-adult/:name', {
        templateUrl: 'partials/missing-detail-adult.html',
        controller: MissingCtrl}).
      when('/alerts', {
        templateUrl: 'partials/missing-list-alert.html',
        controller: MissingCtrl}).
      when('/alerts/:name', {
        templateUrl: 'partials/missing-detail-alert.html',
        controller: MissingCtrl}).
      otherwise({redirectTo: '/'});
}]);
