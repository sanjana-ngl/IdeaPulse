import math


def calculate_market_index(industry: str):
    high_growth_keywords = ["AI", "FinTech", "HealthTech", "EdTech", "SaaS", "Climate", "Cyber"]
    
    for keyword in high_growth_keywords:
        if keyword.lower() in industry.lower():
            return 85
    
    return 60


def calculate_competition_index(competitors: list):
    count = len(competitors)

    if count <= 2:
        return 85
    elif count <= 5:
        return 70
    elif count <= 10:
        return 50
    else:
        return 35


def calculate_monetization_index(monetization: str):
    monetization = monetization.lower()

    if "subscription" in monetization:
        return 90
    elif "freemium" in monetization:
        return 80
    elif "ads" in monetization:
        return 60
    elif "one-time" in monetization:
        return 55
    else:
        return 50


def calculate_scalability_index(description: str):
    digital_keywords = ["app", "platform", "software", "AI", "SaaS"]
    
    for keyword in digital_keywords:
        if keyword.lower() in description.lower():
            return 85
    
    return 55


def calculate_risk_index(industry: str):
    regulated_keywords = ["health", "finance", "insurance", "biotech"]

    for keyword in regulated_keywords:
        if keyword.lower() in industry.lower():
            return 70
    
    return 40


def calculate_viability(industry, competitors, monetization, description):

    MAI = calculate_market_index(industry)
    CSI = calculate_competition_index(competitors)
    MSI = calculate_monetization_index(monetization)
    SPI = calculate_scalability_index(description)
    RCI = calculate_risk_index(industry)

    viability = (
        0.25 * MAI +
        0.20 * CSI +
        0.20 * MSI +
        0.20 * SPI +
        0.15 * (100 - RCI)
    )

    return round(viability, 2), {
        "market_index": MAI,
        "competition_index": CSI,
        "monetization_index": MSI,
        "scalability_index": SPI,
        "risk_index": RCI
    }