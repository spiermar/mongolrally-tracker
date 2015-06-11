/*jslint node: true*/
/*global angular*/
/*jslint browser: true*/
/*jslint nomen: true */

(function () {
    'use strict';

  /**
  * @name ListPointCtrl
  * @desc
  */

  function ListPointCtrl($scope, $log, $http, $routeParams, $modal, Point) {

    $scope.type = $routeParams.type;
    $scope.importing = false;

    $scope.config = {
      itemsPerPage: 10,
      fillLastPage: true
    }

    function updatePoints() {
      $scope.points = Point.query({ type: $routeParams.type });
    }

    $scope.deletePoint = function(type, id) {
      var point = Point.get({ type: type, id: id }, function() {
        point.$delete();
      });
    }

    $scope.refresh = function() {
      updatePoints();
    }

    $scope.importRoute = function(importUrl) {
      $scope.importing = true;
      $http.post('/api/v1/point/route/load', { url: importUrl }).
        success(function(data, status, headers, config) {
          $log.info("Successfully imported route.");
          $scope.importing = false;
          $scope.openInfoModal("Success", "Successfully imported route.");
        }).
        error(function(data, status, headers, config) {
          $log.error("Error importing route.");
          $scope.importing = false;
          $scope.openInfoModal("Error", "Error importing route.");
        });
      $scope.points = Point.query({ type: $routeParams.type });
    }

    $scope.openDeleteModal = function(type, point) {

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
        $scope.deletePoint(type, point);
      }, function () {
        $log.info('Delete Modal dismissed.');
      });
    };

    $scope.openInfoModal = function(title, message) {

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
      if (timestamp) {
        return moment(timestamp).format('MMM Do YYYY, HH:mm:ss');
      }
      return '';
    }

    updatePoints();
  }

  ListPointCtrl.$inject = [
    '$scope',
    '$log',
    '$http',
    '$routeParams',
    '$modal',
    'Point'
  ];

  angular.module('app.point').controller('ListPointController', ListPointCtrl);

})();
