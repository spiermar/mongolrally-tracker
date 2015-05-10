from flask import Response
import json
import urllib2
from pykml import parser
import logging
from datetime import datetime
from models import Point

def load_data(url):
    obj = urllib2.urlopen(url)
    root = parser.parse(obj).getroot()
    for placemark in root.Document.Folder.Placemark:
        try:
            point = None
            extended_data = placemark.ExtendedData.Data
            pointid = None
            for data in extended_data:
                if data.attrib['name'] == 'Id':
                    pointid = int(data.value.text)
                    break
            if pointid is not None:
                point = Point.query(Point.pointid == pointid).get()
            if point is None:
                title = placemark.name.text
                coordinates = placemark.Point.coordinates.text.split(',')
                latitude = float(coordinates[1])
                longitude = float(coordinates[0])
                timestamp = datetime.strptime(placemark.TimeStamp.when.text, "%Y-%m-%dT%H:%M:%SZ")

                point = Point(
                    title=title,
                    latitude=latitude,
                    longitude=longitude,
                    type="tracker",
                    timestamp=timestamp,
                    pointid=pointid
                )
                point.put()
        except AttributeError:
            pass
        except Exception as e:
            logging.error(e.args[0])

    return Response(json.dumps({ 'status': 'ok' }), status=200, mimetype='application/json');
