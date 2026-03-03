import os
import json
from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


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

IMPORTANT:
Return only valid JSON.
"""

    try:
        response = client.models.generate_content(
            model="gemini-1.5-flash-latest",
            contents=prompt,
        )

        raw_text = response.text.strip()

        if raw_text.startswith("```"):
            raw_text = raw_text.replace("```json", "").replace("```", "").strip()

        return json.loads(raw_text)

    except Exception as e:
        return {
            "error": "Gemini failed",
            "details": str(e)
        }