import statistics

def calculate_score(ai_result: dict):

    # 🔹 Market index based on wording
    market_text = ai_result["market_summary"].lower()

    if "growing" in market_text or "expanding" in market_text:
        market_index = 85
    else:
        market_index = 65

    # 🔹 Competition based on number of competitors
    num_competitors = len(ai_result["competitors"])
    competition_index = min(num_competitors * 20, 100)

    # 🔹 Monetization model
    monetization_text = ai_result["monetization"].lower()

    if "subscription" in monetization_text:
        monetization_index = 85
    elif "ads" in monetization_text:
        monetization_index = 60
    else:
        monetization_index = 70

    # 🔹 Scalability from strengths
    scalability_index = 80 if len(ai_result["swot"]["strengths"]) > 0 else 60

    # 🔹 Risk from threats count
    risk_index = min(len(ai_result["swot"]["threats"]) * 15, 100)

    validation_score = int(
        (0.30 * market_index) +
        (0.20 * (100 - competition_index)) +
        (0.20 * monetization_index) +
        (0.20 * scalability_index) +
        (0.10 * (100 - risk_index))
    )

    breakdown = {
        "market_index": market_index,
        "competition_index": competition_index,
        "monetization_index": monetization_index,
        "scalability_index": scalability_index,
        "risk_index": risk_index
    }

    return {
        "validation_score": validation_score,
        "breakdown": breakdown
    }
def normalize_weights(importances):
    total = sum(importances.values())
    return {k: v / total for k, v in importances.items()}


def compute_weighted_score(dimensions, weights):
    score = (
        dimensions["market"] * weights["market"]
        + dimensions["competition"] * weights["competition"]
        + dimensions["monetization"] * weights["monetization"]
        + dimensions["scalability"] * weights["scalability"]
        - dimensions["risk"] * weights["risk"]
    )
    return round(score, 2)


def simulate_scenarios(dimensions):

    baseline_importance = {
        "market": 5,
        "monetization": 4,
        "competition": 3,
        "scalability": 3,
        "risk": 2,
    }

    growth_importance = {
        "market": 6,
        "monetization": 4,
        "competition": 2,
        "scalability": 3,
        "risk": 2,
    }

    competition_importance = {
        "market": 4,
        "monetization": 3,
        "competition": 6,
        "scalability": 2,
        "risk": 2,
    }

    downturn_importance = {
        "market": 3,
        "monetization": 5,
        "competition": 3,
        "scalability": 2,
        "risk": 4,
    }

    baseline = compute_weighted_score(
        dimensions, normalize_weights(baseline_importance)
    )

    growth = compute_weighted_score(
        dimensions, normalize_weights(growth_importance)
    )

    competitive = compute_weighted_score(
        dimensions, normalize_weights(competition_importance)
    )

    downturn = compute_weighted_score(
        dimensions, normalize_weights(downturn_importance)
    )

    scores = [baseline, growth, competitive, downturn]
    variance = statistics.pvariance(scores)
    resilience = round(100 - variance, 2)

    return {
        "baseline": baseline,
        "high_growth": growth,
        "high_competition": competitive,
        "economic_downturn": downturn,
        "resilience_index": resilience,
    }


def sensitivity_analysis(dimensions):

    base_importance = {
        "market": 5,
        "monetization": 4,
        "competition": 3,
        "scalability": 3,
        "risk": 2,
    }

    base_weights = normalize_weights(base_importance)
    base_score = compute_weighted_score(dimensions, base_weights)

    impact = {}

    for key in dimensions:
        modified = dimensions.copy()
        modified[key] = min(100, dimensions[key] + 10)
        new_score = compute_weighted_score(modified, base_weights)
        impact[key] = round(new_score - base_score, 2)

    return impact