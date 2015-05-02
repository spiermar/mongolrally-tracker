"""
Initialize Flask app

"""

from flask import Flask
import logging

app = Flask(__name__)

# Pull in URL dispatch routes
import urls
