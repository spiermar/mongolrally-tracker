/*jslint node: true*/
/*global angular*/
/*jslint browser: true*/
/*jslint nomen: true */

(function () {
    'use strict';

  /**
  * @name ListPointCtrl
  * @desc
  */

  function ListPointCtrl($scope, $log, $http, $routeParams, Point) {
    $scope.points = Point.query({ type: $routeParams.type });

    $scope.type = $routeParams.type;

    $scope.config = {
      itemsPerPage: 10,
      fillLastPage: true
    }

    $scope.deletePoint = function(type, id) {
      var point = Point.get({ type: type, id: id }, function() {
        point.$delete();
      });
    }

    $scope.importRoute = function(importUrl) {
      $http.post('/api/v1/point/route/load', { url: importUrl }).
        success(function(data, status, headers, config) {
          $log.info("Successfully imported route.");
        }).
        error(function(data, status, headers, config) {
          $log.error("Error importing route.");
        });
      $scope.points = Point.query({ type: $routeParams.type });
    }
  }

  ListPointCtrl.$inject = [
    '$scope',
    '$log',
    '$http',
    '$routeParams',
    'Point'
  ];

  angular.module('app.point').controller('ListPointController', ListPointCtrl);

})();
