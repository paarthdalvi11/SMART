import os
import tempfile
import sys
import json
from handlertwo import orchestrate_files_streamlit, generate_docx_from_all_jsons

import asyncio
asyncio.set_event_loop(asyncio.new_event_loop())

# Check if running as a script with command-line arguments
if len(sys.argv) > 1:
    # Command-line mode
    file_paths = sys.argv[1:]
    
    # Create a list of file objects that mimic Streamlit's uploaded files
    class FileObject:
        def __init__(self, path):
            self.name = os.path.basename(path)
            self.path = path
            
        def read(self):
            try:
                with open(self.path, 'rb') as f:
                    return f.read()
            except FileNotFoundError:
                print(f"File not found: {self.path}", file=sys.stderr)
                # Create an empty file with the same name to avoid errors
                with open(self.path, 'wb') as f:
                    return b''
    
    uploaded_files = [FileObject(path) for path in file_paths]
    
    # Process files and output JSON
    all_jsons = orchestrate_files_streamlit(uploaded_files)
    print(json.dumps(all_jsons))
    sys.exit(0)

# Only import streamlit if running in UI mode
try:
    import streamlit as st
    
    # Streamlit page setup
    st.set_page_config(page_title="Automated Requirement Generator", layout="wide")
    st.title("📄 AI-Powered Requirement Extractor")

    # File uploader
    uploaded_files = st.file_uploader(
        "Upload your input files (DOCX, PDF, PNG, JPG, OPUS, etc.)",
        type=["docx", "pdf", "png", "jpg", "jpeg", "opus", "mp3", "wav", "m4a", "pptx"],
        accept_multiple_files=True
    )

    # Handle uploads
    if uploaded_files:
        st.subheader("🔍 Extracted Requirements (JSON Output)")

        # Call orchestrator
        all_jsons = orchestrate_files_streamlit(uploaded_files)

        # Display JSONs
        for file_name, json_data in all_jsons.items():
            st.markdown(f"---\n**File:** `{file_name}`")
            st.json(json_data)

        # Final DOCX generation section
        if all_jsons:
            st.markdown("### 🧠 Generate Final Requirement Document")
            if st.button("Generate DOCX"):
                try:
                    output_path = generate_docx_from_all_jsons(all_jsons)
                    with open(output_path, "rb") as f:
                        st.success("✅ DOCX file generated successfully!")
                        st.download_button(
                            label="📥 Download Final Requirements DOCX",
                            data=f,
                            file_name="Final_Requirements.docx",
                            mime="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        )
                except Exception as e:
                    st.error(f"❌ Failed to generate DOCX: {e}")
except ImportError:
    # If streamlit is not available, just print a message
    print("Streamlit not available. Running in command-line mode only.", file=sys.stderr)
