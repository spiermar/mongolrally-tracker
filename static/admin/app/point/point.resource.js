/*jslint node: true*/
/*global angular*/
/*jslint browser: true*/
/*jslint nomen: true */

(function () {
    'use strict';

  /**
  * @name PointResource
  * @desc
  */
  function PointResource($resource) {
    return $resource('/api/v1/point/:type/:id', { type: '@type', id: '@id' }, {
      update: {
        method: 'PUT'
      }
    });
  }

  PointResource.$inject = [
    '$resource'
  ];

  angular.module('app.point').factory('Point', PointResource);

})();
