/*jslint node: true*/
/*global angular*/
/*jslint browser: true*/
/*jslint nomen: true */

(function () {
    'use strict';

  /**
  * @name RouteResource
  * @desc
  */
  function RouteResource($resource) {
    return $resource('/api/v1/points/route/:id');
  }

  RouteResource.$inject = [
    '$resource'
  ];

  angular.module('app.route').factory('Route', RouteResource);

})();
