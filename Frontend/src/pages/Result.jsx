import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import {
  Printer,
  Download,
  RotateCcw,
  LayoutDashboard,
  Calendar,
  AlertCircle,
  HelpCircle,
  CheckCircle,
  FileText,
} from 'lucide-react';
import { predictionService } from '../services/predictionService';
import { LoadingSpinner } from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

export const Result = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(location.state?.assessment || null);
  const [loading, setLoading] = useState(!assessment && Boolean(id));
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    if (!assessment && id) {
      let isMounted = true;
      const fetchAssessment = async () => {
        try {
          const res = await predictionService.getPredictionById(id);
          if (isMounted) setAssessment(res.data);
        } catch {
          if (isMounted) setFetchError(true);
        } finally {
          if (isMounted) setLoading(false);
        }
      };
      fetchAssessment();
      return () => {
        isMounted = false;
      };
    }
  }, [id, assessment]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReport = () => {
    if (!assessment) return;

    const reportDate = new Date(assessment.createdAt).toLocaleString();
    const hasResult = Boolean(assessment.predictionResult);

    const reportContent = `
========================================================================
                      YOUR ASSESSMENT RESULTS
========================================================================
Assessment ID       : ${assessment.id}
Date of Assessment  : ${reportDate}
Status              : ${hasResult ? 'Completed' : 'Awaiting Prediction Service'}

------------------------------------------------------------------------
ENTERED HEALTH INFORMATION
------------------------------------------------------------------------
Age                 : ${assessment.measurements?.age || 'Not provided'} years
Height              : ${assessment.measurements?.heightCm || 'Not provided'} cm
Weight              : ${assessment.measurements?.weightKg || 'Not provided'} kg
Body Mass Index     : ${assessment.measurements?.bmi ? `${assessment.measurements.bmi} kg/m²` : 'Not computed'}
Biological Sex      : ${assessment.measurements?.gender || 'Not specified'}
Fasting Glucose     : ${assessment.measurements?.glucose ? `${assessment.measurements.glucose} ${assessment.measurements.glucoseUnit || 'mg/dL'}` : 'Not provided / Unknown'}
Blood Pressure      : ${assessment.measurements?.systolicBP ? `${assessment.measurements.systolicBP}/${assessment.measurements.diastolicBP || '--'} mmHg` : 'Not provided / Unknown'}
Family History      : ${assessment.measurements?.familyHistory === 'yes' ? 'Reported immediate family history' : assessment.measurements?.familyHistory === 'no' ? 'None reported' : 'Not known'}
Physical Activity   : ${assessment.measurements?.physicalActivity || 'Not specified'}

------------------------------------------------------------------------
ASSESSMENT SUMMARY
------------------------------------------------------------------------
${hasResult
  ? `Summary: ${assessment.predictionResult.summary || 'Summary generated based on submitted markers.'}
Classification Output: ${assessment.predictionResult.classification || 'Statistical assessment evaluation'}
${assessment.predictionResult.estimatedProbability !== undefined ? `Statistical Alignment: ${assessment.predictionResult.estimatedProbability}%` : ''}

Note: This is a computer model output and not a confirmed clinical diagnosis.`
  : `Assessment results are not available yet. Please try again when the assessment service is ready.`
}

------------------------------------------------------------------------
IMPORTANT HEALTH MESSAGE
------------------------------------------------------------------------
"This tool is for educational purposes only. It cannot diagnose diabetes 
or replace medical testing. Please speak with a qualified healthcare 
professional about your health concerns or test results."

------------------------------------------------------------------------
IMPORTANT LIMITATIONS
------------------------------------------------------------------------
1. This tool provides educational estimates, not formal medical testing.
2. Only laboratory blood tests ordered by a doctor can confirm or rule out diabetes.
3. A normal result does not mean a person is completely free from risk.
4. Always consult a healthcare professional for clinical advice.
========================================================================
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Assessment_Summary_${assessment.id}.txt`;
    link.click();
    URL.revokeObjectURL(link);
    toast.success('Report saved to your downloads.');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner size="lg" message="Loading your assessment..." />
      </div>
    );
  }

  // If assessment cannot be found or completed
  if (fetchError || !assessment) {
    return (
      <div className="card" style={{ maxWidth: '640px', margin: '3rem auto', padding: '2.5rem', textAlign: 'center' }}>
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#FEE2E2',
            color: '#DC2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
          }}
        >
          <AlertCircle size={28} aria-hidden="true" />
        </div>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Your Assessment Results</h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-text)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          We could not complete your assessment. Please check your answers and try again.
        </p>
        <div className="flex items-center justify-center gap-3" style={{ flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/prediction')}
          >
            Start New Assessment
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate('/dashboard')}
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const measurements = assessment.measurements || {};
  const predictionResult = assessment.predictionResult;
  const isServiceConnected = Boolean(predictionResult);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(assessment.createdAt));

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Header & Action Controls */}
      <div className="no-print flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Assessment Overview</span>
          <h1 style={{ fontSize: '1.75rem', margin: '0.2rem 0 0' }}>Your Assessment Results</h1>
        </div>

        <div className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={handleDownloadReport}
            aria-label="Download assessment summary report"
          >
            <Download size={16} aria-hidden="true" />
            <span>Save Report</span>
          </button>

          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={handlePrint}
            aria-label="Print assessment report"
          >
            <Printer size={16} aria-hidden="true" />
            <span>Print</span>
          </button>

          <Link to="/prediction" className="btn btn-primary btn-sm">
            <RotateCcw size={16} aria-hidden="true" />
            <span>New Assessment</span>
          </Link>
        </div>
      </div>

      {/* Mandatory Important Health Message Notice */}
      <div
        className="alert-banner warning"
        role="region"
        aria-label="Important Health Message"
        style={{
          borderLeft: '5px solid #F59E0B',
          backgroundColor: '#FFFBEB',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.5rem',
        }}
      >
        <HelpCircle size={24} style={{ flexShrink: 0, marginTop: '2px', color: '#D97706' }} aria-hidden="true" />
        <div>
          <strong style={{ display: 'block', fontSize: '1rem', color: '#92400E', marginBottom: '0.35rem' }}>
            Important Health Message
          </strong>
          <p style={{ margin: 0, fontSize: '0.95rem', color: '#78350F', lineHeight: 1.6 }}>
            This tool is for educational purposes only. It cannot diagnose diabetes or replace medical testing. 
            Please speak with a qualified healthcare professional about your health concerns or test results.
          </p>
        </div>
      </div>

      {/* Main Results Card */}
      <div className="card" style={{ padding: '2.5rem' }}>
        {/* Header Metadata */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid var(--color-border-light)',
            marginBottom: '1.75rem',
          }}
        >
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>ASSESSMENT RECORD</span>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              {assessment.id}
            </div>
            <div className="flex items-center gap-1.5" style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
              <Calendar size={14} aria-hidden="true" />
              <span>Assessed on {formattedDate}</span>
            </div>
          </div>

          <div>
            {isServiceConnected ? (
              <span className="badge badge-success" style={{ fontSize: '0.85rem', padding: '0.35rem 0.85rem' }}>
                Service Response Received
              </span>
            ) : (
              <span className="badge badge-neutral" style={{ fontSize: '0.85rem', padding: '0.35rem 0.85rem' }}>
                Answers Recorded
              </span>
            )}
          </div>
        </div>

        {/* 1. Prediction Service Results State */}
        {!isServiceConnected ? (
          /* Disconnected State */
          <div
            style={{
              padding: '1.75rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: '#F8FAFC',
              border: '1px solid var(--color-border)',
              marginBottom: '2rem',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}
            >
              <FileText size={24} aria-hidden="true" />
            </div>
            <h2 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem', color: 'var(--color-text)' }}>
              Assessment results are not available yet. Please try again when the assessment service is ready.
            </h2>
            <p style={{ margin: '0 auto', maxWidth: '600px', fontSize: '0.925rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Your entered information has been securely stored in your previous results. When the prediction service is connected, evaluations will be processed automatically.
            </p>
          </div>
        ) : (
          /* Service Connected State: Display actual response returned by backend */
          <div
            style={{
              padding: '1.75rem',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: '#F8FAFC',
              border: '1px solid var(--color-border)',
              marginBottom: '2rem',
            }}
          >
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
              Returned Backend Evaluation
            </span>
            <h2 style={{ fontSize: '1.35rem', margin: '0.35rem 0 0.75rem', color: 'var(--color-text)' }}>
              {predictionResult.classification || 'Evaluation Summary'}
            </h2>

            {/* Model classification disclaimer */}
            <div
              style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#EFF6FF',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #BFDBFE',
                color: '#1E40AF',
                fontSize: '0.85rem',
                lineHeight: 1.5,
                marginBottom: '1rem',
              }}
            >
              <strong>Model Output Notice:</strong> This classification is a computer model output based on statistical datasets and reference guidelines. It is not a confirmed medical diagnosis.
            </div>

            {/* If valid probability is returned */}
            {predictionResult.estimatedProbability !== undefined && (
              <div style={{ marginBottom: '1rem', padding: '0.85rem 1rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text)' }}>
                    Statistical Alignment Indicator
                  </span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {predictionResult.estimatedProbability}%
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  This percentage represents statistical correlation within reference study data. It does not measure your individual certainty or replace medical testing.
                </p>
              </div>
            )}

            {/* Summary in plain English */}
            {predictionResult.summary && (
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.65 }}>
                {predictionResult.summary}
              </p>
            )}
          </div>
        )}

        {/* 2. Submitted Measurements Reference */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Summary of Your Entered Information</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '0.85rem 1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block' }}>Age</span>
              <strong>{measurements.age ? `${measurements.age} years` : 'Not provided'}</strong>
            </div>

            <div style={{ padding: '0.85rem 1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block' }}>Height & Weight</span>
              <strong>
                {measurements.heightCm ? `${measurements.heightCm} cm` : '--'} / {measurements.weightKg ? `${measurements.weightKg} kg` : '--'}
              </strong>
            </div>

            <div style={{ padding: '0.85rem 1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block' }}>Calculated BMI</span>
              <strong>{measurements.bmi ? `${measurements.bmi} kg/m²` : 'Not computed'}</strong>
            </div>

            <div style={{ padding: '0.85rem 1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block' }}>Fasting Blood Glucose</span>
              <strong>
                {measurements.glucose ? `${measurements.glucose} ${measurements.glucoseUnit || 'mg/dL'}` : 'Not provided / Unknown'}
              </strong>
            </div>

            <div style={{ padding: '0.85rem 1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block' }}>Blood Pressure</span>
              <strong>
                {measurements.systolicBP ? `${measurements.systolicBP}/${measurements.diastolicBP || '--'} mmHg` : 'Not provided / Unknown'}
              </strong>
            </div>

            <div style={{ padding: '0.85rem 1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block' }}>Family History</span>
              <strong>
                {measurements.familyHistory === 'yes'
                  ? 'Immediate family history'
                  : measurements.familyHistory === 'no'
                  ? 'No known family history'
                  : 'Not known'}
              </strong>
            </div>
          </div>
        </div>

        {/* 3. Important Limitations */}
        <div
          style={{
            marginBottom: '2.5rem',
            padding: '1.5rem',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
          }}
        >
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--color-text)' }}>
            Important Limitations
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <li className="flex items-start gap-2" style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>•</span>
              <span>
                <strong>Educational scope:</strong> This tool cannot perform blood tests or laboratory work. Only formal diagnostic tests (such as Fasting Plasma Glucose or HbA1c) administered by a healthcare professional can diagnose diabetes.
              </span>
            </li>
            <li className="flex items-start gap-2" style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>•</span>
              <span>
                <strong>No guarantee of disease absence:</strong> A normal measurement or low indicator profile does not mean a person will never develop diabetes. Regular medical checkups remain essential.
              </span>
            </li>
            <li className="flex items-start gap-2" style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>•</span>
              <span>
                <strong>Personal circumstances:</strong> Medications, acute illnesses, sleep patterns, and other health conditions can affect metabolic markers in ways a general website cannot evaluate.
              </span>
            </li>
          </ul>
        </div>

        {/* 4. Suggested Next Steps */}
        <div
          style={{
            marginBottom: '2.5rem',
            padding: '1.5rem',
            backgroundColor: 'var(--color-primary-light)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(37, 99, 235, 0.2)',
          }}
        >
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: '#1E3A8A' }}>
            Suggested Next Steps
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <li className="flex items-start gap-2" style={{ fontSize: '0.9rem', color: '#1E3A8A', lineHeight: 1.6 }}>
              <CheckCircle size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
              <span>Share these results and any health questions with your doctor or healthcare provider.</span>
            </li>
            <li className="flex items-start gap-2" style={{ fontSize: '0.9rem', color: '#1E3A8A', lineHeight: 1.6 }}>
              <CheckCircle size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
              <span>Schedule routine health checkups, including blood pressure and fasting blood glucose screenings.</span>
            </li>
            <li className="flex items-start gap-2" style={{ fontSize: '0.9rem', color: '#1E3A8A', lineHeight: 1.6 }}>
              <CheckCircle size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
              <span>Incorporate regular physical activity, aiming for 150 minutes of moderate movement (like brisk walking) each week.</span>
            </li>
            <li className="flex items-start gap-2" style={{ fontSize: '0.9rem', color: '#1E3A8A', lineHeight: 1.6 }}>
              <CheckCircle size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
              <span>Choose balanced, nutrient-rich meals with vegetables, whole grains, and water instead of sweetened beverages.</span>
            </li>
            <li className="flex items-start gap-2" style={{ fontSize: '0.9rem', color: '#1E3A8A', lineHeight: 1.6 }}>
              <CheckCircle size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
              <span>Never stop, change, or begin any prescription medication without professional medical direction.</span>
            </li>
          </ul>
        </div>

        {/* Footer Navigation Buttons */}
        <div
          className="no-print"
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <Link to="/dashboard" className="btn btn-outline" style={{ minHeight: '44px' }}>
            <LayoutDashboard size={16} aria-hidden="true" />
            <span>Return to Dashboard</span>
          </Link>

          <div className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
            <Link to="/learn-about-diabetes" className="btn btn-ghost" style={{ minHeight: '44px' }}>
              <span>Learn About Diabetes</span>
            </Link>
            <Link to="/prediction" className="btn btn-primary" style={{ minHeight: '44px' }}>
              <RotateCcw size={16} aria-hidden="true" />
              <span>Check Risk Factors</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
