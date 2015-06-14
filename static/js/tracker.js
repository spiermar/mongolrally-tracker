var finishIcon = 'img/finish.png';	// start finish icon
var blogIcon = 'img/text.png';	// blog icon
var videoIcon = 'img/video.png';	// video icon
var photoIcon = 'img/photo.png';	// image icon
var carIcon = 'img/car.png';	// car icon

var blogPins = [];
var photoPins = [];
var videoPins = [];

var routePath = null;
var startMarker = null;
var finishMarker = null;

var routeControl;
var blogControl;
var photoControl;
var videoControl;

/* var trackerUrl = 'http://www.tripline.net/api/ge_kml.php/Mongol_Rally.kml?t_id=07102603702010059C3AC63443D845C0'; */

// Implementing String.format
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

/**
* The Pin holds all the information about a pin.
*/
function Pin (marker, id, title, desc, resource, type)
{
	this.marker = marker;
	this.id = id;
	this.title = title;
	this.desc = desc;
	this.resource = resource;
	this.type = type;
	return this;
}

/**
* The MapControl adds a control to the map.
*/
function MapControl(map, text, title, callback) {
	// Create Control Div
	var controlDiv = document.createElement('div');

	// Set CSS for the control border
	var controlUI = document.createElement('div');
	controlUI.style.backgroundColor = '#fff';
	controlUI.style.border = '2px solid #fff';
	controlUI.style.borderRadius = '3px';
	controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
	controlUI.style.cursor = 'pointer';
	controlUI.style.marginBottom = '22px';
	controlUI.style.marginLeft = '15px';
	controlUI.style.textAlign = 'center';
	controlUI.title = title;
	controlDiv.appendChild(controlUI);

	// Set CSS for the control interior
	var controlText = document.createElement('div');
	controlText.style.color = 'rgb(25,25,25)';
	controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
	controlText.style.fontSize = '16px';
	controlText.style.lineHeight = '38px';
	controlText.style.paddingLeft = '5px';
	controlText.style.paddingRight = '5px';
	controlText.innerHTML = text;
	controlUI.appendChild(controlText);

	// Setup the click event listeners
	google.maps.event.addDomListener(controlUI, 'click', callback);

	controlDiv.index = 0;
	map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(controlDiv);

	return controlDiv
}

/**
* The LogoControl adds a logo to the map.
*/
function LogoControl() {
	// Create Control Div
	var controlDiv = document.createElement('div');
	controlDiv.style.padding = '5px';
	controlDiv.style.width = '20%';

	// Set CSS for the control border.
	var logoUI = document.createElement('div');
	logoUI.style.borderWidth = '0px';
	logoUI.style.cursor = 'pointer';
	logoUI.style.textAlign = 'center';
	logoUI.title = 'Yakin Logo';
	controlDiv.appendChild(logoUI);

	// Set CSS for the control interior.
	var logoDiv = document.createElement('div');
	logoDiv.style.paddingLeft = '4px';
	logoDiv.style.paddingRight = '4px';

	var logoImg = document.createElement('img');
	logoImg.setAttribute('src', 'img/logo_white.png');
	logoImg.setAttribute('width', '100%');

	logoDiv.appendChild(logoImg);

	logoUI.appendChild(logoDiv);

	google.maps.event.addDomListener(logoImg, 'click', function() {
		window.open('http://yakinaround.com/', '_blank');
	});

	controlDiv.index = 0;
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv);
}

function FilterLabelControl() {
	// Create Control Div
	var controlDiv = document.createElement('div');

	// Set CSS for the control border
	var controlUI = document.createElement('div');
	controlUI.style.cursor = 'pointer';
	controlUI.style.marginBottom = '22px';
	controlUI.style.marginLeft = '15px';
	controlUI.style.textAlign = 'center';
	controlUI.title = "Map control filters.";
	controlDiv.appendChild(controlUI);

	// Set CSS for the control interior
	var controlText = document.createElement('div');
	controlText.style.color = '#fff';
	controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
	controlText.style.fontSize = '22px';
	controlText.style.lineHeight = '38px';
	controlText.style.paddingLeft = '5px';
	controlText.style.paddingRight = '5px';
	controlText.innerHTML = "Filters";
	controlUI.appendChild(controlText);

	controlDiv.index = 0;
	map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(controlDiv);
}


