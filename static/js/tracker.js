var sficon = 'images/finishflag.png';	// start finish icon
var blogicon = 'images/blogmarker.png';	// blog icon
var vicon = 'images/videomarker.png';	// video icon
var imgicon = 'images/imgmarker.png';	// image icon
var charityicon = 'images/imgmac.png';		// charity icon
var caricon = 'images/car.png';	// car icon

stateimg = false;
stateblog = false;
statecharity = false;
statevideo = false;

blogpts = new Object();
vpts = new Object();
imgpts = new Object();
charitypts = new Object();


//object to hold all the info about a pin;
function pin (marker, id, title, desc, resource)
{
	this.marker = marker;
	this.id = id;
	this.pttitle = title;
	this.ptdesc = desc;
	this.ptresource = resource;
	return this;
}

/**
* The MapControl adds a control to the map that recenters the map on Chicago.
* This constructor takes the control DIV as an argument.
* @constructor
*/
function MapControl(controlDiv, map, title, text, callback) {

	// Set CSS for the control border
	var controlUI = document.createElement('div');
	controlUI.style.backgroundColor = '#fff';
	controlUI.style.border = '2px solid #fff';
	controlUI.style.borderRadius = '3px';
	controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
	controlUI.style.cursor = 'pointer';
	controlUI.style.marginBottom = '22px';
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

	// Setup the click event listeners: simply set the map to
	// Chicago
	google.maps.event.addDomListener(controlUI, 'click', callback);

}

function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(43.2358808,51.7155101),
		zoom: 4,
		mapTypeId: google.maps.MapTypeId.HYBRID,
		streetViewControl: false,
		scaleControl: true
	};
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	//load the spreadsheet data
	getJsonPoints();

	var blogControlDiv = document.createElement('div');
	var blogControl = new CenterControl(blogControlDiv, map, "", "", function () {
		toggleblogvis();
	});
	blogControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(blogControlDiv);
}

