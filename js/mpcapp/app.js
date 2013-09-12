'use strict';

/* App Module */

angular.module('missingapp', ['missingapp.directives', 'missingapp.filters', 'ngSanitize']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {
        templateUrl: '/js/mpcapp/partials/default.html'}).
      when('/missing-child', {
        templateUrl: '/js/mpcapp/partials/missing-list-child.html',
        controller: MissingCtrl}).
      when('/missing-child/:name', {
        templateUrl: '/js/mpcapp/partials/missing-detail-child.html',
        controller: MissingCtrl}).
      when('/missing-vulnerable-adult', {
        templateUrl: '/js/mpcapp/partials/missing-list-adult.html',
        controller: MissingCtrl}).
      when('/missing-vulnerable-adult/:name', {
        templateUrl: '/js/mpcapp/partials/missing-detail-adult.html',
        controller: MissingCtrl}).
      when('/alerts', {
        templateUrl: '/js/mpcapp/partials/missing-list-alert.html',
        controller: MissingCtrl}).
      when('/alerts/:name', {
        templateUrl: '/js/mpcapp/partials/missing-detail-alert.html',
        controller: MissingCtrl}).
      otherwise({redirectTo: '/'});
}]);
