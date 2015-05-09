/*jslint node: true*/
/*global angular*/
/*jslint browser: true*/
/*jslint nomen: true */

(function () {
    'use strict';

  /**
  * @name TrackerCtrl
  * @desc
  */

  function TrackerCtrl($scope, $log) {
  }

  TrackerCtrl.$inject = [
    '$scope',
    '$log'
  ];

  angular.module('app.tracker').controller('TrackerController', TrackerCtrl);

})();
