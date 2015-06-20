/*jslint node: true*/
/*global angular*/
/*jslint browser: true*/
/*jslint nomen: true */

(function () {
    'use strict';

  /**
  * @name FlickrCtrl
  * @desc
  */

  function FlickrCtrl($scope, $log, $http, $modal) {

    $http.get('/api/v1/config/flickr_photoset_title').
      success(function(data, status, headers, config) {
        $scope.photosetTitle = data.value;
        $log.info("Photoset Title: " + data.value);
      }).
      error(function(data, status, headers, config) {
        $scope.photosetTitle = '';
        $log.error("Error fetching Photoset Title.");
      });

    $http.get('/api/v1/config/flickr_username').
      success(function(data, status, headers, config) {
        $scope.username = data.value;
        $log.info("Username: " + data.value);
      }).
      error(function(data, status, headers, config) {
        $scope.username = '';
        $log.error("Error fetching Username.");
      });

    $http.get('/api/v1/config/flickr_api_key').
      success(function(data, status, headers, config) {
        $scope.apiKey = data.value;
        $log.info("API Key: " + data.value);
      }).
      error(function(data, status, headers, config) {
        $scope.apiKey = '';
        $log.error("Error fetching API Key.");
      });

    $http.get('/api/v1/config/flickr_api_secret').
      success(function(data, status, headers, config) {
        $scope.apiSecret = data.value;
        $log.info("API Secret: " + data.value);
      }).
      error(function(data, status, headers, config) {
        $scope.apiSecret = '';
        $log.error("Error fetching API Secret.");
      });

    $scope.updateFlickr = function(username, photoset, apiKey, apiSecret) {
      $log.info("Updating Flickr information.");
      $http.post('/api/v1/config', { name: 'flickr_username', value: username }).
        success(function(data, status, headers, config) {
          $log.info("Username updated successfully.");
          $http.post('/api/v1/config', { name: 'flickr_photoset_title', value: photoset }).
            success(function(data, status, headers, config) {
              $log.info("Photoset Title updated successfully.");
              $http.post('/api/v1/config', { name: 'flickr_api_key', value: apiKey }).
                success(function(data, status, headers, config) {
                  $log.info("API Key updated successfully.");
                  $http.post('/api/v1/config', { name: 'flickr_api_secret', value: apiSecret }).
                    success(function(data, status, headers, config) {
                      $log.info("API Secret updated successfully.");
                      $scope.openInfoModal("Success", "Flickr information updated successfully.");
                    }).
                    error(function(data, status, headers, config) {
                      $log.error("Error updating API Secret.");
                      $scope.openInfoModal("Error", "Error updating API Secret.");
                    });
                }).
                error(function(data, status, headers, config) {
                  $log.error("Error updating API Key.");
                  $scope.openInfoModal("Error", "Error updating API Key.");
                });
            }).
            error(function(data, status, headers, config) {
              $log.error("Error updating Photoset Title.");
              $scope.openInfoModal("Error", "Error updating Photoset Title.");
            });
        }).
        error(function(data, status, headers, config) {
          $log.error("Error updating Username.");
          $scope.openInfoModal("Error", "Error updating Username.");
        });
    }

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
  }

  FlickrCtrl.$inject = [
    '$scope',
    '$log',
    '$http',
    '$modal'
  ];

  angular.module('app.flickr').controller('FlickrController', FlickrCtrl);

})();
