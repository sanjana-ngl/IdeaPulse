from pydantic import BaseModel
from typing import List


class IdeaRequest(BaseModel):
    title: str
    description: str
    target_audience: str
    industry: str


class SWOT(BaseModel):
    strengths: str
    weaknesses: str
    opportunities: str
    threats: str


class AnalysisData(BaseModel):
    title: str
    description: str
    target_audience: str
    industry: str
    market_summary: str
    competitors: List[str]
    swot: SWOT
    monetization: str
    feasibility: str
    validation_score: int


class IdeaResponse(BaseModel):
    idea_id: str
    analysis: AnalysisData