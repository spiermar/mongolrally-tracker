/*jslint node: true*/
/*global angular*/
/*jslint browser: true*/
/*jslint nomen: true */

(function () {
    'use strict';

  /**
  * @name RouteCtrl
  * @desc
  */

  function RouteCtrl($scope, $log, Route) {
    $scope.route = Route.query();

    $scope.config = {
      itemsPerPage: 10,
      fillLastPage: false
    }

  }

  RouteCtrl.$inject = [
    '$scope',
    '$log',
    'Route'
  ];

  angular.module('app.route').controller('RouteController', RouteCtrl);

})();
