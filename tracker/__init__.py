"""
Initialize Flask app

"""

from flask import Flask
import logging

app = Flask(__name__)

import views
