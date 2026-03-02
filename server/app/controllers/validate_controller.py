from app.services.gemini_service import analyze_idea
from app.services.scoring_service import calculate_score
from database.db_service import save_idea_to_db

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

    # Save (DB teammate handles real logic)
    save_idea_to_db(response_data)

    return response_data