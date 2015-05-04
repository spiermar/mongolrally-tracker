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

  function NewPointCtrl($scope, $log, Point) {
  }

  NewPointCtrl.$inject = [
    '$scope',
    '$log',
    'Point'
  ];

  angular.module('app.point').controller('NewPointController', NewPointCtrl);

})();
