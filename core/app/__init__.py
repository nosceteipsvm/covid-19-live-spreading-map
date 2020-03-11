from flask import Flask
from flask_cors import CORS

app = Flask(__name__) # Init App
CORS(app) # Enable CORS

from app import routes