"""
models.py

App Engine datastore models

"""

from google.appengine.ext import ndb

class Point(ndb.Model):
    title = ndb.StringProperty()
    desc = ndb.StringProperty()
    latitude = ndb.FloatProperty(required=True)
    longitude = ndb.FloatProperty(required=True)
    resource = ndb.StringProperty()
    type = ndb.StringProperty(required=True)
    id = ndb.IntegerProperty()
    date = ndb.DateTimeProperty()

    @classmethod
    def delete_all(cls, delete_type):
        ndb.delete_multi(
            cls.query(cls.type == delete_type).fetch(keys_only=True)
        )
        return True
