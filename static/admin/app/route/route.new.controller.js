/*jslint node: true*/
/*global angular*/
/*jslint browser: true*/
/*jslint nomen: true */

(function () {
    'use strict';

  /**
  * @name RouteNewCtrl
  * @desc
  */

  function RouteNewCtrl($scope, $log, Route) {
  }

  RouteNewCtrl.$inject = [
    '$scope',
    '$log',
    'Route'
  ];

  angular.module('app.route').controller('RouteNewController', RouteNewCtrl);

})();
