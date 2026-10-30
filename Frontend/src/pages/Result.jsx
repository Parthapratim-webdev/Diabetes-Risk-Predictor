import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import {
  ShieldAlert,
  Printer,
  Download,
  RotateCcw,
  LayoutDashboard,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { predictionService } from '../services/predictionService';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import toast from 'react-hot-toast';

export const Result = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(location.state?.assessment || null);
  const [loading, setLoading] = useState(!assessment && Boolean(id));

  useEffect(() => {
    if (!assessment && id) {
      let isMounted = true;
      const fetchAssessment = async () => {
        try {
          const res = await predictionService.getPredictionById(id);
          if (isMounted) setAssessment(res.data);
        } catch (err) {
          console.warn('Could not find assessment record by ID:', err);
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

    const reportContent = `
========================================================================
             DIABETES RISK PREDICTOR — EDUCATIONAL REPORT
========================================================================
Assessment Reference ID : ${assessment.id}
Assessment Date         : ${new Date(assessment.createdAt).toLocaleString()}
Status                  : ${assessment.status || 'Evaluated'}
Environment             : Demonstration & Integration Pipeline

------------------------------------------------------------------------
SUBMITTED BIOMETRICS & MEASUREMENTS
------------------------------------------------------------------------
Age                     : ${assessment.measurements?.age || '--'} years
Biological Sex          : ${assessment.measurements?.gender || '--'}
Height                  : ${assessment.measurements?.heightCm || '--'} cm
Weight                  : ${assessment.measurements?.weightKg || '--'} kg
Calculated BMI          : ${assessment.measurements?.bmi || '--'} kg/m²
Fasting Blood Glucose   : ${assessment.measurements?.glucose || '--'} mg/dL
Blood Pressure          : ${assessment.measurements?.systolicBP || '--'}/${assessment.measurements?.diastolicBP || '--'} mmHg
HbA1c Glycated Hgb      : ${assessment.measurements?.hba1c ? assessment.measurements.hba1c + '%' : 'Not provided'}
Family History          : ${assessment.measurements?.familyHistory ? 'Yes' : 'None reported'}
Physical Activity       : ${assessment.measurements?.physicalActivity || '--'}

------------------------------------------------------------------------
EVALUATION RESULT (EDUCATIONAL CONTEXT)
------------------------------------------------------------------------
Returned Classification : ${assessment.predictionResult?.classification}
Estimated Indicator Prob: ${assessment.predictionResult?.estimatedProbability}%
Summary                 : ${assessment.predictionResult?.summary}

CONTRIBUTING FACTORS:
${assessment.predictionResult?.contributingFactors?.map((f) => ` • ${f.factor}: ${f.value} (${f.status})`).join('\n') || 'None'}

RECOMMENDED ACTIONS & LIFESTYLE GUIDANCE:
${assessment.predictionResult?.recommendations?.map((r) => ` • ${r}`).join('\n') || 'None'}

------------------------------------------------------------------------
IMPORTANT EDUCATIONAL & CLINICAL DISCLAIMER
------------------------------------------------------------------------
"This assessment is for educational purposes only and is not a medical 
diagnosis. Consult a qualified healthcare professional for appropriate 
testing and interpretation."
========================================================================
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Diabetes_Risk_Assessment_${assessment.id}.txt`;
    link.click();
    URL.revokeObjectURL(link);
    toast.success('Assessment report downloaded.');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner size="lg" message="Loading assessment evaluation details..." />
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="card" style={{ maxWidth: '600px', margin: '3rem auto' }}>
        <EmptyState
          title="No Assessment Result Found"
          description="We couldn't retrieve the requested assessment record. You can start a new health assessment or explore your history."
          actionText="Start New Assessment"
          onAction={() => navigate('/prediction')}
          secondaryActionText="Go to Dashboard"
          onSecondaryAction={() => navigate('/dashboard')}
        />
      </div>
    );
  }

  const result = assessment.predictionResult;
  const measurements = assessment.measurements;
  const isDemonstration = assessment.isDemonstration ?? true;

  const riskLevel = result?.riskLevel || 'Low';
  const badgeClass =
    riskLevel === 'Low'
      ? 'badge-success'
      : riskLevel === 'Moderate'
      ? 'badge-warning'
      : 'badge-danger';

  const riskColor =
    riskLevel === 'Low'
      ? '#16A34A'
      : riskLevel === 'Moderate'
      ? '#D97706'
      : '#DC2626';

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Action Bar (Top) */}
      <div className="no-print flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Assessment Overview</span>
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Assessment Summary & Report</h2>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" className="btn btn-outline btn-sm" onClick={handleDownloadReport}>
            <Download size={16} />
            <span>Download Report</span>
          </button>
          <button type="button" className="btn btn-outline btn-sm" onClick={handlePrint}>
            <Printer size={16} />
            <span>Print Report</span>
          </button>
          <Link to="/prediction" className="btn btn-primary btn-sm">
            <RotateCcw size={16} />
            <span>New Assessment</span>
          </Link>
        </div>
      </div>

      {/* Mandatory Clinical Disclaimer Banner */}
      <div
        className="alert-banner warning"
        style={{
          borderLeft: '5px solid #F59E0B',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <ShieldAlert size={24} style={{ flexShrink: 0, marginTop: '2px', color: '#D97706' }} />
        <div>
          <strong style={{ display: 'block', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
            Medical & Clinical Scope Disclaimer
          </strong>
          <span style={{ fontSize: '0.9rem' }}>
            This assessment is for educational purposes only and is not a medical diagnosis. Consult a qualified healthcare professional for appropriate testing and interpretation.
          </span>
        </div>
      </div>

      {/* Main Result Card */}
      <div className="card" style={{ padding: '2.5rem' }}>
        {/* Header Metadata */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--color-border-light)',
            marginBottom: '1.75rem',
          }}
        >
          <div>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>ASSESSMENT ID:</span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>{assessment.id}</strong>
            </div>
            <div className="flex items-center gap-2" style={{ marginTop: '0.25rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              <Calendar size={14} />
              <span>{new Date(assessment.createdAt).toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isDemonstration && (
              <span className="badge badge-neutral" title="Frontend demonstration pipeline">
                Demonstration State
              </span>
            )}
            <span className={`badge ${badgeClass}`} style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
              {result?.classification || 'Assessment Completed'}
            </span>
          </div>
        </div>

        {/* Primary Classification & Probability Bar */}
        <div
          style={{
            backgroundColor: '#F8FAFC',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            border: '1px solid var(--color-border)',
            marginBottom: '2rem',
          }}
        >
          <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-text)' }}>
              Estimated Risk Indicator Probability
            </span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: riskColor }}>
              {result?.estimatedProbability !== undefined ? `${result.estimatedProbability}%` : 'Provided by API'}
            </span>
          </div>

          {result?.estimatedProbability !== undefined && (
            <div style={{ height: '10px', backgroundColor: '#E2E8F0', borderRadius: '5px', overflow: 'hidden', marginBottom: '1rem' }}>
              <div
                style={{
                  height: '100%',
                  width: `${result.estimatedProbability}%`,
                  backgroundColor: riskColor,
                  borderRadius: '5px',
                  transition: 'width 0.5s ease',
                }}
              />
            </div>
          )}

          <p style={{ margin: 0, fontSize: '0.925rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
            {result?.summary}
          </p>
        </div>

        {/* Contributing Factors Breakdown */}
        {result?.contributingFactors && result.contributingFactors.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Contributing Biometric Factors</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {result.contributingFactors.map((factor, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                    {factor.factor}
                  </span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0.25rem 0', color: 'var(--color-text)' }}>
                    {factor.value}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{factor.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submitted Measurements Summary Grid */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>Submitted Measurements Reference</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '0.85rem 1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Age / Gender</span>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '0.2rem' }}>
                {measurements?.age} yrs / {measurements?.gender}
              </div>
            </div>

            <div style={{ padding: '0.85rem 1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Height / Weight</span>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '0.2rem' }}>
                {measurements?.heightCm} cm / {measurements?.weightKg} kg
              </div>
            </div>

            <div style={{ padding: '0.85rem 1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Body Mass Index (BMI)</span>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '0.2rem' }}>
                {measurements?.bmi} kg/m²
              </div>
            </div>

            <div style={{ padding: '0.85rem 1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Fasting Blood Glucose</span>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '0.2rem' }}>
                {measurements?.glucose} mg/dL
              </div>
            </div>

            <div style={{ padding: '0.85rem 1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Blood Pressure</span>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '0.2rem' }}>
                {measurements?.systolicBP}/{measurements?.diastolicBP} mmHg
              </div>
            </div>

            <div style={{ padding: '0.85rem 1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Family History</span>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginTop: '0.2rem' }}>
                {measurements?.familyHistory ? 'Positive (Reported)' : 'No First-Degree'}
              </div>
            </div>
          </div>
        </div>

        {/* General Health Education & Next Steps */}
        <div
          style={{
            backgroundColor: 'var(--color-primary-light)',
            padding: '1.75rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(37, 99, 235, 0.2)',
          }}
        >
          <div className="flex items-center gap-2" style={{ marginBottom: '0.85rem', color: 'var(--color-primary)' }}>
            <Sparkles size={20} />
            <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--color-primary)' }}>
              Recommended Educational Next Steps
            </h3>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', margin: 0, padding: 0 }}>
            {result?.recommendations?.map((item, i) => (
              <li key={i} className="flex items-start gap-2" style={{ fontSize: '0.9rem', color: '#1E3A8A' }}>
                <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '3px', color: 'var(--color-primary)' }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Navigation Buttons */}
        <div
          className="no-print"
          style={{
            marginTop: '2.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <Link to="/dashboard" className="btn btn-outline">
            <LayoutDashboard size={16} />
            <span>View Your Progress</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/health-insights" className="btn btn-ghost">
              <span>Read Health Insights</span>
            </Link>
            <Link to="/prediction" className="btn btn-primary">
              <RotateCcw size={16} />
              <span>Check Your Risk Factors</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
