from app import mongo
from datetime import datetime

class ChatModel:
    @staticmethod
    def save_message(username, user_message, ai_message):
        chat = {
            "username": username,
            "user_message": user_message,
            "ai_message": ai_message,
            "timestamp": datetime.utcnow()
        }
        mongo.db.chats.insert_one(chat)
        return chat

    @staticmethod
    def get_history(username, limit=20):
        return list(mongo.db.chats.find({"username": username}).sort("timestamp", -1).limit(limit))
