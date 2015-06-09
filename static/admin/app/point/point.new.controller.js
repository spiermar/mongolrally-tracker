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

  function NewPointCtrl($scope, $log, $location, $routeParams, uiGmapGoogleMapApi, Point) {
    $scope.point = new Point();
    $scope.point.type = $routeParams.type;

    var mapMarker;

    $scope.savePoint = function() {
      $scope.point.$save(function() {
        $location.path( "/point/" + $scope.point.type );
      });
    };

    function placeMarker(map, location) {
      if (mapMarker) {
        mapMarker.setPosition(location);
      } else {
        mapMarker = new google.maps.Marker({
          id: 1,
          position: location,
          map: map
        });
      }
      $scope.point.latitude = location.D;
      $scope.point.longitude = location.k;
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
    'uiGmapGoogleMapApi',
    'Point'
  ];

  angular.module('app.point').controller('NewPointController', NewPointCtrl);

})();
