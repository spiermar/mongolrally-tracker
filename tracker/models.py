"""
models.py

App Engine datastore models

"""

from google.appengine.ext import ndb
import logging

class Point(ndb.Model):
    title = ndb.StringProperty()
    desc = ndb.StringProperty()
    latitude = ndb.FloatProperty(required=True)
    longitude = ndb.FloatProperty(required=True)
    resource = ndb.StringProperty()
    type = ndb.StringProperty(required=True)
    timestamp = ndb.DateTimeProperty(required=True)
    pointid = ndb.IntegerProperty()
    hide = ndb.BooleanProperty(default=False)

    @classmethod
    def delete_all(cls, delete_type):
        ndb.delete_multi(
            cls.query(cls.type == delete_type).fetch(keys_only=True)
        )
        return True

    def to_dict(self):
        result = super(Point,self).to_dict()
        result['id'] = self.key.id()
        try:
            if self.timestamp is not None:
                result['timestamp'] = self.timestamp.strftime("%Y-%m-%dT%H:%M:%S.000Z")
        except BadValueError:
            logging.error("Timestamp property doesn't exist")
            result['timestamp'] = None

        return result


class Config(ndb.Model):
    name = ndb.StringProperty(required=True)
    value = ndb.StringProperty(required=True)
    date_added = ndb.DateTimeProperty(auto_now=True)

    def to_dict(self):
        result = super(Config,self).to_dict()
        del result['date_added']
        return result
