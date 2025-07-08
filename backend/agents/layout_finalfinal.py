import os
import json
from dotenv import load_dotenv
from PIL import Image
import google.generativeai as genai

# === Load API key ===
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API")
genai.configure(api_key=GEMINI_API_KEY)


def analyze_image_with_gemini(image_path):
    """Analyze image (flowchart/UI/layout/handwritten) and return plain English summary."""
    try:
        img = Image.open(image_path)
    except Exception as e:
        raise ValueError(f"Error loading image '{image_path}': {e}")

    prompt = """
You are a software analyst helping to write software requirements.
Analyze this image and paraphrase the layout or content.
If it includes UI elements, flowcharts, forms, or handwritten notes, describe them in clear English.
Understand the diagram properly—only give on-point features that the system needs to have.
    """

    # model = genai.GenerativeModel("gemini-1.5-pro")
    model = genai.GenerativeModel(os.getenv("GEMINI_MODEL"))
    response = model.generate_content([img, prompt], stream=False)
    return response.text.strip()


def convert_analysis_to_json(text):
    """Convert layout understanding into clean structured requirement JSON."""
    prompt = f"""
You are a software analyst. Read the following analysis or the description of the diagrammatic representation and convert it into a structured list of cleaned requirements.

Understand the analysis deeply and give exact features that the system needs to have.

Use MoSCoW (Must, Should, Could, Won’t) prioritization **in the requirement sentences**, e.g., "the system must...", "the system should..."

Each requirement should have:
- an 'id' (like REQ-1, REQ-2),
- a 'description' (rephrased clearly),
- and an optional 'note'.

Return strictly a JSON array and nothing else.
Text:
{text}
"""
    model = genai.GenerativeModel("gemini-1.5-pro-latest")
    response = model.generate_content(prompt)
    content = response.text.strip()

    try:
        json_start = content.find("[")
        json_end = content.rfind("]") + 1
        json_text = content[json_start:json_end]
        return json.loads(json_text)
    except Exception as e:
        print("⚠️ Failed to parse Gemini output:\n", content)
        raise e


def run_visual_agent(image_path):
    """Main visual agent that returns requirement JSON from layout/diagram image."""
    analysis = analyze_image_with_gemini(image_path)
    return convert_analysis_to_json(analysis)


def process_visual_files(file_path):
    """Process a single visual file (PNG/JPG/PDF if extracted to image)."""
    results = {}
    try:
        print(f"\n📄 Processing: {file_path}")
        results[file_path] = run_visual_agent(file_path)
    except Exception as e:
        print(f"❌ Failed to process {file_path}: {e}")
    return results

