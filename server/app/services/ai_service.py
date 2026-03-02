import os
import json
import re
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("GROQ_API_KEY not found")

client = Groq(api_key=api_key)


def analyze_idea(title, description, industry, subdomain, target_audience):

    prompt = f"""
You are a startup validation expert.

Analyze the following startup idea and return ONLY valid JSON.

Title: {title}
Description: {description}
Industry: {industry}
Subdomain: {subdomain}
Target Audience: {target_audience}

Return JSON in this format:
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
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )

        raw_text = response.choices[0].message.content.strip()

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