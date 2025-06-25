import jwt
from flask import current_app
from datetime import datetime, timedelta

def generate_jwt(username):
    payload = {
        "username": username,
        "exp": datetime.utcnow() + timedelta(minutes=current_app.config["JWT_EXPIRATION"])
    }
    return jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")

def decode_jwt(token):
    try:
        payload = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
