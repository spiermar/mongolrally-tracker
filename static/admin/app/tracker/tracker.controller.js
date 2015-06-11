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

  function TrackerCtrl($scope, $log, $http, $modal, Point) {
    $scope.type = 'tracker';

    function updatePoints() {
      $scope.points = Point.query({ type: 'tracker' });
    }

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

    $scope.refresh = function() {
      updatePoints();
    }

    $scope.deletePoint = function(type, id) {
      var point = Point.get({ type: type, id: id }, function() {
        point.$delete();
      });
    }

    $scope.toggleHidePoint = function(type, id) {
      var point = Point.get({ type: type, id: id }, function() {
        point.hide = !point.hide;
        point.$update(function() {
          updatePoints();
        }, function(error) {
          $log.error(error);
          $scope.openInfoModal("Error", error['status'] + ': ' + error['data']);
          updatePoints();
        });
      });
    }

    $scope.updateTracker = function(url, type) {
      $log.info("Updating tracker information.");
      $log.info("Type: " + type + ", Url: " + url);
      $http.post('/api/v1/config', { name: 'tracker_type', value: type }).
        success(function(data, status, headers, config) {
          $log.info("Tracker Type updated successfully.");
          $http.post('/api/v1/config', { name: 'tracker_url', value: url }).
            success(function(data, status, headers, config) {
              $log.info("Tracker Url updated successfully.");
              $scope.openInfoModal("Success", "Tracker information updated successfully.");
            }).
            error(function(data, status, headers, config) {
              $log.error("Error updating Tracker Url.");
              $scope.openInfoModal("Error", "Error updating Tracker Url.");
            });
        }).
        error(function(data, status, headers, config) {
          $log.error("Error updating Tracker Type.");
          $scope.openInfoModal("Error", "Error updating Tracker Type.");
        });
    }

    $scope.openDeleteModal = function (point) {

      var modalInstance = $modal.open({
        animation: true,
        templateUrl: '/admin/app/modal/modal-delete.html',
        controller: 'DeleteModalController',
        resolve: {
          point: function () {
            return point;
          }
        }
      });

      modalInstance.result.then(function () {
        $log.info('Deleting point: ' + point);
        $scope.deletePoint('tracker', point);
      }, function () {
        $log.info('Delete Modal dismissed.');
      });
    };

    $scope.openInfoModal = function (title, message) {

      var modalInstance = $modal.open({
        animation: true,
        templateUrl: '/admin/app/modal/modal-info.html',
        controller: 'InfoModalController',
        resolve: {
          title: function () {
            return title;
          },
          message: function () {
            return message;
          }
        }
      });
    };

    $scope.formatTimestamp = function (timestamp) {
      return moment(timestamp).format('MMM Do YYYY, hh:mm:ss');
    }

    updatePoints();
  }

  TrackerCtrl.$inject = [
    '$scope',
    '$log',
    '$http',
    '$modal',
    'Point'
  ];

  angular.module('app.tracker').controller('TrackerController', TrackerCtrl);

})();
