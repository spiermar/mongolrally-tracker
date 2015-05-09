from flask import Response
import json
import urllib2
from pykml import parser
import logging

def load_data(url):
    obj = urllib2.urlopen(url)
    root = parser.parse(obj).getroot()
    placemarks = []
    for placemark in root.Document.Folder.Placemark:
        try:
            title = placemark.name.text
            coordinates = placemark.Point.coordinates.text.split(',')
            latitude = float(coordinates[1])
            longitude = float(coordinates[0])
            timestamp = placemark.TimeStamp.when.text
            placemarks.append({ "title": title, "latitude": latitude, "longitude": longitude, "timestamp": timestamp, "type": "tracker" })
        except AttributeError:
            pass
        except Exception as e:
            logging.error(e.args[0])

    return Response(json.dumps({ 'placemarks': placemarks }), status=200, mimetype='application/json');
