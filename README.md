# Exam Question Generator

This project is an application that allows users to upload past exam papers and generate new questions based on the content of those papers. It consists of a Flask backend, a React frontend, and uses AI-powered text analysis to process and generate questions.

## Features

- Admin panel for uploading exam papers
- Student interface for generating questions
- AI-powered question generation using Google's Generative AI
- PDF text extraction and processing
- Vector storage for efficient similarity search

## Project Structure

The project is divided into two main parts:

1. Backend (Flask)
2. Frontend (React)

### Backend

The backend is built with Flask and handles file uploads, PDF processing, and question generation. Key files include:

- `app.py`: Main Flask application
- `script.py`: Contains logic for PDF processing and question generation

### Frontend

The frontend is built with React and provides user interfaces for both students and administrators. Key components include:

- `Home.js`: Student interface for generating questions
- `Admin.js`: Admin interface for uploading exam papers

## Setup

### Prerequisites

- Python 3.7+
- Node.js 12+
- Google Cloud API key with access to Generative AI

### Backend Setup

1. Clone the repository
2. Navigate to the backend directory
3. Create a virtual environment: `python -m venv venv`
4. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`
5. Install dependencies: `pip install -r requirements.txt`
6. Create a `.env` file and add your Google API key:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```
7. Run the Flask app: `python app.py`

### Frontend Setup

1. Navigate to the frontend directory
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Usage

### Admin

1. Access the admin panel
2. Select a subject, enter the year, and upload a PDF file of past exam questions
3. Click "Submit" to upload the file

### Student

1. Access the student interface
2. Select a subject
3. Click "Submit" to generate questions based on past exams

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.