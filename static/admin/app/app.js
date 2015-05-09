/*global angular*/
(function () {
  'use strict';

  angular.module('app.routes', ['ngRoute']);

  angular.module('app.point', []);

  angular.module('app.tracker', []);

  angular.module('app', [
    'app.routes',
    'app.main',
    'app.point',
    'app.tracker',
    'ngResource',
    'angular-table'
  ]);

})();
