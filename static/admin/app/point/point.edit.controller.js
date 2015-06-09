/*jslint node: true*/
/*global angular*/
/*jslint browser: true*/
/*jslint nomen: true */

(function () {
    'use strict';

  /**
  * @name EditPointCtrl
  * @desc
  */

  function EditPointCtrl($scope, $log, $location, $routeParams, uiGmapGoogleMapApi, uiGmapIsReady, Point) {

    $scope.updatePoint = function() {
      $scope.point.$update(function() {
        $location.path( "/point/" + $scope.point.type );
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
      $scope.point.latitude = location.D;
      $scope.point.longitude = location.k;
      $scope.$apply();
    }

    function loadPoint() {
      $scope.point = Point.get({ type: $routeParams.type, id: $routeParams.id }, function(point) {
        marker = new google.maps.Marker({
          id: 1,
          position: new google.maps.LatLng(point.latitude, point.longitude),
          map: $scope.map.control.getGMap()
        });
      });
    };

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
      $scope.map = { center: { latitude: 43.2358808, longitude: 51.7155101 }, zoom: 4, options: mapOptions, events: mapEvents, control: {} };
    });

    uiGmapIsReady.promise().then(function (maps) {
      loadPoint();
    });
  }

  EditPointCtrl.$inject = [
    '$scope',
    '$log',
    '$location',
    '$routeParams',
    'uiGmapGoogleMapApi',
    'uiGmapIsReady',
    'Point'
  ];

  angular.module('app.point').controller('EditPointController', EditPointCtrl);

})();
