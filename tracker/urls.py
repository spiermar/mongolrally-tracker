"""
urls.py

URL dispatch route mappings and error handlers

"""

from tracker import app
from tracker import views

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

app.add_url_rule("/api/v1/points/route", 'load_route', view_func=views.load_route)
