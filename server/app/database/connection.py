from pymongo import MongoClient

# 🔥 PASTE YOUR REAL ATLAS CONNECTION STRING BELOW
MONGO_URL = "mongodb+srv://ideapulse:Rnzb4tiN7BUxrFGy@cluster0.wm8wtju.mongodb.net/?appName=Cluster0"

client = MongoClient(MONGO_URL)

# Database name (you can change if you want)
db = client["validateai_db"]

def get_database():
    return db