from app.database.idea_repository import save_idea
from app.services.gemini_service import analyze_idea
from app.services.scoring_service import calculate_score
from fastapi import HTTPException


def validate_idea(data):

    ai_result = analyze_idea(
        data.title,
        data.description,
        data.target_audience,
        data.industry
    )

    if "error" in ai_result:
        raise HTTPException(
            status_code=500,
            detail=ai_result["details"]
        )

    feasibility = ai_result.get("feasibility", "Medium")
    competitors = ai_result.get("competitors", [])

    score = calculate_score(
        feasibility,
        len(competitors)
    )

    response_data = {
        "market_summary": ai_result.get("market_summary", ""),
        "competitors": competitors,
        "swot": {
            "strengths": ai_result.get("strengths", ""),
            "weaknesses": ai_result.get("weaknesses", ""),
            "opportunities": ai_result.get("opportunities", ""),
            "threats": ai_result.get("threats", ""),
        },
        "monetization": ai_result.get("monetization", ""),
        "feasibility": feasibility,
        "validation_score": score
    }

    # Save full idea including input
    db_data = {
        "title": data.title,
        "description": data.description,
        "target_audience": data.target_audience,
        "industry": data.industry,
        **response_data
    }

    save_idea(db_data)

    return response_data