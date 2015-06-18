import flickrapi
from flask import Response
from datetime import datetime
import logging
from models import Point

api_key = u'4b0b1e20002e36421c9cba280506527e'
api_secret = u'2bde6ed906e7a38d'

flickr = flickrapi.FlickrAPI(api_key, api_secret, format='parsed-json')

def import_photos(user_id, photoset_id):

    photoset = flickr.photosets.getPhotos(photoset_id=photoset_id, user_id=user_id).get('photoset')

    for photo in photoset.get('photo'):
        photo_id = photo.get(u'id')
        latitude = None
    	longitude = None
        timestamp = None
    	title = ''
        thumb = None
        image = None
        url = None

        point = Point.query(Point.pointid == photo_id).get()
        if point is None:
        	info = flickr.photos.getInfo(photo_id=photo_id)
        	if info.get(u'stat') == u'ok':
        		urls = info.get(u'photo').get(u'urls').get(u'url')
        		for url in urls:
        			if url.get(u'type') == 'photopage':
        				url = url.get(u'_content')
                taken = info.get(u'photo').get(u'dates').get(u'taken')
                timestamp = datetime.strptime(taken, "%Y-%m-%d %H:%M:%S")

        	sizes = flickr.photos.getSizes(photo_id=photo_id)
        	if sizes.get(u'stat') == u'ok':
        		size_list = sizes.get(u'sizes').get(u'size')
        		for size in size_list:
        			label =  size.get(u'label')
        			if label == 'Square':
        				thumb = size.get(u'source')
        			if label == 'Medium':
        				image = size.get(u'source')

        	geo = flickr.photos.geo.getLocation(photo_id=photo_id)
        	if geo.get(u'stat') == u'ok':
        		location = geo.get(u'photo').get(u'location')
        		locality = location.get(u'locality').get(u'_content')
        		region = location.get(u'region').get(u'_content')
        		country = location.get(u'country').get(u'_content')
        		latitude = location.get(u'latitude')
        		longitude = location.get(u'longitude')
        		title =  "%s, %s, %s" % (locality, region, country)

        	try:
        	    point = Point(
                    title=title,
                    latitude=latitude,
                    longitude=longitude,
                    type="photo",
                    timestamp=timestamp,
                    pointid=photo_id,
                    # thumb=thumb,
                    # url=url,
                    resource=image
                )
        	    point.put()
        	except AttributeError:
        	    pass
        	except Exception as e:
        	    logging.error(e.args[0])

    return Response(json.dumps({ 'status': 'ok' }), status=200, mimetype='application/json');
