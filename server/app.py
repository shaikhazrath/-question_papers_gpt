from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from script import handle_analysis

app = Flask(__name__)
CORS(app)  

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER



@app.route('/upload', methods=['POST'])
def upload_file():
    if 'pdf' not in request.files:
        return jsonify({'message': 'No file part'}), 400

    file = request.files['pdf']
    subject = request.form.get('subject', 'default')
    year = request.form.get('year', 'unknown')

    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    if not file.filename.lower().endswith('.pdf'):
        return jsonify({'message': 'Invalid file type'}), 400

    upload_path = os.path.join(app.config['UPLOAD_FOLDER'], subject)
    if not os.path.exists(upload_path):
        os.makedirs(upload_path)

    extension = '.pdf'
    filename = f"{year}{extension}"
    file_path = os.path.join(upload_path, filename)
    counter = 1
    while os.path.exists(file_path):
        filename = f"{year}-{counter}{extension}"
        file_path = os.path.join(upload_path, filename)
        counter += 1

    file.save(file_path)

    return jsonify({'message': 'File uploaded successfully', 'subject': subject, 'year': year})

@app.route('/get_questions', methods=['GET'])
def get_questions():
    subject = request.args.get('subject')
    if not subject:
        return jsonify({'message': 'Subject is required'}), 400

    try:
        questions = handle_analysis(subject)
        if questions:
            return jsonify({'questions': questions})
        else:
            return jsonify({'message': 'No questions found'}), 404

    except FileNotFoundError as e:
        return jsonify({'error': str(e)}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