/**
* The togglePins function toggles a set of pins visible or not.
*/
function togglePins(pinList) {
	$.each(pinList, function (index, pin) {
		pin.marker.setVisible(!pin.marker.getVisible());
	});
}

/**
* The showPin function opens a InfoWindow with the pin information.
*/
function showPin(pin)
{
	var content = "<h3>{0}</h3>".format(pin.title);

	if (pin.desc) {
		content = content.concat("<p>{0}</p>".format(pin.desc));
	}

	if (pin.resource) {
		if (pin.type === 'photo') {
			content = content.concat('<a href="{0}" target="_blank"><img src="{0}" class="photo-pin" alt="{1}" width="400px"/></a>'.format(pin.resource, pin.title));
		} else if (pin.type === 'video') {
			content = content.concat('<iframe class="video-pin" width="560" height="315" src="{0}" frameborder="0" allowfullscreen></iframe>'.format(pin.resource));
		} else if (pin.type === 'blog') {
			content = content.concat('<a href="{0}" class="btn btn-default btn-yakin" target="_blank">View Post</a>'.format(pin.resource));
		}
	}

	var infoWindow = new google.maps.InfoWindow({
		content: content,
		zIndex: 15
	});

	infoWindow.open(map, pin.marker)
}

/**
* The addPin function adds a pin to a list.
*/
function addPin(pos, id, title, desc, resource, type, zIndex, pinList) {
	var icon = blogIcon

	if (type === 'video') {
		icon = videoIcon
	} else if (type === 'photo') {
		icon = photoIcon
	}

	var marker = new google.maps.Marker({
				position: pos,
				map: map,
				title: title,
				icon: icon,
				size: new google.maps.Size(1, 1),
				zIndex: zIndex,
				visible: true
			});
	var pin = new Pin(marker, id, title, desc, resource, type);
	pinList.push(pin);
	new google.maps.event.addListener(pin.marker, 'click', function() {
		showPin(pin);
	});
}

function loadKml(map, kmlUrl) {
	var kmlLayer = new google.maps.KmlLayer({
    url: kmlUrl
  });

	kmlLayer.setMap(map);

	return kmlLayer;
}

function toggleLayer(map, layer) {
	if(layer.getMap() === null) {
		layer.setMap(map);
	} else {
		layer.setMap(null);
	}
}


/**
* The getLatLgn function create a LatLgn object based on coordinates.
*/
function getLatLgn(lat,lgn) {
	var e = NaN;
	var n = NaN;
	if((lat != null) && (lgn != null)) {
		n = parseFloat(lat);
		e = parseFloat(lgn);
	}
	if (isNaN(e) || isNaN(n)){
		return;
	}
	return new google.maps.LatLng(n,e);
}

