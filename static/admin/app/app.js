/*global angular*/
(function () {
  'use strict';

  angular.module('app.routes', ['ngRoute']);

  angular.module('app.route', []);

  angular.module('app', [
    'app.routes',
    'app.main',
    'app.route',
    'ngResource',
    'angular-table'
  ]);

})();
