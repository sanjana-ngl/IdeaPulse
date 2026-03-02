import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()


def analyze_idea(title, description, industry, subdomain, target_audience):

    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        raise Exception("GROQ_API_KEY is not set.")

    client = Groq(api_key=api_key)

    prompt = f"""
Analyze the following startup idea and return ONLY valid JSON.

Startup Idea:
Title: {title}
Description: {description}
Industry: {industry}
Subdomain: {subdomain}
Target Audience: {target_audience}

Return JSON with:

- market_summary (string)

- competitors (array of max 5 objects)
    For each competitor include:
        - name
        - pricing_model
        - brand_scale (Global / Regional / Niche)
        - company_type (Public Company / VC-backed / Private / Startup)

- swot:
    - strengths (array)
    - weaknesses (array)
    - opportunities (array)
    - threats (array)

- monetization (string)

Return ONLY valid JSON.
"""

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
    )

    response_text = completion.choices[0].message.content.strip()

    # 🔥 Remove markdown fences if present
    if response_text.startswith("```"):
        parts = response_text.split("```")
        if len(parts) >= 2:
            response_text = parts[1].strip()

    # 🔥 Extract JSON portion safely
    start = response_text.find("{")
    end = response_text.rfind("}") + 1

    if start != -1 and end != -1:
        response_text = response_text[start:end]

    try:
        return json.loads(response_text)
    except Exception:
        print("⚠️ FAILED TO PARSE AI RESPONSE:")
        print(response_text)
        raise Exception("AI response was not valid JSON.")