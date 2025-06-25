from flask import current_app
from werkzeug.security import generate_password_hash, check_password_hash
from app import mongo

class UserModel:
    @staticmethod
    def find_by_username(username):
        return mongo.db.users.find_one({'username': username})

    @staticmethod
    def create(username, password):
        password_hash = generate_password_hash(password)
        user = {'username': username, 'password_hash': password_hash}
        mongo.db.users.insert_one(user)
        return user

    @staticmethod
    def check_password(user, password):
        return check_password_hash(user['password_hash'], password)
