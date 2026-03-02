from pydantic import BaseModel
from typing import List


class Competitor(BaseModel):
    name: str
    pricing_model: str
    brand_scale: str
    company_type: str
    market_presence: str


class SWOT(BaseModel):
    strengths: List[str]
    weaknesses: List[str]
    opportunities: List[str]
    threats: List[str]


class Breakdown(BaseModel):
    market_index: int
    competition_index: int
    monetization_index: int
    scalability_index: int
    risk_index: int


class IdeaRequest(BaseModel):
    title: str
    description: str
    industry: str
    subdomain: str
    target_audience: str


class IdeaResponse(BaseModel):
    idea_title: str
    industry: str
    subdomain: str
    target_audience: str
    market_summary: str
    competitors: List[Competitor]
    swot: SWOT
    monetization: str
    validation_score: int
    breakdown: Breakdown