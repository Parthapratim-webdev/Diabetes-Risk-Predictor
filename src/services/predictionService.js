import api from './api';

// Demonstration seed assessments for initial review and college evaluation
const DEMO_ASSESSMENTS = [
  {
    id: 'DRP-2026-8941',
    createdAt: '2026-10-24T10:15:00Z',
    isDemonstration: true,
    status: 'Completed',
    measurements: {
      age: 42,
      gender: 'Male',
      heightCm: 178,
      weightKg: 84,
      bmi: 26.5,
      bmiCategory: 'Overweight',
      glucose: 104, // mg/dL
      systolicBP: 128, // mmHg
      diastolicBP: 82, // mmHg
      hba1c: 5.6,
      familyHistory: true,
      physicalActivity: 'Moderate (1-2 days/week)',
      dietaryQuality: 'Balanced',
      smoker: false,
    },
    predictionResult: {
      classification: 'Moderate Risk Factor Indicators Identified',
      estimatedProbability: 38,
      riskLevel: 'Moderate',
      summary: 'Evaluation identified a combination of elevated body mass index (BMI 26.5), mild fasting glucose elevation (104 mg/dL), and a reported family history of diabetes.',
      contributingFactors: [
        { factor: 'Fasting Blood Glucose', value: '104 mg/dL', status: 'Slightly Elevated (Normal: < 100 mg/dL)', impact: 'Moderate' },
        { factor: 'Body Mass Index (BMI)', value: '26.5 kg/m²', status: 'Overweight (Normal: 18.5 - 24.9)', impact: 'Moderate' },
        { factor: 'Family History', value: 'Yes (First-degree relative)', status: 'Reported Genetic Predisposition', impact: 'Moderate' },
        { factor: 'Blood Pressure', value: '128/82 mmHg', status: 'Prehypertension range', impact: 'Low' },
      ],
      recommendations: [
        'Schedule a routine fasting plasma glucose or oral glucose tolerance test with a physician.',
        'Adopt regular aerobic physical activity aiming for at least 150 minutes per week.',
        'Consult a certified registered dietitian for individualized nutritional planning.',
        'Maintain periodic monitoring of blood pressure and metabolic markers.',
      ],
      disclaimer: 'This assessment is for educational purposes only and is not a medical diagnosis. Consult a qualified healthcare professional for appropriate testing and interpretation.',
    },
  },
  {
    id: 'DRP-2026-7812',
    createdAt: '2026-09-12T14:20:00Z',
    isDemonstration: true,
    status: 'Completed',
    measurements: {
      age: 34,
      gender: 'Female',
      heightCm: 165,
      weightKg: 59,
      bmi: 21.7,
      bmiCategory: 'Normal Weight',
      glucose: 88,
      systolicBP: 114,
      diastolicBP: 74,
      hba1c: 5.1,
      familyHistory: false,
      physicalActivity: 'Active (3-5 days/week)',
      dietaryQuality: 'High fiber, low processed sugars',
      smoker: false,
    },
    predictionResult: {
      classification: 'Low Risk Factor Indicators',
      estimatedProbability: 12,
      riskLevel: 'Low',
      summary: 'Current biometrics, blood pressure, fasting glucose, and activity patterns are within conventional healthy clinical guidelines.',
      contributingFactors: [
        { factor: 'Fasting Blood Glucose', value: '88 mg/dL', status: 'Optimal Reference Range (< 100 mg/dL)', impact: 'Low' },
        { factor: 'Body Mass Index (BMI)', value: '21.7 kg/m²', status: 'Normal Weight Range', impact: 'Low' },
        { factor: 'Family History', value: 'None reported', status: 'No direct genetic history reported', impact: 'Low' },
        { factor: 'Blood Pressure', value: '114/74 mmHg', status: 'Normal Healthy Range', impact: 'Low' },
      ],
      recommendations: [
        'Continue regular cardiovascular exercise and muscle strengthening.',
        'Maintain balanced nutritional habits with adequate dietary fiber.',
        'Schedule standard annual wellness exams.',
      ],
      disclaimer: 'This assessment is for educational purposes only and is not a medical diagnosis. Consult a qualified healthcare professional for appropriate testing and interpretation.',
    },
  },
  {
    id: 'DRP-2026-6510',
    createdAt: '2026-08-05T08:45:00Z',
    isDemonstration: true,
    status: 'Completed',
    measurements: {
      age: 56,
      gender: 'Male',
      heightCm: 172,
      weightKg: 95,
      bmi: 32.1,
      bmiCategory: 'Obesity Class I',
      glucose: 132,
      systolicBP: 142,
      diastolicBP: 90,
      hba1c: 6.7,
      familyHistory: true,
      physicalActivity: 'Sedentary',
      dietaryQuality: 'Refined carbs & sweetened beverages',
      smoker: true,
    },
    predictionResult: {
      classification: 'Elevated Risk Factors Detected',
      estimatedProbability: 74,
      riskLevel: 'Elevated',
      summary: 'Multiple clinically significant risk factors observed, including fasting hyperglycemia (132 mg/dL), Class I obesity (BMI 32.1), and stage 2 hypertension indicators.',
      contributingFactors: [
        { factor: 'Fasting Blood Glucose', value: '132 mg/dL', status: 'Hyperglycemic Threshold (≥ 126 mg/dL)', impact: 'High' },
        { factor: 'HbA1c Indicator', value: '6.7%', status: 'Elevated Glycemic Threshold', impact: 'High' },
        { factor: 'Body Mass Index (BMI)', value: '32.1 kg/m²', status: 'Obesity Class I', impact: 'High' },
        { factor: 'Blood Pressure', value: '142/90 mmHg', status: 'Hypertension Stage 2 indicators', impact: 'Moderate' },
      ],
      recommendations: [
        'Urgent consultation with a primary care physician or endocrinologist for clinical laboratory diagnostics.',
        'Laboratory confirmation via venous plasma glucose testing and HbA1c panel.',
        'Comprehensive lifestyle intervention supervised by healthcare professionals.',
        'Cardiovascular health and lipid panel screening.',
      ],
      disclaimer: 'This assessment is for educational purposes only and is not a medical diagnosis. Consult a qualified healthcare professional for appropriate testing and interpretation.',
    },
  },
];

