/*jslint node: true*/
/*global angular*/
/*jslint browser: true*/
/*jslint nomen: true */

(function () {
    'use strict';

  /**
  * @name NewPointCtrl
  * @desc
  */

  function NewPointCtrl($scope, $log, $location, $routeParams, Point) {
    $scope.point = new Point();
    $scope.point.type = $routeParams.type;

    $scope.savePoint = function() {
      $scope.point.$save(function() {
        $location.path( "/point/" + $scope.point.type );
      });
    };
  }

  NewPointCtrl.$inject = [
    '$scope',
    '$log',
    '$location',
    '$routeParams',
    'Point'
  ];

  angular.module('app.point').controller('NewPointController', NewPointCtrl);

})();
