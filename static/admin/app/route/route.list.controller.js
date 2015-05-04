/*jslint node: true*/
/*global angular*/
/*jslint browser: true*/
/*jslint nomen: true */

(function () {
    'use strict';

  /**
  * @name RouteListCtrl
  * @desc
  */

  function RouteListCtrl($scope, $log, Route) {
    $scope.route = Route.query();

    $scope.config = {
      itemsPerPage: 10,
      fillLastPage: true
    }

  }

  RouteListCtrl.$inject = [
    '$scope',
    '$log',
    'Route'
  ];

  angular.module('app.route').controller('RouteListController', RouteListCtrl);

})();
