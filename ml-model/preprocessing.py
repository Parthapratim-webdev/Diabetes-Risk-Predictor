"""
Preprocessing Pipeline for Diabetes Risk Predictor
Dataset: UCI Early Stage Diabetes Risk Prediction Dataset
Features: Age, Gender, and 14 clinical symptom indicators + Obesity
"""

import pandas as pd
import numpy as np

# Canonical feature list expected by the model
FEATURE_COLUMNS = [
    'Age',
    'Gender',
    'Polyuria',
    'Polydipsia',
    'sudden weight loss',
    'weakness',
    'Polyphagia',
    'Genital thrush',
    'visual blurring',
    'Itching',
    'Irritability',
    'delayed healing',
    'partial paresis',
    'muscle stiffness',
    'Alopecia',
    'Obesity',
]

TARGET_COLUMN = 'class'

# Categorical binary mappings
BINARY_MAPPINGS = {
    'Gender': {'Male': 1, 'Female': 0, 'male': 1, 'female': 0, 1: 1, 0: 0},
    'Polyuria': {'Yes': 1, 'No': 0, 'yes': 1, 'no': 0, True: 1, False: 0, 1: 1, 0: 0},
    'Polydipsia': {'Yes': 1, 'No': 0, 'yes': 1, 'no': 0, True: 1, False: 0, 1: 1, 0: 0},
    'sudden weight loss': {'Yes': 1, 'No': 0, 'yes': 1, 'no': 0, True: 1, False: 0, 1: 1, 0: 0},
    'weakness': {'Yes': 1, 'No': 0, 'yes': 1, 'no': 0, True: 1, False: 0, 1: 1, 0: 0},
    'Polyphagia': {'Yes': 1, 'No': 0, 'yes': 1, 'no': 0, True: 1, False: 0, 1: 1, 0: 0},
    'Genital thrush': {'Yes': 1, 'No': 0, 'yes': 1, 'no': 0, True: 1, False: 0, 1: 1, 0: 0},
    'visual blurring': {'Yes': 1, 'No': 0, 'yes': 1, 'no': 0, True: 1, False: 0, 1: 1, 0: 0},
    'Itching': {'Yes': 1, 'No': 0, 'yes': 1, 'no': 0, True: 1, False: 0, 1: 1, 0: 0},
    'Irritability': {'Yes': 1, 'No': 0, 'yes': 1, 'no': 0, True: 1, False: 0, 1: 1, 0: 0},
    'delayed healing': {'Yes': 1, 'No': 0, 'yes': 1, 'no': 0, True: 1, False: 0, 1: 1, 0: 0},
    'partial paresis': {'Yes': 1, 'No': 0, 'yes': 1, 'no': 0, True: 1, False: 0, 1: 1, 0: 0},
    'muscle stiffness': {'Yes': 1, 'No': 0, 'yes': 1, 'no': 0, True: 1, False: 0, 1: 1, 0: 0},
    'Alopecia': {'Yes': 1, 'No': 0, 'yes': 1, 'no': 0, True: 1, False: 0, 1: 1, 0: 0},
    'Obesity': {'Yes': 1, 'No': 0, 'yes': 1, 'no': 0, True: 1, False: 0, 1: 1, 0: 0},
}

TARGET_MAPPING = {
    'Positive': 1,
    'Negative': 0,
    'positive': 1,
    'negative': 0,
    1: 1,
    0: 0,
}


def load_raw_dataset(csv_path):
    """Load dataset from CSV file."""
    df = pd.read_csv(csv_path)
    return df


def preprocess_data(df, is_training=True):
    """
    Apply encoding to dataset without data leakage.
    Returns:
      If is_training=True: (X, y)
      If is_training=False: X
    """
    df_clean = df.copy()

    # Ensure required feature columns exist
    for col in FEATURE_COLUMNS:
        if col not in df_clean.columns:
            raise ValueError(f"Missing required feature column: '{col}'")

    # Clean Age
    df_clean['Age'] = pd.to_numeric(df_clean['Age'], errors='coerce')
    if df_clean['Age'].isnull().any():
        raise ValueError("Invalid non-numeric values detected in 'Age' feature.")

    # Encode categorical features
    for col, mapping in BINARY_MAPPINGS.items():
        if col in df_clean.columns:
            df_clean[col] = df_clean[col].map(mapping)
            if df_clean[col].isnull().any():
                invalid_vals = df[col][df_clean[col].isnull()].unique()
                raise ValueError(
                    f"Unexpected categorical value in column '{col}': {invalid_vals}. "
                    f"Expected one of: {list(mapping.keys())}"
                )

    X = df_clean[FEATURE_COLUMNS]

    if is_training:
        if TARGET_COLUMN not in df_clean.columns:
            raise ValueError(f"Target column '{TARGET_COLUMN}' not found in dataset.")
        y = df_clean[TARGET_COLUMN].map(TARGET_MAPPING)
        if y.isnull().any():
            raise ValueError(f"Target contains unmapped values in '{TARGET_COLUMN}'.")
        return X, y

    return X


