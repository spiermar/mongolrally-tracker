"""
views.py

URL route handlers

Note that any handler params must match the URL route params.
For example the *say_hello* handler, handling the URL route '/hello/<username>',
  must be passed *username* as the argument.

"""

from flask import request, Response
from pykml import parser
import urllib2
import time
import json

from tracker import app

from models import Point

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

@app.route('/api/v1/points/route/load', methods=['POST'])
def load_route():
    url = request.form['url']
    obj = urllib2.urlopen(url)
    str = obj.read()
    kml_str = ""
    for line in iter(str.splitlines()):
        if not 'atom:link' in line:
            kml_str+=line
            kml_str+='\n'

    Point.delete_all('route')

    root = parser.fromstring(kml_str)

    id = 0
    for placemark in root.Document.Folder.Placemark:
        coordinates = placemark.MultiGeometry.Point.coordinates.text.split(',')
        try:
            point = Point(
                title = placemark.name.text,
                type = 'route',
                latitude = float(coordinates[1]),
                longitude = float(coordinates[0]),
                id = id
            )
        except TypeError:
            abort(500)
        except Exception as e:
            logging.error(e.args[0])
            abort(500)
        try:
            point.put()
        except CapabilityDisabledError:
            logging.error(u'App Engine Datastore is currently in read-only mode.')
            abort(500)
        except Exception as e:
            logging.error(e.args[0])
            abort(500)

        id +=1

    return list_point('route')

@app.route('/api/v1/points/<type>', methods=['GET'])
def list_point(type):
    points_dict = []
    points = Point.query(Point.type == type).order(Point.date, Point.id).fetch()
    for point in points:
        points_dict.append(point.to_dict())

    return Response(json.dumps(points_dict), mimetype='application/json');
