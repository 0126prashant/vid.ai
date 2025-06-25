from flask import request, jsonify
from . import auth_bp
from app.models.user import UserModel
from app.utils import generate_jwt

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400
    if UserModel.find_by_username(username):
        return jsonify({"error": "Username already exists"}), 400
    UserModel.create(username, password)
    token = generate_jwt(username)
    return jsonify({"token": token, "username": username}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    user = UserModel.find_by_username(username)
    if not user or not UserModel.check_password(user, password):
        return jsonify({"error": "Invalid credentials"}), 401
    token = generate_jwt(username)
    return jsonify({"token": token, "username": username}), 200
