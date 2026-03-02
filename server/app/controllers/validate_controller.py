from app.database.idea_repository import save_idea
from app.services.gemini_service import analyze_idea
from app.services.scoring_service import calculate_score


def validate_idea(data):

    ai_result = analyze_idea(
        data.title,
        data.description,
        data.target_audience,
        data.industry
    )

    score = calculate_score(
        ai_result["feasibility"],
        len(ai_result["competitors"])
    )

    response_data = {
        "title": data.title,
        "description": data.description,
        "target_audience": data.target_audience,
        "industry": data.industry,
        "market_summary": ai_result["market_summary"],
        "competitors": ai_result["competitors"],
        "swot": {
            "strengths": ai_result["strengths"],
            "weaknesses": ai_result["weaknesses"],
            "opportunities": ai_result["opportunities"],
            "threats": ai_result["threats"],
        },
        "monetization": ai_result["monetization"],
        "feasibility": ai_result["feasibility"],
        "validation_score": score
    }

    # ✅ Save to MongoDB
    idea_id = save_idea(response_data)

    return {
        "idea_id": idea_id,
        "analysis": response_data
    }