/**
* The loadPoints function loads all points from the API and adds them to the map.
*/
function loadPoints(map) {
	$.getJSON('api/v1/point/video', function(points) {
		if(points.length > 0) {
			$.each(points, function (index, point) {
				if(!point['hide']) {
						addPin(getLatLgn(point['latitude'], point['longitude']), point['id'], point['title'], point['desc'], point['resource'], 'video', 10, videoPins);
				}
			});
		} else {
			videoControl.style.display = 'none';
		}
	});

	$.getJSON('api/v1/point/photo', function(points) {
		if(points.length > 0) {
			$.each(points, function (index, point) {
				if(!point['hide']) {
					addPin(getLatLgn(point['latitude'], point['longitude']), point['id'], point['title'], point['desc'], point['resource'], 'photo', 10, photoPins);
				}
			});
		} else {
			photoControl.style.display = 'none';
		}
	});

	$.getJSON('api/v1/point/blog', function(points) {
		if(points.length > 0) {
			$.each(points, function (index, point) {
				if(!point['hide']) {
					addPin(getLatLgn(point['latitude'], point['longitude']), point['id'], point['title'], point['desc'], point['resource'], 'blog', 10, blogPins);
				}
			});
		} else {
			blogControl.style.display = 'none';
		}
	});

	$.getJSON('api/v1/point/route', function(points) {
		if(points.length > 0) {
			var routePoints = [];
			var visiblePoints = []

			$.each(points, function (index, point) {
				if(!point['hide']) {
					routePoints.push(getLatLgn(point['latitude'], point['longitude']));
					visiblePoints.push(point);
				}
			});

			routePath = new google.maps.Polyline({
				path: routePoints,
				geodesic: true,
				strokeColor: '#FF0000',
				strokeOpacity: 0.5,
				strokeWeight: 5,
				map: map,
				geodesic: true,
				zIndex: 1
			});

			finishMarker = new google.maps.Marker({
				position: getLatLgn(visiblePoints[visiblePoints.length - 1]['latitude'], visiblePoints[visiblePoints.length - 1]['longitude']),
				map: map,
				title: visiblePoints[visiblePoints.length - 1]['title'],
				icon: finishIcon,
				size: new google.maps.Size(1, 1.5),
				zIndex: 10
			});

			var finishMarkerPin = new Pin(finishMarker, 1001, visiblePoints[visiblePoints.length - 1]['title'], null, null, 'route');
			new google.maps.event.addListener(finishMarker, 'click', function() {
				showPin(finishMarkerPin);
			});

			startMarker = new google.maps.Marker({
				position: getLatLgn(visiblePoints[0]['latitude'], visiblePoints[0]['longitude']),
				map: map,
				title: visiblePoints[0]['title'],
				icon: finishIcon,
				size: new google.maps.Size(1, 1.5),
				zIndex: 10
			});

			var startMarkerPin = new Pin(startMarker, 1002, visiblePoints[0]['title'], null, null, 'route');
			new google.maps.event.addListener(startMarker, 'click', function() {
				showPin(startMarkerPin);
			});
		} else {
			routeControl.style.display = 'none';
		}
	});

	$.getJSON('api/v1/point/tracker', function(points) {
		var linePoints = [];
		var finalPoint;
		var time;
		var en;

		$.each(points, function (index, point) {
			if(!point['hide']) {
				en = getLatLgn(point['latitude'], point['longitude']);
				linePoints.push(en);
				lastPosition = en;
				lastPoint = point;
			}
		});

		var currentLocation = new google.maps.Marker({
					position: lastPosition,
					map: map,
					title: "Current Location at: " + lastPoint.timestamp,
					icon: carIcon,
					animation: google.maps.Animation.DROP,
					size: new google.maps.Size(1, 1),
					zIndex: 10,
				});

		var currentLocationPinDesc = "At {0}<br>Out location was:<br>{1} Lat, {2} Lng".format(lastPoint.timestamp, lastPoint.latitude, lastPoint.longitude);

		if (lastPoint.desc) {
			currentLocationPinDesc = currentLocationPinDesc.concat("<br>{0}".format(lastPoint.desc));
		}

		var currentLocationPin = new Pin(currentLocation, 1000, "We are here!", currentLocationPinDesc, null, 'current');
		new google.maps.event.addListener(currentLocation, 'click', function() {
			showPin(currentLocationPin);
		});

		/* showPin(currentLocationPin); */

		var Path = new google.maps.Polyline({
				path: linePoints,
				geodesic: true,
				strokeColor: '#0000FF',
				strokeOpacity: 0.5,
				strokeWeight: 5,
				map: map,
				geodesic: true,
				zIndex: 5
		});
	});
}

/**
* The initialize function initializes the map.
*/
function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(43.2358808,51.7155101),
		zoom: 4,
		streetViewControl: false,
		scaleControl: true
	};
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	/* loading points */
	loadPoints(map);

	/* loading tracker kml */
	/* var trackerLayer = loadKml(map, trackerUrl); */

	var filterControl = new FilterLabelControl();

	routeControl = new MapControl(map, "Route", "Click to toggle route.", function () {
		toggleLayer(map, routePath);
	});

	blogControl = new MapControl(map, "Blog", "Click to toggle blog pins.", function () {
		togglePins(blogPins);
	});

	videoControl = new MapControl(map, "Video", "Click to toggle video pins.", function () {
		togglePins(videoPins);
	});

	photoControl = new MapControl(map, "Photo", "Click to toggle photo pins.", function () {
		togglePins(photoPins);
	});

	var logoControl = new LogoControl();
}

google.maps.event.addDomListener(window, 'load', initialize);
