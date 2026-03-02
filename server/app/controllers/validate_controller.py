from app.services.ai_service import analyze_idea
from app.services.scenario_service import calculate_score
from app.schemas.idea_schema import IdeaRequest


def classify_market_presence(company_type: str, brand_scale: str):

    if company_type == "Public Company":
        return "High"

    if brand_scale == "Global":
        return "High"

    if brand_scale == "Regional":
        return "Medium"

    return "Low"


def validate_idea(data: IdeaRequest):

    # 🔥 AI structured enrichment
    ai_result = analyze_idea(
        data.title,
        data.description,
        data.industry,
        data.subdomain,
        data.target_audience,
    )

    # 🔥 Deterministic scoring engine
    score_data = calculate_score(ai_result)

    # 🔥 Structured competitor classification
    structured_competitors = []

    for comp in ai_result["competitors"]:

        presence = classify_market_presence(
            comp["company_type"],
            comp["brand_scale"]
        )

        structured_competitors.append({
            "name": comp["name"],
            "pricing_model": comp["pricing_model"],
            "brand_scale": comp["brand_scale"],
            "company_type": comp["company_type"],
            "market_presence": presence
        })

    return {
        "idea_title": data.title,
        "industry": data.industry,
        "subdomain": data.subdomain,
        "target_audience": data.target_audience,
        "market_summary": ai_result["market_summary"],
        "competitors": structured_competitors,
        "swot": ai_result["swot"],
        "monetization": ai_result["monetization"],
        "validation_score": score_data["validation_score"],
        "breakdown": score_data["breakdown"],
    }