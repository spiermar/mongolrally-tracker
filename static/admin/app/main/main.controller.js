/*jslint node: true*/
/*global angular*/
/*jslint browser: true*/
/*jslint nomen: true */

(function () {
    'use strict';

  /**
  * @name MainCtrl
  * @desc
  */

  function MainCtrl($scope) {
    $scope.title = 'Home';
  }

  MainCtrl.$inject = [
    '$scope'
  ];

  angular.module('app.main', []).controller('MainController', MainCtrl);

})();
