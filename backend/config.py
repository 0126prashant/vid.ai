import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "change-this-secret")
    MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017/aichatbot")
    OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
    JWT_EXPIRATION = 60 * 24 * 7  # 1 week (in minutes)
