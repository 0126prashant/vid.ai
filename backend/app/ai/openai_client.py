import requests
from flask import current_app

def ask_openai(prompt):
    api_key = current_app.config["OPENAI_API_KEY"]
    headers = {"Authorization": f"Bearer {api_key}"}
    url = "https://api.openai.com/v1/chat/completions"
    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7,
        "max_tokens": 512
    }
    response = requests.post(url, json=data, headers=headers)
    response.raise_for_status()
    content = response.json()["choices"][0]["message"]["content"]
    return content.strip()
