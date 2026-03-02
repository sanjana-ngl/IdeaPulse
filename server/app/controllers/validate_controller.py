def validate_idea(data):

    ai_result = analyze_idea(
        data.title,
        data.description,
        data.target_audience,
        data.industry
    )

    if "error" in ai_result:
        return ai_result

    score = calculate_score(
        ai_result.get("feasibility", "Low"),
        len(ai_result.get("competitors", []))
    )

    response_data = {
        "market_summary": ai_result.get("market_summary"),
        "competitors": ai_result.get("competitors", []),
        "swot": {
            "strengths": ai_result.get("strengths"),
            "weaknesses": ai_result.get("weaknesses"),
            "opportunities": ai_result.get("opportunities"),
            "threats": ai_result.get("threats"),
        },
        "monetization": ai_result.get("monetization"),
        "feasibility": ai_result.get("feasibility"),
        "validation_score": score
    }

    save_idea_to_db(response_data)

    return response_data