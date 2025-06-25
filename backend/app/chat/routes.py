from flask import request, jsonify
from . import chat_bp
from app.utils import decode_jwt
from app.models.chat import ChatModel
from app.ai.openai_client import ask_openai

def get_username_from_header():
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return None
    token = auth.split(" ")[1]
    payload = decode_jwt(token)
    if payload:
        return payload["username"]
    return None

@chat_bp.route("", methods=["POST"])
def chat():
    username = get_username_from_header()
    if not username:
        return jsonify({"error": "Unauthorized"}), 401
    data = request.get_json()
    user_message = data.get("message")
    if not user_message:
        return jsonify({"error": "Missing message"}), 400
    try:
        ai_message = ask_openai(user_message)
        ChatModel.save_message(username, user_message, ai_message)
        return jsonify({"reply": ai_message})
    except Exception as e:
        return jsonify({"error": "AI backend error", "detail": str(e)}), 500

@chat_bp.route("/history", methods=["GET"])
def chat_history():
    username = get_username_from_header()
    if not username:
        return jsonify({"error": "Unauthorized"}), 401
    history = ChatModel.get_history(username)
    for item in history:
        item["_id"] = str(item["_id"])
    return jsonify(history)
