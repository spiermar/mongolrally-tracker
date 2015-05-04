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
    date = ndb.DateTimeProperty()
    pointid = ndb.IntegerProperty()

    @classmethod
    def delete_all(cls, delete_type):
        ndb.delete_multi(
            cls.query(cls.type == delete_type).fetch(keys_only=True)
        )
        return True

    def to_dict(self):
        result = super(Point,self).to_dict()
        result['id'] = self.key.id()
        return result
