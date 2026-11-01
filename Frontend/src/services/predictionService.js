import api from './api';

// Storage key for user assessments in the active browser session
const STORAGE_KEY = 'drp_user_assessments';

// Helper to get stored assessments (starts empty - never show sample records as genuine medical info)
const getStoredAssessments = () => {
  const local = sessionStorage.getItem(STORAGE_KEY);
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      return [];
    }
  }
  return [];
};

// Helper to save assessments
const saveStoredAssessments = (assessments) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(assessments));
};

export const predictionService = {
  /**
   * Submit new assessment
   * POST /api/predictions
   */
  async submitPrediction(formData) {
    // Height & Weight BMI computation for educational reference
    let bmi = null;
    if (formData.heightCm && formData.weightKg) {
      const heightM = Number(formData.heightCm) / 100;
      if (heightM > 0) {
        bmi = parseFloat((Number(formData.weightKg) / (heightM * heightM)).toFixed(1));
      }
    }

    const payload = {
      ...formData,
      bmi,
    };

    try {
      // 1. Attempt submission to the real backend prediction service
      const response = await api.post('/predictions', payload);
      const assessmentData = response.data?.data || response.data;

      // Save to session history
      const currentList = getStoredAssessments();
      const updated = [assessmentData, ...currentList.filter((a) => a.id !== assessmentData.id)];
      saveStoredAssessments(updated);

      return {
        success: true,
        data: assessmentData,
        serviceConnected: true,
      };
    } catch {
      // 2. If the backend server or prediction pipeline is not reachable:
      // Store the user's entered answers without calculating an arbitrary medical score or inventing fake probabilities.
      const assessmentId = `DRP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const savedRecord = {
        id: assessmentId,
        createdAt: new Date().toISOString(),
        status: 'Awaiting Prediction Service',
        serviceConnected: false,
        measurements: {
          ...payload,
        },
        predictionResult: null, // No fabricated result when service is disconnected
        serviceUnavailableMessage:
          'Assessment results are not available yet. Please try again when the assessment service is ready.',
        educationalMessage:
          'This tool is for educational purposes only. It cannot diagnose diabetes or replace medical testing. Please speak with a qualified healthcare professional about your health concerns or test results.',
      };

      const currentList = getStoredAssessments();
      const updated = [savedRecord, ...currentList];
      saveStoredAssessments(updated);

      return {
        success: true,
        data: savedRecord,
        serviceConnected: false,
      };
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
      // Fallback to user's saved session assessments (empty by default)
      const list = getStoredAssessments();
      let filtered = [...list];

      if (params.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter(
          (item) =>
            item.id?.toLowerCase().includes(query) ||
            item.predictionResult?.classification?.toLowerCase().includes(query) ||
            item.predictionResult?.summary?.toLowerCase().includes(query)
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
      const list = getStoredAssessments();
      const match = list.find((item) => item.id?.toLowerCase() === id?.toLowerCase());
      if (match) {
        return { success: true, data: match };
      }
      throw new Error('Assessment record not found');
    }
  },

  /**
   * Delete an assessment record
   * DELETE /api/predictions/:id
   */
  async deleteAssessment(id) {
    try {
      const response = await api.delete(`/predictions/${id}`);
      const list = getStoredAssessments();
      const updated = list.filter((item) => item.id !== id);
      saveStoredAssessments(updated);
      return response.data;
    } catch {
      const list = getStoredAssessments();
      const updated = list.filter((item) => item.id !== id);
      saveStoredAssessments(updated);
      return { success: true, message: 'Assessment record deleted.' };
    }
  },
};
