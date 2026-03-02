from pydantic import BaseModel
from typing import List


class SWOTModel(BaseModel):
    strengths: List[str]
    weaknesses: List[str]
    opportunities: List[str]
    threats: List[str]


class BreakdownModel(BaseModel):
    market_index: int
    competition_index: int
    monetization_index: int
    scalability_index: int
    risk_index: int


class IdeaResponse(BaseModel):
    idea_title: str
    industry: str
    subdomain: str
    target_audience: str

    market_summary: str
    competitors: List[str]

    swot: SWOTModel

    monetization: str

    validation_score: float   # 🔥 MUST BE FLOAT

    breakdown: BreakdownModel