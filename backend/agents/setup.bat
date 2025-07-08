@echo off
echo Setting up the agent environment...

REM Create a virtual environment if it doesn't exist
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate the virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Verify streamlit is installed
pip show streamlit >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Streamlit not found. Installing streamlit...
    pip install streamlit
)

REM Check for Tesseract OCR
where tesseract >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Tesseract OCR not found. Please install it manually:
    echo   - Download and install from https://github.com/UB-Mannheim/tesseract/wiki
)

echo Setup complete! 