import json

import sys

import hashlib

import urlparse
from instagram.client import InstagramAPI
from instagram.helper import datetime_to_timestamp

api = None

def get_media(media=None, max_id=None):

    if media is None:
        media = []

    response, next = api.user_recent_media(max_id=max_id)

    for media_item in response:
        media.append(media_item)

    if next is not None:
        parsednext = urlparse.urlparse(next)
        max_id = urlparse.parse_qs(parsednext.query)['max_id'][0]
        media = get_media(media, max_id)

    return media


def import_photos(access_token, client_secret):

    global api = InstagramAPI(access_token=access_token, client_secret=client_secret)

    m = hashlib.md5()

    media = get_media()
    
    for item in media:
        m.update(item.id)
        pointid = int(m.hexdigest(), 16)
        title = None
        if hasattr(item, 'caption'):
            title = item.caption
        if hasattr(item, 'location'):
            if item.location.point is not None:
                latitude = item.location.point.latitude
                longitude = item.location.point.longitude
        timestamp = item.created_time
        thumb = item.images['thumbnail']
        photo = item.images['standard_resolution']
        resource = item.link

        try:
            point = Point(
                title=title,
                latitude=latitude,
                longitude=longitude,
                type='photo',
                timestamp=timestamp,
                pointid=photoid,
                thumb=thumb,
                photo=photo,
                resource=resource
            )
            point.put()
        except AttributeError:
            pass
        except Exception as e:
            logging.error(e.args[0])

    return Response(json.dumps({ 'status': 'ok' }), status=200, mimetype='application/json');
