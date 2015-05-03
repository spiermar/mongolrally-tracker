/*global angular*/
(function () {
  'use strict';

  angular.module('app.routes', ['ngRoute']);

  angular.module('app', [
    'app.routes',
    'app.route'
  ]);

})();
