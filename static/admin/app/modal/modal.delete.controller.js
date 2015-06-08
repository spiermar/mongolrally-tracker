/*jslint node: true*/
/*global angular*/
/*jslint browser: true*/
/*jslint nomen: true */

(function () {
    'use strict';

  /**
  * @name DeleteModalCtrl
  * @desc
  */

  function DeleteModalCtrl($scope, $log, $modalInstance, point) {
    $scope.point = point;

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }

  DeleteModalCtrl.$inject = [
    '$scope',
    '$log',
    '$modalInstance',
    'point'
  ];

  angular.module('app.modal').controller('DeleteModalController', DeleteModalCtrl);

})();
