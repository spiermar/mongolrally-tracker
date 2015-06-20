import flickr_api
from flickr_api.flickrerrors import FlickrAPIError
from flask import Response
from datetime import datetime
import logging
import json
from models import Point

api_key = u'4b0b1e20002e36421c9cba280506527e'
api_secret = u'2bde6ed906e7a38d'

flickr_api.set_keys(api_key = api_key, api_secret = api_secret)

def import_photos(username, photoset_title):

    logging.warning(username)

    user = flickr_api.Person.findByUserName(username)
    photosets = user.getPhotosets()

    for photoset in iter(photosets):
        if photoset.title == photoset_title:
            photos = photoset.getPhotos()
            for photo in iter(photos):
                photo_id = int(photo.id)
                latitude = None
            	longitude = None
                timestamp = None
            	title = photo.title
                thumb = None
                image = None
                photopage = None
                info = photo.getInfo()
                taken = info[u'taken']
                timestamp = datetime.strptime(taken, "%Y-%m-%d %H:%M:%S")
                urls = info[u'urls'][u'url']
                for url in urls:
                    if url[u'type'] == 'photopage':
                        photopage = url[u'text']
                        break
                if u'location' in info:
                    location = info[u'location']
                    # locality = location[u'locality']
                    # region = location[u'region']
                    # country = location[u'country']
                    latitude = float(location[u'latitude'])
                    longitude = float(location[u'longitude'])
                    # title =  "%s, %s, %s" % (locality, region, country)
                sizes = photo.getSizes()
                thumb = sizes[u'Square'][u'source']
                image = sizes[u'Medium'][u'source']

            	try:
            	    point = Point(
                        title=title,
                        latitude=latitude,
                        longitude=longitude,
                        type="photo",
                        timestamp=timestamp,
                        pointid=photo_id,
                        # thumb=thumb,
                        # url=photopage,
                        resource=image
                    )
            	    point.put()
            	except AttributeError:
            	    pass
            	except Exception as e:
            	    logging.error(e.args[0])

    return Response(json.dumps({ 'status': 'ok' }), status=200, mimetype='application/json');
