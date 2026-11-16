const axios = require('axios');

async function testPipeline() {
  console.log('Testing full Pipeline...');
  
  // 1. Test ML microservice health
  try {
    const mlHealth = await axios.get('http://127.0.0.1:5001/health');
    console.log('[1/4] ML Model Service Health:', mlHealth.data);
  } catch (err) {
    console.error('[1/4] ML Model unreachable:', err.message);
  }

  // 2. Test Backend Health
  try {
    const backendHealth = await axios.get('http://127.0.0.1:5000/health');
    console.log('[2/4] Backend Health:', backendHealth.data);
  } catch (err) {
    console.error('[2/4] Backend unreachable:', err.message);
  }

  // 3. Test Backend Auth (Register & Login)
  let token = '';
  try {
    const testEmail = `test_${Date.now()}@college.edu`;
    const regRes = await axios.post('http://127.0.0.1:5000/api/auth/register', {
      name: 'College Tester',
      email: testEmail,
      password: 'Password123!',
    });
    console.log('[3/4] Backend Registration Successful:', regRes.data.user.name, regRes.data.user.email);
    token = regRes.data.token;

    const loginRes = await axios.post('http://127.0.0.1:5000/api/auth/login', {
      email: testEmail,
      password: 'Password123!',
    });
    console.log('[3/4] Backend Login Successful for:', loginRes.data.user.email);
  } catch (err) {
    console.error('[3/4] Auth failed:', err.response?.data || err.message);
  }

  // 4. Test Prediction Pipeline (Frontend -> Backend -> ML Model -> Response)
  try {
    const predRes = await axios.post(
      'http://127.0.0.1:5000/api/predictions',
      {
        age: 52,
        gender: 'Male',
        heightCm: 172,
        weightKg: 88,
        glucose: 175,
        glucoseUnit: 'mg/dL',
        systolicBP: 145,
        diastolicBP: 92,
        familyHistory: 'yes',
        physicalActivity: 'sedentary',
      },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
    console.log('[4/4] Prediction Pipeline Result:');
    console.log(' - Assessment ID:', predRes.data.id);
    console.log(' - Service Connected:', predRes.data.serviceConnected);
    console.log(' - Status:', predRes.data.status);
    console.log(' - Prediction Result:', predRes.data.predictionResult);
  } catch (err) {
    console.error('[4/4] Prediction failed:', err.response?.data || err.message);
  }
}

testPipeline();
