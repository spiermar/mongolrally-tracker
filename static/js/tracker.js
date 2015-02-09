var finishIcon = 'images/finishflag.png';	// start finish icon
var blogIcon = 'images/blogmarker.png';	// blog icon
var videoIcon = 'images/videomarker.png';	// video icon
var photoIcon = 'images/imgmarker.png';	// image icon
var charityIcon = 'images/imgmac.png'; // charity icon
var carIcon = 'images/car.png';	// car icon

var blogPins = [];
var photoPins = [];
var videoPins = [];
var charityPins = [];

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
function Pin (marker, id, title, desc, resource)
{
	this.marker = marker;
	this.id = id;
	this.title = title;
	this.desc = desc;
	this.resource = resource;
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

	controlDiv.index = 1;
	map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(controlDiv);
}

/**
* The LogoControl adds a logo to the map.
*/
function LogoControl() {
	// Create Control Div
	var controlDiv = document.createElement('div');
	controlDiv.style.padding = '5px';

	// Set CSS for the control border.
	var logoUI = document.createElement('div');
	logoUI.style.borderWidth = '0px';
	logoUI.style.cursor = 'pointer';
	logoUI.style.textAlign = 'center';
	logoUI.title = 'Yakin Logo';
	controlDiv.appendChild(logoUI);

	// Set CSS for the control interior.
	var logoText = document.createElement('div');
	logoText.style.paddingLeft = '4px';
	logoText.style.paddingRight = '4px';
	logoText.innerHTML = '<img src="images/logo_white.png" width="30%"/>';
	logoUI.appendChild(logoText);

	google.maps.event.addDomListener(logoUI, 'click', function() {
		window.open('http://yakinaround.com/', '_blank');
	});

	controlDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv);
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
	var content = "<h2>{0}</h2><p>{1}</p><p>{2}</p>".format(pin.title, pin.resource, pin.desc);
	var infoWindow = new google.maps.InfoWindow({
		content: content
	});

	infoWindow.open(map, pin.marker)
}

/**
* The addPin function adds a pin to a list.
*/
function addPin(pos, id, title, desc, resource, icon, zIndex, pinList) {
	var marker = new google.maps.Marker({
				position: pos,
				map: map,
				title: title,
				icon: icon,
				size: new google.maps.Size(1, 1),
				zIndex: zIndex,
				visible: false
			});
	var pin = new Pin(marker, id, title, desc, resource);
	pinList.push(pin);
	new google.maps.event.addListener(pin.marker, 'click', function() {
		showPin(pin);
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

	//load the spreadsheet data
	getJsonPoints();

	var blogControl = new MapControl(map, "Blog", "Click to toggle blog pins.", function () {
		togglePins(blogPins);
	});

	var videoControlDiv = document.createElement('div');
	var videoControl = new MapControl(map, "Video", "Click to toggle video pins.", function () {
		togglePins(videoPins);
	});

	var photoControl = new MapControl(map, "Photo", "Click to toggle photo pins.", function () {
		togglePins(photoPins);
	});

	var charityControl = new MapControl(map, "Charity", "Click to toggle charity pins.", function () {
		togglePins(charityPins);
	});

	var logoControl = new LogoControl();
}

function getJsonPoints() {

	// Retrieve the JSON feed.
	var script = document.createElement('script');

	script.setAttribute('src', '/JSONrouteout?callback=loadJsonPoints');
	script.setAttribute('id', 'jsonScript');
	script.setAttribute('type', 'text/javascript');
	document.documentElement.firstChild.appendChild(script);
}

function loadJsonPoints(json) {

	var finalpt;

	linepoints = new Array();
	linepointsback = new Array();
	for (var i = 0; i < json.data.length; i++) {

		var entry = json.data[i];

		//get lat/lon
		var e = NaN;
		var n = NaN;
		if((entry['latitude'] != null) && (entry['longitude'] != null)){
		  e = parseFloat(entry['longitude']);
		  n = parseFloat(entry['latitude']);
		}
		if (isNaN(e) || isNaN(n)){
			continue;//cant put point on map without a lat/lon
		}

//		var finallat = n;
//		var finallon = e;

		var en = new google.maps.LatLng(n,e);
		// Plot GPS points as a line
		if((entry['type'] == 0)){
			linepoints.push(en)
			finalpt = en;
			latesttime = entry['dateTime']
		}

		// Plot Start Finish Points
		if((entry['type'] == 1)){
			startfinishpt = new google.maps.Marker({
				position: en,
				map: map,
				title:entry['pttitle'],
				icon: finishIcon,
				size: new google.maps.Size(1, 1.5),
				zIndex: 2
			});
		}
		// Plot the video points
		if((entry['type'] == 2)){
			addPin(en, entry['id'], entry['pttitle'], entry['ptdesc'], entry['ptresource'], videoIcon, 3, videoPins)
		}
		// Plot the blog points
		if((entry['type'] == 3)){
			addPin(en, entry['id'], entry['pttitle'], entry['ptdesc'], entry['ptresource'], blogIcon, 3, blogPins)
		}
		// Plot the image points
		if((entry['type'] == 4)){
			addPin(en, entry['id'], entry['pttitle'], entry['ptdesc'], entry['ptresource'], photoIcon, 4, photoPins)
		}
		// Plot any charity 1 points
		if((entry['type'] == 5)){
			addPin(en, entry['id'], entry['pttitle'], entry['ptdesc'], entry['ptresource'], charityIcon, 5, charityPins)
		}
		// Plot any charity 2 points
		if((entry['type'] == 6)){
			addPin(en, entry['id'], entry['pttitle'], entry['ptdesc'], entry['ptresource'], charityIcon, 5, charityPins)
		}

		var en = new google.maps.LatLng(n,e);
		// Plot GPS points as a line
		if((entry['type'] == 7)){
			linepointsback.push(en)
			finalpt = en;
			latesttime = entry['dateTime']
		}
	}

	var finalptpin = new google.maps.Marker({
				position: finalpt,
				map: map,
				title: "CURRENT LOCATION AT " + latesttime,
				icon: carIcon,
				animation: google.maps.Animation.DROP,
				size: new google.maps.Size(1, 1),
				zIndex: 1,
			});

//	getlocaltime(finallat,finallon);

	var Path = new google.maps.Polyline({
			path: linepoints,
			geodesic: true,
			strokeColor: '#FF0000',
			strokeOpacity: 1.0,
			strokeWeight: 2,
			map: map,
			geodesic: true,
			zIndex: 1
	});

	var PathBack = new google.maps.Polyline({
			path: linepointsback,
			geodesic: true,
			strokeColor: '#0000FF',
			strokeOpacity: 1.0,
			strokeWeight: 2,
			map: map,
			geodesic: true,
			zIndex: 1
	});

}

google.maps.event.addDomListener(window, 'load', initialize);
