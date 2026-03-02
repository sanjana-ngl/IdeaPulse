from app.services.ai_service import analyze_idea
from app.services.scoring_service import calculate_viability
from app.database.idea_repository import save_idea


# 🔄 Utility to normalize SWOT values (string → list)
def ensure_list(value):
    if isinstance(value, list):
        return value
    if isinstance(value, str):
        return [value]
    return []


def validate_idea(data):

    # 🔹 Step 1 — Get AI structured extraction
    ai_result = analyze_idea(
        data.title,
        data.description,
        data.industry,
        data.subdomain,
        data.target_audience
    )

    # 🔹 Step 2 — Calculate structured viability score
    viability_score, breakdown = calculate_viability(
        data.industry,
        ai_result.get("competitors", []),
        ai_result.get("monetization", ""),
        data.description
    )

    # 🔹 Step 3 — Build standardized response object
    response_data = {
        "idea_title": data.title,
        "industry": data.industry,
        "subdomain": data.subdomain,
        "target_audience": data.target_audience,

        "market_summary": ai_result.get("market_summary", ""),

        "competitors": ai_result.get("competitors", []),

        "swot": {
            "strengths": ensure_list(ai_result.get("strengths")),
            "weaknesses": ensure_list(ai_result.get("weaknesses")),
            "opportunities": ensure_list(ai_result.get("opportunities")),
            "threats": ensure_list(ai_result.get("threats")),
        },

        "monetization": ai_result.get("monetization", ""),

        # 🎯 New Framework Outputs
        "validation_score": viability_score,
        "breakdown": breakdown
    }

    # 🔹 Step 4 — Save to database
    save_idea(response_data)

    return response_data