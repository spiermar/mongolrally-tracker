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

  function TrackerCtrl($scope, $log, $http, Point) {
    $scope.points = Point.query({ type: 'tracker' });

    $scope.type = 'tracker';

    $http.get('/api/v1/config/tracker_type').
      success(function(data, status, headers, config) {
        $scope.trackerType = data.value;
        $log.info("Tracker Type: " + data.value);
      }).
      error(function(data, status, headers, config) {
        $scope.trackerType = 'delorme';
        $log.error("Error fetching Tracker Type.");
      });

    $http.get('/api/v1/config/tracker_url').
      success(function(data, status, headers, config) {
        $scope.trackerUrl = data.value;
        $log.info("Tracker Url: " + data.value);
      }).
      error(function(data, status, headers, config) {
        $scope.trackerType = '';
        $log.error("Error fetching Tracker Url.");
      });

    $scope.config = {
      itemsPerPage: 10,
      fillLastPage: true
    }

    $scope.deletePoint = function(type, id) {
      var point = Point.get({ type: type, id: id }, function() {
        point.$delete();
      });
    }

    $scope.updateTracker = function(url, type) {
      $log.info("Updating tracker information.");
      $log.info("Type: " + type + ", Url: " + url);
      $http.post('/api/v1/config', { name: 'tracker_type', value: type }).
        success(function(data, status, headers, config) {
          $log.info("Tracker Type updated successfully.");
        }).
        error(function(data, status, headers, config) {
          $log.error("Error updating Tracker Type.");
        });
      $http.post('/api/v1/config', { name: 'tracker_url', value: url }).
        success(function(data, status, headers, config) {
          $log.info("Tracker Url updated successfully.");
        }).
        error(function(data, status, headers, config) {
          $log.error("Error updating Tracker Url.");
        });
    }
  }

  TrackerCtrl.$inject = [
    '$scope',
    '$log',
    '$http',
    'Point'
  ];

  angular.module('app.tracker').controller('TrackerController', TrackerCtrl);

})();
