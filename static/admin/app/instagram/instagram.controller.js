/*jslint node: true*/
/*global angular*/
/*jslint browser: true*/
/*jslint nomen: true */

(function () {
    'use strict';

  /**
  * @name InstagramCtrl
  * @desc
  */

  function InstagramCtrl($scope, $log, $http, $modal) {

    $http.get('/api/v1/config/instagram_access_token').
      success(function(data, status, headers, config) {
        $scope.accessToken = data.value;
        $log.info("Access Token: " + data.value);
      }).
      error(function(data, status, headers, config) {
        $scope.accessToken = '';
        $log.error("Error fetching Access Token.");
      });

    $http.get('/api/v1/config/instagram_client_secret').
      success(function(data, status, headers, config) {
        $scope.clientSecret = data.value;
        $log.info("Client Secret: " + data.value);
      }).
      error(function(data, status, headers, config) {
        $scope.clientSecret = '';
        $log.error("Error fetching Client Secret.");
      });

    $scope.updateInstagram = function(accessToken, clientSecret) {
      $log.info("Updating Instagram information.");
      $http.post('/api/v1/config', { name: 'instagram_access_token', value: accessToken }).
        success(function(data, status, headers, config) {
          $log.info("Access Token updated successfully.");
          $http.post('/api/v1/config', { name: 'instagram_client_secret', value: clientSecret }).
            success(function(data, status, headers, config) {
              $log.info("Client Secret updated successfully.");
              $scope.openInfoModal("Success", "Instagram information updated successfully.");
            }).
            error(function(data, status, headers, config) {
              $log.error("Error updating Client Secret.");
              $scope.openInfoModal("Error", "Error updating Client Secret.");
            });
        }).
        error(function(data, status, headers, config) {
          $log.error("Error updating Access Token.");
          $scope.openInfoModal("Error", "Error updating Access Token.");
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

  InstagramCtrl.$inject = [
    '$scope',
    '$log',
    '$http',
    '$modal'
  ];

  angular.module('app.instagram').controller('InstagramController', InstagramCtrl);

})();
