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

  function EditPointCtrl($scope, $log, $location, $routeParams, $modal, uiGmapGoogleMapApi, uiGmapIsReady, Point) {

    function fixResourceUrl(url, isVideo) {
      if (!/^(f|ht)tps?:\/\//i.test(url)) {
        url = "http://" + url;
      }

      if (isVideo) {
        var type = null;

        url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

        if (RegExp.$3.indexOf('youtu') > -1) {
          var type = 'youtube';
        } else if (RegExp.$3.indexOf('vimeo') > -1) {
          var type = 'vimeo';
        }

        if (type === 'youtube') {
          url = "https://www.youtube.com/embed/" + RegExp.$6;
        } else if (type === 'vimeo') {
          url = "https://player.vimeo.com/video/" + RegExp.$6 + "?color=abc7f7&title=0&byline=0&portrait=0&badge=0";
        }
      }

      return url;
    }

    $scope.updatePoint = function() {
      $scope.point.resource = fixResourceUrl($scope.point.resource, $scope.point.type === 'video');
      $scope.point.$update(function() {
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

    function loadPoint() {
      $scope.point = Point.get({ type: $routeParams.type, id: $routeParams.id }, function(point) {
        marker = new google.maps.Marker({
          id: 1,
          position: new google.maps.LatLng(point.latitude, point.longitude),
          map: $scope.map.control.getGMap()
        });

        if (point.timestamp) {
          point.timestamp = moment(point.timestamp);
        } else {
          point.timestamp = moment();
        }
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
    '$modal',
    'uiGmapGoogleMapApi',
    'uiGmapIsReady',
    'Point'
  ];

  angular.module('app.point').controller('EditPointController', EditPointCtrl);

})();
