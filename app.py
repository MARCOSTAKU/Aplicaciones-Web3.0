# app.py
from flask import Flask, request, jsonify, render_template
from queries import generate_certificate, search_certificate

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/another')
def another():
    return render_template('another.html')

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    id_ci = data.get('id_ci')
    student_name = data.get('studentName')
    degree = data.get('degree')
    institution = data.get('institution')
    date = data.get('date')
    
    if id_ci and student_name and degree and institution and date:
        result = generate_certificate(id_ci, student_name, degree, institution, date)
        return jsonify(result)
    
    return jsonify({'success': False, 'message': 'Faltan datos necesarios.'})

@app.route('/search', methods=['POST'])
def search():
    data = request.json
    id_ci = data.get('id_ci')
    
    if id_ci:
        result = search_certificate(id_ci)
        return jsonify(result)
    
    return jsonify({'success': False, 'message': 'Código del certificado no proporcionado.'})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=False)

