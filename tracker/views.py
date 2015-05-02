"""
views.py

URL route handlers

Note that any handler params must match the URL route params.
For example the *say_hello* handler, handling the URL route '/hello/<username>',
  must be passed *username* as the argument.

"""

from flask import jsonify
from pykml import parser
import urllib2
import time

def load_route():
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

	return jsonify({"placemarks": placemarks})
