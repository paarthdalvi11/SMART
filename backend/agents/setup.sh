#!/bin/bash

# Create a virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate the virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Install Tesseract OCR if not already installed
if ! command -v tesseract &> /dev/null; then
    echo "Tesseract OCR not found. Please install it manually:"
    echo "  - Windows: Download and install from https://github.com/UB-Mannheim/tesseract/wiki"
    echo "  - macOS: brew install tesseract"
    echo "  - Linux: sudo apt-get install tesseract-ocr"
fi

echo "Setup complete!" 