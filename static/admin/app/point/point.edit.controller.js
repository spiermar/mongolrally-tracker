/*jslint node: true*/
/*global angular*/
/*jslint browser: true*/
/*jslint nomen: true */

(function () {
    'use strict';

  /**
  * @name EditPointCtrl
  * @desc
  */

  function EditPointCtrl($scope, $log, $location, $routeParams, Point) {

    $scope.updatePoint = function() {
      $scope.point.$update(function() {
        $location.path( "/point/" + $scope.point.type );
      });
    };

    $scope.loadPoint = function() {
      $scope.point = Point.get({ type: $routeParams.type, id: $routeParams.id });
    };

    $scope.loadPoint();

  }

  EditPointCtrl.$inject = [
    '$scope',
    '$log',
    '$location',
    '$routeParams',
    'Point'
  ];

  angular.module('app.point').controller('EditPointController', EditPointCtrl);

})();
