import os
import json
import sys
import tempfile
from PIL import Image
import pytesseract
from pdf2image import convert_from_path

from text_finalfinal import process_text_files
from layout_finalfinal import process_visual_files
from audio_finalfinal import process_audio_files
from master_agent import orchestrate_final_processing

# === Text-heavy check ===
def is_text_heavy_image(path):
    try:
        if path.endswith(".pdf"):
            images = convert_from_path(path)
            text = ""
            for img in images:
                text += pytesseract.image_to_string(img)
                if len(text) > 200:
                    return True
            return False
        else:
            img = Image.open(path)
            text = pytesseract.image_to_string(img)
            return len(text) > 200
    except Exception as e:
        print(f"Error detecting text: {e}", file=sys.stderr)
        return False

# === Main orchestrator for Streamlit ===
def orchestrate_files_streamlit(uploaded_files):
    all_jsons = {}

    for uploaded_file in uploaded_files:
        suffix = os.path.splitext(uploaded_file.name)[1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            result = None
            try:
                tmp.write(uploaded_file.read())
                tmp_path = tmp.name
                ext = suffix.lower()
                if ext in [".txt", ".docx"]:
                    print("Processing text file", file=sys.stderr)
                    result = process_text_files(tmp_path)
                elif ext in [".wav", ".mp3", ".m4a", ".opus"]:
                    print("Processing audio file", file=sys.stderr)
                    result = process_audio_files(tmp_path)
                elif ext in [".pdf", ".png", ".jpg", ".jpeg"]:
                    if is_text_heavy_image(tmp_path):
                        print("Processing text-heavy image/PDF", file=sys.stderr)
                        result = process_text_files(tmp_path)
                    else:
                        print("Processing visual file", file=sys.stderr)
                        result = process_visual_files(tmp_path)
                else:
                    result = {"error": f"Unsupported file type: {ext}"}
            except Exception as e:
                result = {"error": f"Error processing file: {str(e)}"}
                print(f"Error processing {uploaded_file.name}: {str(e)}", file=sys.stderr)
            finally:
                try:
                    os.unlink(tmp_path)
                except:
                    pass
            all_jsons[uploaded_file.name] = result if result is not None else {"error": "Unknown error"}
    return all_jsons

# === Generate final DOCX from collected JSONs ===
def generate_docx_from_all_jsons(all_jsons):
    try:
        output_path = os.path.join(tempfile.gettempdir(), "Final_Requirements.docx")
        print(f"Generating DOCX at: {output_path}", file=sys.stderr)
        orchestrate_final_processing(all_jsons, output_path)
        return output_path
    except Exception as e:
        print(f"Final DOCX generation failed: {str(e)}", file=sys.stderr)
        return None