function mapcontrols(controlDiv) {

	var width = window.innerWidth;

	controlDiv.style.padding = '5px';

	// Set CSS for the control border.
	var blogUI = document.createElement('div');
	if (width > 1000){
		blogUI.style.backgroundColor = 'white';
		blogUI.style.borderStyle = 'solid';
		blogUI.style.borderWidth = '2px';
		blogUI.title = 'Click to show blogs';
	}
	blogUI.style.cursor = 'pointer';
	blogUI.style.textAlign = 'center';
	controlDiv.appendChild(blogUI);

	// Set CSS for the control interior.
	var blogText = document.createElement('div');
	blogText.style.fontFamily = 'Arial,sans-serif';
	blogText.style.fontSize = '12px';
	if (width < 1000){
		blogText.innerHTML = '<img src="images/blog.png" width="30" height="30">';
		blogText.style.paddingLeft = '4px';
		blogText.style.paddingRight = '4px';
	} else {
		blogText.innerHTML = '<strong>Show/Hide Blogs</strong>';
	}
	blogUI.appendChild(blogText);

	google.maps.event.addDomListener(blogUI, 'click', function() {
		toggleblogvis();
	});

	// Set CSS for the control border.
	var videoUI = document.createElement('div');
	if (width > 1000){
		videoUI.style.backgroundColor = 'white';
		videoUI.style.borderStyle = 'solid';
		videoUI.style.borderWidth = '2px';
		videoUI.title = 'Click to show videos';
	}
	videoUI.style.cursor = 'pointer';
	videoUI.style.textAlign = 'center';
	controlDiv.appendChild(videoUI);

	// Set CSS for the control interior.
	var videoText = document.createElement('div');
	videoText.style.fontFamily = 'Arial,sans-serif';
	videoText.style.fontSize = '12px';
	if (width < 1000){
		videoText.innerHTML = '<img src="images/videos.png" width="30" height="30">';
		videoText.style.paddingLeft = '4px';
		videoText.style.paddingRight = '4px';
	} else {
		videoText.innerHTML = '<strong>Show/Hide Videos</strong>';
	}
	videoUI.appendChild(videoText);

	google.maps.event.addDomListener(videoUI, 'click', function() {
		togglevidvis();
	});

	// Set CSS for the control border.
	var imgUI = document.createElement('div');
	if (width > 1000){
		imgUI.style.backgroundColor = 'white';
		imgUI.style.borderStyle = 'solid';
		imgUI.style.borderWidth = '2px';
		imgUI.title = 'Click to show photos';
	}
	imgUI.style.cursor = 'pointer';
	imgUI.style.textAlign = 'center';
	controlDiv.appendChild(imgUI);

	// Set CSS for the control interior.
	var imgText = document.createElement('div');
	imgText.style.fontFamily = 'Arial,sans-serif';
	imgText.style.fontSize = '12px';
	if (width < 1000){
		imgText.innerHTML = '<strong><img src="images/photos.png" width="30" height="30"></strong>';
		imgText.style.paddingLeft = '4px';
		imgText.style.paddingRight = '4px';
	} else {
		imgText.innerHTML = '<strong>Show/Hide Photos</strong>';
	}
	imgUI.appendChild(imgText);

	google.maps.event.addDomListener(imgUI, 'click', function() {
		toggleimgvis();
	});

	// Set CSS for the control border.
	var charityUI = document.createElement('div');
	if (width > 1000){
		charityUI.style.backgroundColor = 'white';
		charityUI.style.borderStyle = 'solid';
		charityUI.style.borderWidth = '2px';
		charityUI.title = 'Click to show good stuff';
	}
	charityUI.style.cursor = 'pointer';
	charityUI.style.textAlign = 'center';
	controlDiv.appendChild(charityUI);

	// Set CSS for the control interior.
	var charityText = document.createElement('div');
	if (width < 1000){
		charityText.innerHTML = '<strong><img src="images/goodstuff.png" width="30" height="30"></strong>';
	} else {
		charityText.style.fontFamily = 'Arial,sans-serif';
		charityText.style.fontSize = '12px';
		charityText.style.paddingLeft = '4px';
		charityText.style.paddingRight = '4px';
		charityText.innerHTML = '<strong>Show/Hide Good Stuff</strong>';
	}
	charityUI.appendChild(charityText);

	google.maps.event.addDomListener(charityUI, 'click', function() {
		togglecharityvis();
	});

	// Set CSS for the control border.
	var vgivingUI = document.createElement('div');
//	vgivingUI.style.backgroundColor = 'white';
//	vgivingUI.style.borderStyle = 'solid';
	vgivingUI.style.borderWidth = '0px';
	vgivingUI.style.cursor = 'pointer';
	vgivingUI.style.textAlign = 'center';
//	vgivingUI.title = 'Click to help good stuff';
	controlDiv.appendChild(vgivingUI);

	// Set CSS for the control interior.
	var vgivingText = document.createElement('div');
//	vgivingText.style.fontFamily = 'Arial,sans-serif';
//	vgivingText.style.fontSize = '12px';
//	vgivingText.style.paddingLeft = '4px';
//	vgivingText.style.paddingRight = '4px';
	if (width < 1000){
		vgivingText.innerHTML = '<br><img src="images/vgivingbut.png" width="50" height="66">';
	} else {
		vgivingText.innerHTML = '<br><img src="images/vgiving.png" width="149" height="62">';
	}
	vgivingUI.appendChild(vgivingText);

	google.maps.event.addDomListener(vgivingUI, 'click', function() {
		window.open('http://uk.virginmoneygiving.com/fundraiser-web/fundraiser/showFundraiserProfilePage.action?userUrl=gingerbreadrally', '_blank');
	});
}

function bannercontrolpanel(controlDiv) {

	controlDiv.style.padding = '5px';

	var width = window.innerWidth;
	var height = window.innerHeight;

	// Set CSS for the control border.
	var logoUI = document.createElement('div');
//	logoUI.style.backgroundColor = 'white';
//	logoUI.style.borderStyle = 'solid';
	logoUI.style.borderWidth = '0px';
	logoUI.style.cursor = 'pointer';
	logoUI.style.textAlign = 'center';
	logoUI.title = 'Gingerbread Logo';
	controlDiv.appendChild(logoUI);

	var imgw = screen.width * 0.3;
	var ratio = imgw / 432;
	var imgh = 100 * ratio;

	// Set CSS for the control interior.
	var logoText = document.createElement('div');
	logoText.style.fontFamily = 'Arial,sans-serif';
	logoText.style.fontSize = '12px';
	logoText.style.paddingLeft = '4px';
	logoText.style.paddingRight = '4px';
	logoText.innerHTML = '<img src="images/Orange2.png" width="' + imgw + '" height="' + imgh + '">'; //432 x 100
	logoUI.appendChild(logoText);

	google.maps.event.addDomListener(logoUI, 'click', function() {
		window.open('http://thegingerbreadmen.wix.com/rally', '_blank');
	});
}

function toggleblogvis() {
	console.log('MADE IT HERE');
	if (stateblog==true){
		stateblog = false;
	}
	else {
		stateblog = true;
	}
	for (var prop in blogpts) {
		var obj = blogpts[prop];
		obj.marker.setVisible(stateblog);
	}
}

