import os
import re
import json
import cv2
import pytesseract
import sys
from PIL import Image
from typing import List, Dict, Any
from dotenv import load_dotenv
from docx import Document
from pdf2image import convert_from_path
import google.generativeai as genai

# === Load API Key ===
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API"))

# === Utility Functions ===
def is_image_clean_enough(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    mean_brightness = gray.mean()
    std_dev = gray.std()
    return mean_brightness > 180 and std_dev > 40

def extract_text_from_image(file_path):
    if file_path.lower().endswith(".pdf"):
        pages = convert_from_path(file_path)
        text = "".join(pytesseract.image_to_string(page) for page in pages)
    else:
        img = cv2.imread(file_path)
        if img is None:
            raise FileNotFoundError(f"Unable to read image: {file_path}")
        if is_image_clean_enough(img):
            text = pytesseract.image_to_string(img)
        else:
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
            blur = cv2.medianBlur(thresh, 3)
            config = r'--oem 3 --psm 6'
            text = pytesseract.image_to_string(Image.fromarray(blur), config=config)
    return text

def extract_text_from_docx(file_path):
    doc = Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs if para.text.strip()])

def clean_text(text):
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\x00-\x7F]+', '', text)
    return text.strip()

def clean_ocr_text(text):
    text = re.sub(r'-\n', '', text)
    text = re.sub(r'\n+', '\n', text)
    text = re.sub(r'[^\x00-\x7F]+', ' ', text)
    text = re.sub(r'[^a-zA-Z0-9\s.,()*%:-]', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def structure_text_to_json_gemini(text):
    # model = genai.GenerativeModel("gemini-1.5-pro-latest")
    model = genai.GenerativeModel(os.getenv("GEMINI_MODEL"))
    prompt = f"""
You are a software analyst. Read the following rough notes and convert them into a structured list of cleaned requirements.

Each requirement should have:
- an 'id' (like REQ-1, REQ-2),
- a 'description' (rephrased clearly),
- and an optional 'note'.

Return the output strictly as JSON array, and nothing else.
Text:
{text}
"""
    response = model.generate_content(prompt)
    content = response.text.strip()
    try:
        json_start = content.find("[")
        json_end = content.rfind("]") + 1
        return json.loads(content[json_start:json_end])
    except Exception as e:
        print("Failed to parse Gemini output:\n", content, file=sys.stderr)
        raise e

# === Core Interface Function ===
def process_text_files(file_path: str) -> Dict[str, Any]:
    output = {}
    try:
        ext = os.path.splitext(file_path)[1].lower()
        if ext == ".docx":
            raw = extract_text_from_docx(file_path)
            cleaned = clean_text(raw)
            output[file_path] = structure_text_to_json_gemini(cleaned)
        elif ext in (".png", ".jpg", ".jpeg", ".pdf"):
            raw = extract_text_from_image(file_path)
            cleaned = clean_ocr_text(clean_text(raw))
            output[file_path] = structure_text_to_json_gemini(cleaned)
        else:
            print(f"Unsupported file type: {ext}", file=sys.stderr)
    except Exception as e:
        print(f"Error processing {file_path}: {str(e)}", file=sys.stderr)
    return output