// Helper to get local demo storage
const getStoredDemoAssessments = () => {
  const local = sessionStorage.getItem('drp_demo_assessments');
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      return DEMO_ASSESSMENTS;
    }
  }
  sessionStorage.setItem('drp_demo_assessments', JSON.stringify(DEMO_ASSESSMENTS));
  return DEMO_ASSESSMENTS;
};

export const predictionService = {
  /**
   * Submit new assessment
   * POST /api/predictions
   */
  async submitPrediction(formData) {
    try {
      const response = await api.post('/predictions', formData);
      return response.data;
    } catch (error) {
      if (error.isNetworkError || import.meta.env.VITE_ENABLE_DEMO_MODE === 'true') {
        // Construct educational demonstration evaluation
        const currentList = getStoredDemoAssessments();
        const heightM = formData.heightCm / 100;
        const bmi = parseFloat((formData.weightKg / (heightM * heightM)).toFixed(1));
        
        let classification = 'Low Risk Factor Indicators';
        let riskLevel = 'Low';
        let probability = 18;

        const isGlucoseHigh = formData.glucose >= 126;
        const isGlucoseImpaired = formData.glucose >= 100 && formData.glucose < 126;
        const isBMIHigh = bmi >= 30;
        const isBMIOver = bmi >= 25 && bmi < 30;
        const hasFamilyHistory = formData.familyHistory === true || formData.familyHistory === 'true';

        let riskPoints = 0;
        if (isGlucoseHigh) riskPoints += 45;
        else if (isGlucoseImpaired) riskPoints += 25;

        if (isBMIHigh) riskPoints += 25;
        else if (isBMIOver) riskPoints += 15;

        if (hasFamilyHistory) riskPoints += 15;
        if (formData.age > 45) riskPoints += 10;
        if (formData.systolicBP >= 130 || formData.diastolicBP >= 85) riskPoints += 10;

        probability = Math.min(Math.max(riskPoints, 8), 88);

        if (probability >= 60) {
          classification = 'Elevated Risk Factors Detected';
          riskLevel = 'Elevated';
        } else if (probability >= 30) {
          classification = 'Moderate Risk Factor Indicators Identified';
          riskLevel = 'Moderate';
        }

        const newAssessment = {
          id: `DRP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
          createdAt: new Date().toISOString(),
          isDemonstration: true,
          status: 'Completed',
          measurements: {
            ...formData,
            bmi,
          },
          predictionResult: {
            classification,
            estimatedProbability: probability,
            riskLevel,
            summary: `Demonstration analysis processed based on biometric inputs (BMI ${bmi}, Glucose ${formData.glucose} mg/dL, BP ${formData.systolicBP}/${formData.diastolicBP} mmHg).`,
            contributingFactors: [
              {
                factor: 'Fasting Blood Glucose',
                value: `${formData.glucose} mg/dL`,
                status: isGlucoseHigh ? 'High (≥126 mg/dL)' : isGlucoseImpaired ? 'Impaired Fasting (100-125 mg/dL)' : 'Normal (<100 mg/dL)',
                impact: isGlucoseHigh ? 'High' : isGlucoseImpaired ? 'Moderate' : 'Low',
              },
              {
                factor: 'Body Mass Index (BMI)',
                value: `${bmi} kg/m²`,
                status: bmi >= 30 ? 'Obesity Category' : bmi >= 25 ? 'Overweight Category' : 'Normal Weight',
                impact: bmi >= 30 ? 'High' : bmi >= 25 ? 'Moderate' : 'Low',
              },
              {
                factor: 'Family History',
                value: hasFamilyHistory ? 'Yes' : 'No',
                status: hasFamilyHistory ? 'Family Predisposition Present' : 'No Known First-Degree History',
                impact: hasFamilyHistory ? 'Moderate' : 'Low',
              },
              {
                factor: 'Blood Pressure',
                value: `${formData.systolicBP}/${formData.diastolicBP} mmHg`,
                status: formData.systolicBP >= 130 ? 'Elevated BP' : 'Standard BP',
                impact: formData.systolicBP >= 130 ? 'Moderate' : 'Low',
              },
            ],
            recommendations: [
              'Share this educational summary with your primary care provider or physician.',
              'Pursue definitive laboratory diagnostic panels (HbA1c & Fasting Plasma Glucose).',
              'Participate in regular physical exercise and balanced nutrition.',
              'Maintain routine cardiovascular checkups.',
            ],
            disclaimer: 'This assessment is for educational purposes only and is not a medical diagnosis. Consult a qualified healthcare professional for appropriate testing and interpretation.',
          },
        };

        const updated = [newAssessment, ...currentList];
        sessionStorage.setItem('drp_demo_assessments', JSON.stringify(updated));
        return {
          success: true,
          data: newAssessment,
          isDemonstration: true,
        };
      }
      throw error;
    }
  },

  /**
   * Get prediction history with optional search/filter
   * GET /api/predictions
   */
  async getPredictionHistory(params = {}) {
    try {
      const response = await api.get('/predictions', { params });
      return response.data;
    } catch {
      const list = getStoredDemoAssessments();
      let filtered = [...list];

      if (params.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter((item) =>
          item.id.toLowerCase().includes(query) ||
          item.predictionResult?.classification?.toLowerCase().includes(query)
        );
      }

      if (params.riskLevel && params.riskLevel !== 'ALL') {
        filtered = filtered.filter(
          (item) => item.predictionResult?.riskLevel?.toLowerCase() === params.riskLevel.toLowerCase()
        );
      }

      if (params.sort === 'oldest') {
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else {
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      return {
        success: true,
        data: filtered,
        total: filtered.length,
        isDemonstration: true,
      };
    }
  },

  /**
   * Get prediction by ID
   * GET /api/predictions/:id
   */
  async getPredictionById(id) {
    try {
      const response = await api.get(`/predictions/${id}`);
      return response.data;
    } catch {
      const list = getStoredDemoAssessments();
      const match = list.find((item) => item.id.toLowerCase() === id.toLowerCase());
      if (match) {
        return { success: true, data: match, isDemonstration: true };
      }
      throw { message: 'Assessment record not found' };
    }
  },

  /**
   * Delete an assessment record
   * DELETE /api/predictions/:id
   */
  async deleteAssessment(id) {
    try {
      const response = await api.delete(`/predictions/${id}`);
      return response.data;
    } catch {
      const list = getStoredDemoAssessments();
      const updated = list.filter((item) => item.id !== id);
      sessionStorage.setItem('drp_demo_assessments', JSON.stringify(updated));
      return { success: true, message: 'Assessment record deleted.' };
    }
  },
};
