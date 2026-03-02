def calculate_score(feasibility, competitors_count):

    score = 50

    feasibility = feasibility.lower()

    if feasibility == "high":
        score += 25
    elif feasibility == "medium":
        score += 10
    elif feasibility == "low":
        score += 0
    else:
        score += 5  # unknown case safety

    if competitors_count <= 3:
        score += 15
    elif competitors_count <= 6:
        score += 5

    return min(score, 100)