function togglevidvis() {
	console.log('MADE IT HERE');
	if (statevideo==true){
		statevideo = false;
	}
	else {
		statevideo = true;
	}
	for (var prop in vpts) {
		var obj = vpts[prop];
		obj.marker.setVisible(statevideo);
	}
}

function toggleimgvis() {
	if (stateimg==true){
		stateimg = false;
	}
	else {
		stateimg = true;
	}
	for (var prop in imgpts) {
		var obj = imgpts[prop];
		obj.marker.setVisible(stateimg);
	}
}

function togglecharityvis() {
	if (statecharity==true){
		statecharity = false;
	}
	else {
		statecharity = true;
	}
	for (var prop in charitypts) {
		var obj = charitypts[prop];
		obj.marker.setVisible(statecharity);
	}
}

function getJsonPoints() {

	// Retrieve the JSON feed.
	var script = document.createElement('script');

	script.setAttribute('src', '/JSONrouteout?callback=loadJsonPoints');
	script.setAttribute('id', 'jsonScript');
	script.setAttribute('type', 'text/javascript');
	document.documentElement.firstChild.appendChild(script);
}

// popup tabbed info for a pinned photo
function showImgInfo(imgno)
{
	console.log('MADE IT HERE' + imgno);
    var pin;
	if (imgno in imgpts){
		pin = imgpts[imgno];
	}
	else{
		return;
	}
	console.log('MADE IT TO THE NEXT STEP' + pin);

    //default width
	w = 352;
    h = 264;

    w = w.toFixed(0);//whole pixels for the html
    h = h.toFixed(0);

    // make infoWindow html for the photo
    var html = "<b>" + pin.pttitle + "</b>";
    html += "<p><img id='iwimg' src='" + pin.ptresource + "'";
    html += " width=" + w + "px height=" + h + "px";
    html += "></img></p>";
	html += pin.ptdesc;

	var infowindow = new google.maps.InfoWindow({
		content: html
	});

	infowindow.open(map, pin.marker)
}

// popup tabbed info for a pinned photo
function showVidInfo(vidno)
{
	console.log('MADE IT HERE' + vidno);
    var pin;
	if (vidno in vpts){
		pin = vpts[vidno];
	}
	else{
		return;
	}
	console.log('MADE IT TO THE NEXT STEP' + pin);

    //default width
	w = 352;
    h = 198;

    w = w.toFixed(0);//whole pixels for the html
    h = h.toFixed(0);

    // make infoWindow html for the photo
    var html = "<b>" + pin.pttitle + "</b>";
    html += "<p><div id='fb-root'></div> <script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = '//connect.facebook.net/en_GB/all.js#xfbml=1'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'facebook-jssdk'));</script>"
	html += "<div class='fb-post' data-href='" + pin.ptresource + "' data-width='466'><div class='fb-xfbml-parse-ignore'><a href='" + pin.ptresource + " target='_blank'>Click for Video</a> by <a href='https://www.facebook.com/thegingerbreadrally' target='_blank'>The Gingerbread Men - Mongol Rally 2014 Team</a>.</div></div></p>";
	html += pin.ptdesc;

	var infowindow = new google.maps.InfoWindow({
		content: html
	});

	infowindow.open(map, pin.marker)
}

// popup tabbed info for a pinned photo
function showBlogInfo(blogno)
{
    var bpin;
	if (blogno in blogpts){
		bpin = blogpts[blogno];
	}
	else{
		return;
	}

    //default width
	w = 352;
    h = 198;

    w = w.toFixed(0);//whole pixels for the html
    h = h.toFixed(0);

    // make infoWindow html for the photo
    var html = "<b>" + bpin.pttitle + "</b>";
	html += "<p><img src='/images/logo.png' width='100' height='100'></p>";
    html += "<p><a href='" + bpin.ptresource + "' target='_blank'>Click here to go to our blog</a></p>";
	html += bpin.ptdesc;

	var infowindow = new google.maps.InfoWindow({
		content: html
	});

	infowindow.open(map, bpin.marker)
}

