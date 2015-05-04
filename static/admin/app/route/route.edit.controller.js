/*jslint node: true*/
/*global angular*/
/*jslint browser: true*/
/*jslint nomen: true */

(function () {
    'use strict';

  /**
  * @name RouteEditCtrl
  * @desc
  */

  function RouteEditCtrl($scope, $log, $location, $routeParams, Route) {

    $scope.updatePoint = function() {
      $scope.point.$update(function() {
        $location.path( "/route" );
      });
    };

    $scope.loadPoint = function() {
      $scope.point = Route.get({ id: $routeParams.id });
    };

    $scope.loadPoint();

  }

  RouteEditCtrl.$inject = [
    '$scope',
    '$log',
    '$location',
    '$routeParams',
    'Route'
  ];

  angular.module('app.route').controller('RouteEditController', RouteEditCtrl);

})();
