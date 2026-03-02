from app.database.connection import get_database
from bson import ObjectId

db = get_database()
collection = db["ideas"]

def save_idea(data: dict):
    result = collection.insert_one(data)
    return str(result.inserted_id)

def get_idea(idea_id: str):
    return collection.find_one({"_id": ObjectId(idea_id)})