import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")


def clean_json_response(text: str) -> str:
    text = text.strip()

    if text.startswith("```"):
        text = text.replace("```json", "").replace("```", "").strip()

    return text


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
Return only valid JSON. No explanation. No markdown.
"""

    try:
        response = model.generate_content(prompt)

        content = clean_json_response(response.text)

        return json.loads(content)

    except Exception as e:
        return {
            "error": "Gemini parsing failed",
            "details": str(e)
        }