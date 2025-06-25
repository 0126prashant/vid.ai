from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from config import Config

mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    mongo.init_app(app)

    # Register Blueprints
    from .auth import auth_bp
    from .chat import chat_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(chat_bp, url_prefix='/api/chat')

    return app
