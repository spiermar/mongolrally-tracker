/*global angular*/
(function () {
  'use strict';

  angular.module('app.routes', ['ngRoute']);

  angular.module('app.point', []);

  angular.module('app.tracker', []);

  angular.module('app.modal', []);

  angular.module('app.map', ['uiGmapgoogle-maps']);

  angular.module('app', [
    'app.routes',
    'app.main',
    'app.point',
    'app.tracker',
    'app.modal',
    'app.map',
    'ngResource',
    'angular-table',
    'ui.bootstrap'
  ]);

})();
