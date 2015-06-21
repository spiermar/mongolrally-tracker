(function () {
	'use strict';

	/**
	* Implementing String.format
	*/
	if (!String.prototype.format) {
		String.prototype.format = function() {
			var args = arguments;
			return this.replace(/{(\d+)}/g, function(match, number) {
				return typeof args[number] != 'undefined'
					? args[number]
					: match
				;
			});
		};
	}

	var defaultIcon = new L.Icon.Default(),
			photoLayer = new L.layerGroup([]),
			videoLayer = new L.layerGroup([]),
			blogLayer = new L.layerGroup([]),
			routeLayer = new L.layerGroup([]),
			trackerLayer = new L.layerGroup([]);

	var photoIcon = L.AwesomeMarkers.icon({
		prefix: 'fa',
    icon: 'camera',
		extraClasses: 'tracker-icon',
    markerColor: 'blue'
  });

	var videoIcon = L.AwesomeMarkers.icon({
		prefix: 'fa',
    icon: 'video-camera',
    markerColor: 'blue'
  });

	var carIcon = L.AwesomeMarkers.icon({
		prefix: 'fa',
    icon: 'car',
		extraClasses: 'tracker-icon',
    markerColor: 'cadetblue'
  });

	var flagIcon = L.AwesomeMarkers.icon({
		prefix: 'fa',
    icon: 'flag-checkered',
		extraClasses: 'tracker-icon',
    markerColor: 'red'
  });

	var blogIcon = L.AwesomeMarkers.icon({
		prefix: 'fa',
    icon: 'rss',
		extraClasses: 'tracker-icon',
    markerColor: 'blue'
  });

	var routeIcon = L.AwesomeMarkers.icon({
		prefix: 'fa',
    icon: 'road',
		extraClasses: 'tracker-icon',
    markerColor: 'red'
  });

	var trackerIcon = L.AwesomeMarkers.icon({
		prefix: 'fa',
    icon: 'road',
		extraClasses: 'tracker-icon',
    markerColor: 'blue'
  });

	/**
	* The addMarker function adds a marker to a list.
	*/
	function addMarker(lat, lng, title, desc, resource, type) {
		var icon = defaultIcon;

		var content = "<h3>{0}</h3>".format(title);

		if (desc) {
			content = content.concat("<p>{0}</p>".format(desc));
		}

		if (type === 'photo') {
			if (resource) {
				content = content.concat('<a href="{0}" target="_blank"><img src="{0}" class="photo-pin" alt="{1}" width="400px"/></a>'.format(resource, title));
			}
			icon = photoIcon;
		} else if (type === 'video') {
			if (resource) {
				content = content.concat('<iframe class="video-pin" width="560" height="315" src="{0}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'.format(resource));
			}
			icon = videoIcon;
		} else if (type === 'blog') {
			if (resource) {
				content = content.concat('<a href="{0}" class="btn btn-default btn-yakin" target="_blank">View Post</a>'.format(resource));
			}
			icon = blogIcon;
		} else if (type === 'route') {
			icon = routeIcon;
		} else if (type === 'tracker') {
			icon = trackerIcon;
		} else if (type === 'flag') {
				icon = flagIcon;
		} else if (type === 'car') {
				icon = carIcon;
		}

		var popup = new L.popup({ maxWidth: 500, maxHeight: 400 })
				.setContent(content);

		var marker = new L.Marker(new L.LatLng(lat, lng), { icon: icon, title: title });

		marker.bindPopup(popup);

		return marker;
	}

	/**
	* The loadPoints function loads all points from the API and adds them to the map.
	*/
	function loadPoints() {

		$.getJSON('api/v1/point/video', function(points) {
			if(points.length > 0) {
				$.each(points, function (index, point) {
					if(!point['hide'] && point['latitude'] && point['longitude']) {
						videoLayer.addLayer(addMarker(parseFloat(point['latitude']), parseFloat(point['longitude']), point['title'], point['desc'], point['resource'], 'video'));
					}
				});
			}
		});

		$.getJSON('api/v1/point/photo', function(points) {
			if(points.length > 0) {
				$.each(points, function (index, point) {
					if(!point['hide'] && point['latitude'] && point['longitude']) {
						photoLayer.addLayer(addMarker(parseFloat(point['latitude']), parseFloat(point['longitude']), point['title'], point['desc'], point['resource'], 'photo'));
					}
				});
			}
		});

		$.getJSON('api/v1/point/blog', function(points) {
			if(points.length > 0) {
				$.each(points, function (index, point) {
					if(!point['hide'] && point['latitude'] && point['longitude']) {
						blogLayer.addLayer(addMarker(parseFloat(point['latitude']), parseFloat(point['longitude']), point['title'], point['desc'], point['resource'], 'blog'));
					}
				});
			}
		});



		$.getJSON('api/v1/point/route', function(points) {
			if(points.length > 0) {

				var route = new L.MarkerClusterGroup({
    			iconCreateFunction: function(cluster) {
        		return new L.DivIcon({ html: '<div><span>' + cluster.getChildCount() + '</span></div>', className: 'marker-cluster marker-cluster-red', iconSize: new L.Point(40, 40) });
    			}
				});

				// Create array of lat,lon points.
				var line_points = [],
						route_points = [];

				// Define polyline options
				var polyline_options = {
				    color: '#FF0000'
				};

				$.each(points, function (index, point) {
					if(!point['hide'] && point['latitude'] && point['longitude']) {
						route_points.push(point);
						line_points.push([point['latitude'], point['longitude']]);
					}
				});

				var start = route_points.shift();
				var finish = route_points.pop();

				$.each(route_points, function(index, point) {
					route.addLayer(addMarker(parseFloat(point['latitude']), parseFloat(point['longitude']), point['title'], point['desc'], point['resource'], 'route'));
				});

				routeLayer.addLayer(L.polyline(line_points, polyline_options));
				routeLayer.addLayer(route);
				routeLayer.addLayer(addMarker(parseFloat(start['latitude']), parseFloat(start['longitude']), start['title'], start['desc'], start['resource'], 'flag'));
				routeLayer.addLayer(addMarker(parseFloat(finish['latitude']), parseFloat(finish['longitude']), finish['title'], finish['desc'], finish['resource'], 'flag'));
			}
		});

		$.getJSON('api/v1/point/tracker', function(points) {
			if(points.length > 0) {

				var tracker = new L.MarkerClusterGroup({
					iconCreateFunction: function(cluster) {
						return new L.DivIcon({ html: '<div><span>' + cluster.getChildCount() + '</span></div>', className: 'marker-cluster marker-cluster-blue', iconSize: new L.Point(40, 40) });
					}
				});

				// Create array of lat,lon points.
				var line_points = [],
						tracker_points = [];

				// Define polyline options
				var polyline_options = {
						color: '#0000FF'
				};

				$.each(points, function (index, point) {
					if(!point['hide'] && point['latitude'] && point['longitude']) {
						line_points.push([point['latitude'], point['longitude']]);
						tracker_points.push(point);
					}
				});

				var current = tracker_points.pop();

				$.each(tracker_points, function (index, point) {
					tracker.addLayer(addMarker(parseFloat(point['latitude']), parseFloat(point['longitude']), point['title'], point['desc'], point['resource'], 'tracker'));
				});

				trackerLayer.addLayer(L.polyline(line_points, polyline_options));
				trackerLayer.addLayer(tracker);
				routeLayer.addLayer(addMarker(parseFloat(current['latitude']), parseFloat(current['longitude']), current['title'], current['desc'], current['resource'], 'car'));
			}
		});
	}

	/**
	* The initialize function initializes the map.
	*/
	function initialize() {
		L.mapbox.accessToken = 'pk.eyJ1IjoibXNwaWVyIiwiYSI6ImUwMmQ4OTBiNWNiMWIyZDE2MTU3MGZlYWI1MjdkMzkxIn0.3eCyZuMzgZfgDy-UznjdFA';

		var streets = new L.mapbox.tileLayer('mapbox.streets');
		var satellite = new L.mapbox.tileLayer('mapbox.satellite');

		var base = {
    	"Streets": streets,
			"Satellite": satellite
		};

		var overlays = {
    	"Photos": photoLayer,
    	"Videos": videoLayer,
			"Blogs": blogLayer,
			"Route": routeLayer
		};

		var map = new L.map('map', {
    	center: [43.2358808,51.7155101],
    	zoom: 4,
    	layers: streets,
			minZoom: 3,
			maxZoom: 18
		});

		map.addLayer(photoLayer);
		map.addLayer(videoLayer);
		map.addLayer(blogLayer);
		map.addLayer(routeLayer);
		map.addLayer(trackerLayer);

		L.control.layers(base, overlays, { collapsed: false }).addTo(map);

		loadPoints();
	}

	/**
	* Initializing when the document is ready.
	*/
	$( document ).ready(function() {
		initialize();
	});

})();
