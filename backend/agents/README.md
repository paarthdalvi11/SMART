# Requirements Extraction Agent

This agent extracts functional and non-functional requirements from various input sources including text, documents, images, and audio files.

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- Tesseract OCR (for image processing)
- Node.js and npm/pnpm (for the Next.js application)

### Installation

#### Windows

1. Run the setup script:
   ```
   setup.bat
   ```

#### macOS/Linux

1. Make the setup script executable:
   ```
   chmod +x setup.sh
   ```

2. Run the setup script:
   ```
   ./setup.sh
   ```

### Environment Variables

Create a `.env` file in the agent directory with the following variables:

```
GEMINI_API=your_gemini_api_key
GEMINI_MODEL=gemini-1.5-pro-latest
```

## Usage

The agent is integrated into the Next.js application and can be used through the UI:

1. Navigate to the "New Session" page
2. Enter text requirements or upload files
3. Click "Extract Requirements"
4. Review the extracted requirements in the right panel

## Supported File Types

- Text: `.txt`, `.docx`
- Images: `.png`, `.jpg`, `.jpeg`
- Documents: `.pdf`
- Audio: `.wav`, `.mp3`, `.m4a`, `.opus`

## Troubleshooting

- If you encounter issues with Tesseract OCR, make sure it's properly installed and in your system PATH
- For audio processing issues, ensure you have the required audio codecs installed
- If the agent fails to process certain files, check the file format and ensure it's supported 