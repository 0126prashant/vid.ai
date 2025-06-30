import requests
from flask import current_app

def ask_openai(prompt):
    # Make sure you have added "HF_API_KEY" to your Flask config
    api_key = current_app.config["HF_API_KEY"]
    model = current_app.config.get("HF_MODEL", "mistralai/Mistral-7B-Instruct-v0.2")  # default model
    url = f"https://api-inference.huggingface.co/models/{model}"
    headers = {"Authorization": f"Bearer {api_key}"}
    data = {
        "inputs": prompt,
        "parameters": {
            "max_new_tokens": 512,
            "temperature": 0.7,
        }
    }
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    # Hugging Face returns a list of generated texts
    result = response.json()
    # Sometimes the output is formatted slightly differently depending on the model.
    if isinstance(result, list):
        content = result[0].get("generated_text", "")
    elif isinstance(result, dict) and "generated_text" in result:
        content = result["generated_text"]
    else:
        content = str(result)
    return content.strip()
