/*global angular*/
(function () {
  'use strict';

  angular.module('app.routes', ['ngRoute']);

  angular.module('app.point', []);

  angular.module('app', [
    'app.routes',
    'app.main',
    'app.point',
    'ngResource',
    'angular-table'
  ]);

})();
