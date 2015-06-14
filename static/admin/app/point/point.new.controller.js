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

  function NewPointCtrl($scope, $log, $location, $routeParams, $modal, uiGmapGoogleMapApi, Point) {
    $scope.point = new Point();
    $scope.point.type = $routeParams.type;
    $scope.point.timestamp = moment();

    function fixResourceUrl(url) {
      $log.info("fixing url");
      if (!/^(f|ht)tps?:\/\//i.test(url)) {
        url = "http://" + url;
      }
      return url;
    }

    $scope.savePoint = function() {
      $scope.point.resource = fixResourceUrl($scope.point.resource);
      $scope.point.$save(function() {
        $location.path( "/point/" + $scope.point.type );
      }, function(error) {
        $log.error(error);
        $scope.openInfoModal("Error", error['status'] + ': ' + error['data']);
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

    var marker;

    function placeMarker(map, location) {
      if (marker) {
        marker.setPosition(location);
      } else {
        marker = new google.maps.Marker({
          id: 1,
          position: location,
          map: map
        });
      }
      $scope.point.latitude = location.k;
      $scope.point.longitude = location.D;
      $scope.$apply();
    }

    var mapOptions = {
      disableDefaultUI: true,
      draggableCursor:'crosshair',
      draggingCursor: 'move',
      zoomControl: true
    };

    var mapEvents = {
      click: function(map, event, args) {
        placeMarker(map, args[0].latLng);
      }
    }

    uiGmapGoogleMapApi.then( function(maps) {
      $scope.map = { center: { latitude: 43.2358808, longitude: 51.7155101 }, zoom: 4, options: mapOptions, events: mapEvents };
    });
  }

  NewPointCtrl.$inject = [
    '$scope',
    '$log',
    '$location',
    '$routeParams',
    '$modal',
    'uiGmapGoogleMapApi',
    'Point'
  ];

  angular.module('app.point').controller('NewPointController', NewPointCtrl);

})();