// popup tabbed info for a pinned photo
function showCharityInfo(charno)
{
    var cpin;
	if (charno in charitypts){
		cpin = charitypts[charno];
	}
	else{
		return;
	}

    //default width
	w = 352;
    h = 198;

    w = w.toFixed(0);//whole pixels for the html
    h = h.toFixed(0);
	if(cpin.charity==1){
    // make infoWindow html for the photo
		var html = "<b>MacMillan Cancer Support</b>";
		html += "<p>" + cpin.ptdesc + "</p>";
		html += "<p>To learn more click the logo:<br><a href='" + cpin.ptresource + "'><img src='images/M_mid_RGB.jpg' width='352' height='146'></a></p>"
		html += "<p><a href='http://uk.virginmoneygiving.com/team/gingerbreadmenrally' target='_blank'><img src='/images/vgiving.gif'></a></p>";
	} else {
		if(cpin.charity==2){
			// make infoWindow html for the photo
			var html = "<b>Cool Earth</b>";
			html += "<p>"+ cpin.ptdesc + "</p>";
			html += "<p>To learn more click the logo:<br><a href='" + cpin.ptresource + "'><img src='images/celogo.png' width='352' height='105'></a></p>"
			html += "<p><a href='http://uk.virginmoneygiving.com/team/gingerbreadmenrally' target='_blank'><img src='/images/vgiving.gif'></a></p>";
		}
	}

	var infowindow = new google.maps.InfoWindow({
		content: html
	});

	infowindow.open(map, cpin.marker)
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
				icon: sficon,
				size: new google.maps.Size(1, 1.5),
				zIndex: 2
			});
		}
		// Plot the video points
		if((entry['type'] == 2)){
			addVideoPt(en, entry['id'], entry['pttitle'], entry['ptdesc'], entry['ptresource'])
		}
		// Plot the blog points
		if((entry['type'] == 3)){
			addBlogPt(en, entry['id'], entry['pttitle'], entry['ptdesc'], entry['ptresource'])
		}
		// Plot the image points
		if((entry['type'] == 4)){
			addImgPt(en, entry['id'], entry['pttitle'], entry['ptdesc'], entry['ptresource'])
		}
		// Plot any charity 1 points
		if((entry['type'] == 5)){
			addCharityPt(en, entry['id'], entry['pttitle'], entry['ptdesc'], entry['ptresource'], 1)
		}
		// Plot any charity 2 points
		if((entry['type'] == 6)){
			addCharityPt(en, entry['id'], entry['pttitle'], entry['ptdesc'], entry['ptresource'], 2)
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
				icon: caricon,
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

function addImgPt(imgloc, imgid, imgtitle, imgdesc, imgresource){
	var imgpt = new google.maps.Marker({
				position: imgloc,
				map: map,
				title: imgtitle,
				icon: imgicon,
				size: new google.maps.Size(1, 1),
				zIndex: 5,
				visible: false
			});
			var imgptplus = new pin(imgpt, imgid, imgtitle, imgdesc, imgresource);
			imgpts[imgid] = imgptplus;
			new google.maps.event.addListener(imgptplus.marker, 'click', function() {
				showImgInfo(imgid);
			});
}

function addBlogPt(blogloc, blogid, blogtitle, blogdesc, blogresource){
	blogpt = new google.maps.Marker({
				position: blogloc,
				map: map,
				title: blogtitle,
				icon: blogicon,
				size: new google.maps.Size(1, 1),
				zIndex: 4,
				visible: false
			});
			var blogptplus = new pin(blogpt, blogid, blogtitle, blogdesc, blogresource);
			blogpts[blogid] = blogptplus;
			new google.maps.event.addListener(blogptplus.marker, 'click', function() {
				showBlogInfo(blogid);
			});
}

function addCharityPt(charityloc, charityid, charitytitle, charitydesc, charityresource, charity){
	charitypt = new google.maps.Marker({
				position: charityloc,
				map: map,
				title: charitytitle,
				icon: charityicon,
				size: new google.maps.Size(1, 1),
				zIndex: 4,
				visible: false
			});
			var charityptplus = new pin(charitypt, charityid, charitytitle, charitydesc, charityresource);
			charitypts[charityid] = charityptplus;
			new google.maps.event.addListener(charityptplus.marker, 'click', function() {
				showCharityInfo(charityid);
			});
}

function addVideoPt(vidloc, vidid, vidtitle, viddesc, vidresource){
	videopt = new google.maps.Marker({
				position: vidloc,
				map: map,
				title: vidtitle,
				icon: vicon,
				size: new google.maps.Size(1, 1),
				zIndex: 4,
				visible: false
			});
			var videoptplus = new pin(videopt, vidid, vidtitle, viddesc, vidresource);
			vpts[vidid] = videoptplus;
			new google.maps.event.addListener(videoptplus.marker, 'click', function() {
				showVidInfo(vidid);
			});
}

google.maps.event.addDomListener(window, 'load', initialize);
