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

	map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(homeControlDiv);
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(bannerControlDiv);

	google.maps.event.addDomListener(window, 'load', initialize);
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

	// var route = Path.getPath();
	// var lengthmts = route.computeLength();
	// var lengthmile = lengthmts/1000/1.6;

	// alert(route + "distance travelled = " + lengthmile);
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
				icon: charityiconpt,
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

//function getlocaltime(lat,lon){
	// Retrieve the JSON feed.
//	var script1 = document.createElement('script');

//	script1.setAttribute('src', '/time?lat=' + lat + '&lon=' + lon);
//	script1.setAttribute('id', 'timeScript');
//	script1.setAttribute('type', 'text/javascript');
//	document.documentElement.firstChild.appendChild(script1);
//	console.log('I have asked for the latest time');
//}

//function timeret(jsonback){
//	console.log('I have received a time back');
//	for (var i = 0; i < jsonback.data.length; i++) {
//		var entry = jsonback.data[i];
//	}
//}

google.maps.event.addDomListener(window, 'load', initialize);
