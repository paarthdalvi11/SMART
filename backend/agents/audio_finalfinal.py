import os
import json
import sys
import speech_recognition as sr
from pydub import AudioSegment
from typing import Dict, Any
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API"))

def convert_audio_to_wav(input_file: str) -> str:
    """Convert audio file to WAV format."""
    try:
        audio = AudioSegment.from_file(input_file)
        wav_file = input_file.rsplit('.', 1)[0] + '.wav'
        audio.export(wav_file, format='wav')
        return wav_file
    except Exception as e:
        print(f"Error converting audio: {str(e)}", file=sys.stderr)
        raise

def transcribe_audio(audio_file: str) -> str:
    """Transcribe audio file to text using speech recognition."""
    recognizer = sr.Recognizer()
    try:
        with sr.AudioFile(audio_file) as source:
            audio = recognizer.record(source)
            text = recognizer.recognize_google(audio)
            return text
    except Exception as e:
        print(f"Error transcribing audio: {str(e)}", file=sys.stderr)
        raise

def structure_text_to_json_gemini(text: str) -> Dict[str, Any]:
    """Convert transcribed text to structured JSON using Gemini."""
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
    try:
        response = model.generate_content(prompt)
        content = response.text.strip()
        json_start = content.find("[")
        json_end = content.rfind("]") + 1
        return json.loads(content[json_start:json_end])
    except Exception as e:
        print("Failed to parse Gemini output:\n", content, file=sys.stderr)
        raise

def process_audio_files(file_path: str) -> Dict[str, Any]:
    """Process audio files and return structured requirements."""
    output = {}
    try:
        # Convert to WAV if needed
        wav_file = convert_audio_to_wav(file_path)
        
        # Transcribe audio
        transcribed_text = transcribe_audio(wav_file)
        
        # Structure the text into JSON
        output[file_path] = structure_text_to_json_gemini(transcribed_text)
        
        # Clean up temporary WAV file
        if wav_file != file_path:
            os.remove(wav_file)
            
    except Exception as e:
        print(f"Error processing {file_path}: {str(e)}", file=sys.stderr)
    
    return output
