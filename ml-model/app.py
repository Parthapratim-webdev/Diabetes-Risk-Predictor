"""
Python Flask Prediction API
Diabetes Risk Predictor — Machine Learning Microservice
Exposes:
- GET  /health   -> Microservice status and model version
- POST /predict  -> Evaluates clinical assessment inputs and returns real predictions
Runs on port 5001.
"""

import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
from predict import DiabetesPredictor
from preprocessing import FEATURE_COLUMNS

app = Flask(__name__)
# Enable CORS for backend communication
CORS(app)

# Load prediction engine
try:
    predictor = DiabetesPredictor()
    print("DiabetesPredictor successfully loaded in Flask application.")
except Exception as e:
    print(f"Warning: Could not initialize model on startup: {e}")
    predictor = None


@app.route('/', methods=['GET'])
def index():
    return jsonify({
        'service': 'Diabetes Risk Predictor ML API',
        'status': 'running',
        'healthCheck': '/health',
        'predictEndpoint': '/predict',
        'modelVersion': predictor.metadata.get('modelVersion', '1.0') if predictor else 'unloaded',
    })


@app.route('/health', methods=['GET'])
def health():
    if predictor is None or predictor.model is None:
        return jsonify({
            'status': 'degraded',
            'modelLoaded': False,
            'message': 'Model artifact not loaded. Run train_model.py first.',
        }), 503

    return jsonify({
        'status': 'healthy',
        'modelLoaded': True,
        'modelType': predictor.metadata.get('selectedModelType', 'Random Forest'),
        'modelVersion': predictor.metadata.get('modelVersion', '1.0'),
        'featureCount': len(FEATURE_COLUMNS),
        'features': FEATURE_COLUMNS,
    }), 200


@app.route('/predict', methods=['POST'])
def predict():
    if predictor is None or predictor.model is None:
        return jsonify({
            'success': False,
            'message': 'Prediction service is currently unavailable (model not loaded).',
        }), 503

    if not request.is_json:
        return jsonify({
            'success': False,
            'message': 'Request payload must be application/json.',
        }), 400

    data = request.get_json()
    if not data:
        return jsonify({
            'success': False,
            'message': 'Empty JSON request received.',
        }), 400

    # Handle both { "features": { ... } } and direct flat { ... }
    input_payload = data.get('features', data)

    # If payload is wrapped under measurements or inputs
    if 'measurements' in input_payload and isinstance(input_payload['measurements'], dict):
        input_payload = input_payload['measurements']
    elif 'inputs' in input_payload and isinstance(input_payload['inputs'], dict):
        input_payload = input_payload['inputs']

    try:
        # Run prediction through validated preprocessing
        prediction_result = predictor.predict(input_payload)

        # Standardized educational response
        response = {
            'success': True,
            'prediction': prediction_result['prediction'],
            'classification': prediction_result['classification'],
            'estimatedProbability': prediction_result['estimatedProbability'],
            'probabilities': prediction_result.get('probabilities'),
            'summary': prediction_result['summary'],
            'modelVersion': prediction_result['modelVersion'],
            'modelType': prediction_result['modelType'],
            'message': 'This is an educational model output, not a medical diagnosis.',
            'educationalDisclaimer': prediction_result['educationalDisclaimer'],
        }

        return jsonify(response), 200

    except ValueError as ve:
        # Client validation error (missing field, out-of-range value)
        return jsonify({
            'success': False,
            'message': f"Input validation error: {str(ve)}",
            'requiredFeatures': FEATURE_COLUMNS,
        }), 400

    except Exception as exc:
        # Unexpected processing exception
        return jsonify({
            'success': False,
            'message': 'An error occurred while generating the prediction.',
            'error': str(exc),
        }), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    print(f"Starting Flask Prediction Microservice on port {port}...")
    app.run(host='0.0.0.0', port=port, debug=False)
