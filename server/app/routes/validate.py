from fastapi import APIRouter
from app.schemas.idea_schema import IdeaRequest
from app.controllers.validate_controller import validate_idea

router = APIRouter()

@router.post("/validate")
def validate(data: IdeaRequest):
    return validate_idea(data)