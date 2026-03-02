import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")

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

    response = model.generate_content(prompt)

    content = response.text.strip()

    # Remove accidental markdown formatting if Gemini adds it
    if content.startswith("```"):
        content = content.strip("```json").strip("```").strip()

    return json.loads(content)