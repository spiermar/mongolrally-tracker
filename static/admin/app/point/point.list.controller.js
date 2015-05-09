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

  function ListPointCtrl($scope, $log, $routeParams, Point) {
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
  }

  ListPointCtrl.$inject = [
    '$scope',
    '$log',
    '$routeParams',
    'Point'
  ];

  angular.module('app.point').controller('ListPointController', ListPointCtrl);

})();