def prepare_single_input(input_dict):
    """
    Validates and formats a single assessment input dictionary into a DataFrame
    ready for model prediction. Supports flexible case matching and adapts
    clinical measurements (glucose, BP, BMI, etc.) into symptom indicators if not explicitly provided.
    """
    # Key normalization dictionary
    normalized_keys = {k.lower().strip(): v for k, v in input_dict.items()}

    # Check for biometric measurements
    glucose_val = normalized_keys.get('glucose')
    try:
        glucose_val = float(glucose_val) if glucose_val is not None and glucose_val != '' else None
    except (ValueError, TypeError):
        glucose_val = None

    bmi_val = normalized_keys.get('bmi')
    try:
        bmi_val = float(bmi_val) if bmi_val is not None and bmi_val != '' else None
    except (ValueError, TypeError):
        bmi_val = None

    # Derive BMI from heightCm & weightKg if missing
    if bmi_val is None:
        try:
            h = float(normalized_keys.get('heightcm') or normalized_keys.get('height') or 0) / 100.0
            w = float(normalized_keys.get('weightkg') or normalized_keys.get('weight') or 0)
            if h > 0 and w > 0:
                bmi_val = round(w / (h * h), 1)
        except (ValueError, TypeError):
            bmi_val = None

    systolic_val = normalized_keys.get('systolicbp') or normalized_keys.get('systolic')
    try:
        systolic_val = float(systolic_val) if systolic_val is not None and systolic_val != '' else None
    except (ValueError, TypeError):
        systolic_val = None

    family_hist = str(normalized_keys.get('familyhistory', '')).lower()
    activity = str(normalized_keys.get('physicalactivity', '')).lower()

    # Clinical fallback mapping rules
    clinical_defaults = {
        'obesity': 'Yes' if (bmi_val and bmi_val >= 30) else 'No',
        'polyuria': 'Yes' if (glucose_val and glucose_val >= 140) or family_hist in ('yes', 'true') else 'No',
        'polydipsia': 'Yes' if (glucose_val and glucose_val >= 140) else 'No',
        'sudden weight loss': 'Yes' if (glucose_val and glucose_val >= 180) else 'No',
        'weakness': 'Yes' if (glucose_val and glucose_val >= 140) or activity == 'sedentary' else 'No',
        'polyphagia': 'Yes' if (glucose_val and glucose_val >= 160) else 'No',
        'genital thrush': 'No',
        'visual blurring': 'Yes' if (glucose_val and glucose_val >= 160) or (systolic_val and systolic_val >= 140) else 'No',
        'itching': 'No',
        'irritability': 'Yes' if (systolic_val and systolic_val >= 140) else 'No',
        'delayed healing': 'Yes' if (glucose_val and glucose_val >= 150) else 'No',
        'partial paresis': 'No',
        'muscle stiffness': 'Yes' if (systolic_val and systolic_val >= 140) else 'No',
        'alopecia': 'No',
    }

    formatted = {}

    for col in FEATURE_COLUMNS:
        lower_col = col.lower()
        if lower_col not in normalized_keys:
            # Check known aliases
            alias_map = {
                'sudden weight loss': 'suddenweightloss',
                'genital thrush': 'genitalthrush',
                'visual blurring': 'visualblurring',
                'delayed healing': 'delayedhealing',
                'partial paresis': 'partialparesis',
                'muscle stiffness': 'musclestiffness',
            }
            if lower_col in alias_map and alias_map[lower_col] in normalized_keys:
                val = normalized_keys[alias_map[lower_col]]
            elif lower_col in clinical_defaults:
                val = clinical_defaults[lower_col]
            elif lower_col == 'gender':
                raw_gender = normalized_keys.get('gender', 'Male')
                val = 'Female' if str(raw_gender).lower() in ('female', 'f') else 'Male'
            elif lower_col == 'age':
                val = normalized_keys.get('age', 40)
            else:
                raise ValueError(f"Missing required assessment feature: '{col}'")
        else:
            val = normalized_keys[lower_col]

        # Age handling
        if col == 'Age':
            try:
                age_val = float(val)
                if not (1 <= age_val <= 120):
                    raise ValueError(f"Age must be between 1 and 120, got {age_val}")
                formatted[col] = age_val
            except Exception as e:
                raise ValueError(f"Invalid age input: {val}. Error: {e}")
        elif col == 'Gender':
            str_gender = str(val).capitalize()
            if str_gender in ('Male', 'Female'):
                formatted[col] = BINARY_MAPPINGS['Gender'][str_gender]
            else:
                formatted[col] = 1 # Default male if unspecified
        else:
            # Map categorical values
            mapping = BINARY_MAPPINGS[col]
            if val in mapping:
                formatted[col] = mapping[val]
            elif str(val).capitalize() in mapping:
                formatted[col] = mapping[str(val).capitalize()]
            else:
                raise ValueError(
                    f"Invalid value for '{col}': '{val}'. "
                    f"Allowed values are: Yes/No, true/false, or 1/0."
                )

    df_single = pd.DataFrame([formatted], columns=FEATURE_COLUMNS)
    return df_single
