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

  function RouteCtrl($scope) {
    $scope.title = 'Route';
  }

  RouteCtrl.$inject = [
    '$scope'
  ];

  angular.module('app.route', []).controller('RouteController', RouteCtrl);

})();
