/**
 * Form Validation and Health Measurement Ranges
 */

export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/**
 * Calculates password strength and returns rating, score (0-4), and requirements checklist
 */
export const checkPasswordStrength = (password = '') => {
  const criteria = {
    minLength: password.length >= 8,
    hasLower: /[a-z]/.test(password),
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(criteria).filter(Boolean).length;

  let label = 'Very Weak';
  let color = '#DC2626';

  if (score === 2) {
    label = 'Weak';
    color = '#EA580C';
  } else if (score === 3) {
    label = 'Fair';
    color = '#F59E0B';
  } else if (score === 4) {
    label = 'Good';
    color = '#0D9488';
  } else if (score === 5) {
    label = 'Strong';
    color = '#16A34A';
  }

  return {
    score,
    maxScore: 5,
    percentage: Math.min((score / 5) * 100, 100),
    label,
    color,
    criteria,
  };
};

/**
 * Health measurement range definitions and educational context
 */
export const CLINICAL_RANGES = {
  age: {
    min: 18,
    max: 120,
    unit: 'years',
    label: 'Age',
  },
  height: {
    min: 50,
    max: 260,
    unit: 'cm',
    label: 'Height',
  },
  weight: {
    min: 20,
    max: 350,
    unit: 'kg',
    label: 'Weight',
  },
  glucose: {
    min: 50,
    max: 400,
    unit: 'mg/dL',
    label: 'Fasting Blood Glucose',
    normalRange: '70 - 99 mg/dL',
    elevatedRange: '100 - 125 mg/dL (Impaired Fasting)',
    highRange: '≥ 126 mg/dL (Requires Clinical Testing)',
  },
  systolicBP: {
    min: 70,
    max: 230,
    unit: 'mmHg',
    label: 'Systolic Blood Pressure',
    normalRange: '< 120 mmHg',
  },
  diastolicBP: {
    min: 40,
    max: 140,
    unit: 'mmHg',
    label: 'Diastolic Blood Pressure',
    normalRange: '< 80 mmHg',
  },
  hba1c: {
    min: 3.5,
    max: 16.0,
    unit: '%',
    label: 'HbA1c (Glycated Hemoglobin)',
    normalRange: '< 5.7%',
  },
};
