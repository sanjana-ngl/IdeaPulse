import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def analyze_idea(title, description, target_audience, industry):

    prompt = f"""
You are a startup analyst.

Analyze this startup idea:

Title: {title}
Description: {description}
Target Audience: {target_audience}
Industry: {industry}

Return STRICT JSON in this format:

{{
    "market_summary": "...",
    "competitors": ["...", "...", "..."],
    "strengths": "...",
    "weaknesses": "...",
    "opportunities": "...",
    "threats": "...",
    "monetization": "...",
    "feasibility": "Low/Medium/High"
}}
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7
    )

    content = response.choices[0].message.content

    return json.loads(content)