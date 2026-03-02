import os
import json
import re
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY not found in .env file")

client = Groq(api_key=api_key)


def analyze_idea(title, description, target_audience, industry):

    prompt = f"""
You are a startup validation expert.

Analyze the following startup idea and respond ONLY in valid JSON.

Startup Idea:
Title: {title}
Description: {description}
Target Audience: {target_audience}
Industry: {industry}

Return JSON in this exact format:
{{
    "market_summary": "...",
    "competitors": ["...", "..."],
    "strengths": "...",
    "weaknesses": "...",
    "opportunities": "...",
    "threats": "...",
    "monetization": "...",
    "feasibility": "Low/Medium/High"
}}
"""

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a startup validation expert."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )

        raw_text = response.choices[0].message.content.strip()

        # Remove markdown formatting if present
        raw_text = re.sub(r"```json", "", raw_text)
        raw_text = re.sub(r"```", "", raw_text)

        parsed = json.loads(raw_text)

        return parsed

    except Exception as e:
        print("🔥 GROQ ERROR:", e)
        return {
            "market_summary": "AI analysis failed.",
            "competitors": [],
            "strengths": "N/A",
            "weaknesses": "N/A",
            "opportunities": "N/A",
            "threats": "N/A",
            "monetization": "N/A",
            "feasibility": "Unknown"
        }