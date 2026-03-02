def calculate_score(feasibility, competitors_count):

    score = 50

    if feasibility.lower() == "high":
        score += 25
    elif feasibility.lower() == "medium":
        score += 10

    if competitors_count <= 3:
        score += 15
    elif competitors_count <= 6:
        score += 5

    return min(score, 100)