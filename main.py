import os
from flask import Flask, jsonify
from pykml import parser
import logging
import urllib2
import json
import time

app = Flask(__name__)


@app.errorhandler(404)
def page_not_found(e):
	"""Return a custom 404 error."""
	return 'Sorry, Nothing at this URL.', 404


@app.errorhandler(500)
def page_not_found(e):
	"""Return a custom 500 error."""
	return 'Sorry, unexpected error: {}'.format(e), 500


@app.route("/_ah/warmup")
def warmup():
	return ''

@app.route("/api/v1/points/route")
def loadRoute():
	url = 'http://www.tripline.net/api/ge_kml.php/Yakin%27_Around_-_Mongol_Rally_2015.kml?t_id=5153405654401010A51AE94C52C5337F'

	obj = urllib2.urlopen(url)

	str = obj.read()

	kml_str = ""

	for line in iter(str.splitlines()):
		if not 'atom:link' in line:
			kml_str+=line
			kml_str+='\n'

	root = parser.fromstring(kml_str)

	placemarks = []

	for placemark in root.Document.Folder.Placemark:
		coordinates = placemark.MultiGeometry.Point.coordinates.text.split(',')
		placemarks.append({"id": placemark.attrib["id"], "latitude": coordinates[1], "longitude": coordinates[0], "title": placemark.name.text, "desc": "Route Point", "resource": "", "dateTime": time.time(), "type": 1})

	return json.dumps(placemarks)
