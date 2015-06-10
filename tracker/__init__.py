"""
Initialize Flask app

"""

from flask import Flask
import logging
import os


app = Flask(__name__, static_folder=os.getcwd() + '/static', static_url_path='', template_folder=os.getcwd() + '/templates')

app.secret_key = '6yU5561yRuhVksj8<453(-ZS69"0s3kzTAbCETvUA3^A?AJri4BTy4`drV|.2?9'

import views
