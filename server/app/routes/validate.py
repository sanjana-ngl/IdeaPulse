from fastapi import APIRouter
from app.schemas.idea_schema import IdeaRequest
from app.schemas.idea_schema import IdeaResponse
from app.controllers.validate_controller import validate_idea

router = APIRouter()

@router.post("/validate", response_model=IdeaResponse)
def validate(data: IdeaRequest):
    return validate_idea(data)
