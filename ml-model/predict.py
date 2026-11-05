"""
Standalone Prediction Script
Diabetes Risk Predictor — Machine Learning Pipeline
Loads serialized Joblib pipeline and evaluates input records.
"""

import os
import json
import joblib
import pandas as pd
from preprocessing import prepare_single_input, FEATURE_COLUMNS

# Resolve paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'diabetes_model.pkl')
METADATA_PATH = os.path.join(BASE_DIR, 'model_metadata.json')


class DiabetesPredictor:
    def __init__(self, model_path=MODEL_PATH, metadata_path=METADATA_PATH):
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found at: {model_path}. Please run train_model.py first.")
        
        self.model = joblib.load(model_path)
        self.metadata = {}
        if os.path.exists(metadata_path):
            with open(metadata_path, 'r', encoding='utf-8') as f:
                self.metadata = json.load(f)

    def predict(self, raw_input_dict):
        """
        Takes raw dictionary of 16 assessment features,
        validates input, and returns genuine ML prediction and probability.
        """
        # Validate and prepare single input row
        X_df = prepare_single_input(raw_input_dict)

        # Generate prediction
        prediction_int = int(self.model.predict(X_df)[0])

        # Get calibrated probabilities if supported
        probabilities = None
        confidence_pct = None
        if hasattr(self.model, 'predict_proba'):
            prob_array = self.model.predict_proba(X_df)[0]
            prob_positive = float(prob_array[1])
            confidence_pct = round(prob_positive * 100, 1)
            probabilities = {
                'negativeProbability': round(float(prob_array[0]), 4),
                'positiveProbability': round(prob_positive, 4),
            }

        classification_label = 'Positive (Elevated Risk Indicator)' if prediction_int == 1 else 'Negative (Low Risk Indicator)'

        summary = (
            f"Based on reported markers, the statistical model indicates an "
            f"{'elevated correlation with early-stage diabetes indicators' if prediction_int == 1 else 'educational profile consistent with low typical indicators'}. "
            f"This is an algorithmic assessment and not a clinical diagnosis."
        )

        return {
            'success': True,
            'prediction': prediction_int,
            'classification': classification_label,
            'estimatedProbability': confidence_pct,
            'probabilities': probabilities,
            'summary': summary,
            'modelVersion': self.metadata.get('modelVersion', '1.0'),
            'modelType': self.metadata.get('selectedModelType', 'Random Forest'),
            'educationalDisclaimer': (
                'This computer output is for educational study only and cannot replace clinical blood testing or a doctor\'s diagnosis.'
            ),
        }


def main():
    print("Testing DiabetesPredictor with sample profiles...")
    predictor = DiabetesPredictor()

    # Profile A: High Risk Symptom Profile (Polyuria, Polydipsia, Weight Loss)
    high_risk_sample = {
        'Age': 58,
        'Gender': 'Male',
        'Polyuria': 'Yes',
        'Polydipsia': 'Yes',
        'sudden weight loss': 'Yes',
        'weakness': 'Yes',
        'Polyphagia': 'Yes',
        'Genital thrush': 'No',
        'visual blurring': 'Yes',
        'Itching': 'Yes',
        'Irritability': 'Yes',
        'delayed healing': 'Yes',
        'partial paresis': 'Yes',
        'muscle stiffness': 'Yes',
        'Alopecia': 'Yes',
        'Obesity': 'Yes',
    }

    # Profile B: Low Risk Profile (No clinical symptoms reported)
    low_risk_sample = {
        'Age': 28,
        'Gender': 'Female',
        'Polyuria': 'No',
        'Polydipsia': 'No',
        'sudden weight loss': 'No',
        'weakness': 'No',
        'Polyphagia': 'No',
        'Genital thrush': 'No',
        'visual blurring': 'No',
        'Itching': 'No',
        'Irritability': 'No',
        'delayed healing': 'No',
        'partial paresis': 'No',
        'muscle stiffness': 'No',
        'Alopecia': 'No',
        'Obesity': 'No',
    }

    print("\n--- Test Profile A (Symptom-rich case) ---")
    result_a = predictor.predict(high_risk_sample)
    print(f"Classification: {result_a['classification']}")
    print(f"Statistical Probability: {result_a['estimatedProbability']}%")

    print("\n--- Test Profile B (Asymptomatic case) ---")
    result_b = predictor.predict(low_risk_sample)
    print(f"Classification: {result_b['classification']}")
    print(f"Statistical Probability: {result_b['estimatedProbability']}%")


if __name__ == '__main__':
    main()
