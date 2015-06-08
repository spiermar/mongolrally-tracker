/*jslint node: true*/
/*global angular*/
/*jslint browser: true*/
/*jslint nomen: true */

(function () {
    'use strict';

  /**
  * @name ConfirmModalCtrl
  * @desc
  */

  function InfoModalCtrl($scope, $log, $modalInstance, title, message) {
    $scope.title = title;
    $scope.message = message;

    $scope.ok = function () {
      $modalInstance.close();
    };
  }

  InfoModalCtrl.$inject = [
    '$scope',
    '$log',
    '$modalInstance',
    'title',
    'message'
  ];

  angular.module('app.modal').controller('InfoModalController', InfoModalCtrl);

})();
