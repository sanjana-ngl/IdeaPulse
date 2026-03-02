from pydantic import BaseModel
from typing import List


# -------- Request Schema --------

class IdeaRequest(BaseModel):
    title: str
    description: str
    industry: str
    subdomain: str
    target_audience: str


# -------- SWOT Schema --------

class SWOTModel(BaseModel):
    strengths: List[str]
    weaknesses: List[str]
    opportunities: List[str]
    threats: List[str]


# -------- Breakdown Schema --------

class BreakdownModel(BaseModel):
    market_index: int
    competition_index: int
    monetization_index: int
    scalability_index: int
    risk_index: int


# -------- Response Schema --------

class IdeaResponse(BaseModel):
    idea_title: str
    industry: str
    subdomain: str
    target_audience: str

    market_summary: str
    competitors: List[str]

    swot: SWOTModel

    monetization: str

    validation_score: float   # 🔥 must be float

    breakdown: BreakdownModel