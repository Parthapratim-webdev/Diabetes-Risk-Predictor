import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  History,
  BookOpen,
  User,
  Calendar,
  ArrowRight,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { predictionService } from '../services/predictionService';
import { useAuth } from '../hooks/useAuth';
import { LoadingSpinner } from '../components/LoadingSpinner';

// Register Chart.js components only for optional progress section
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProgressSection, setShowProgressSection] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchDashboardData = async () => {
      try {
        const response = await predictionService.getPredictionHistory();
        if (isMounted) {
          setAssessments(response.data || []);
        }
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error('Error fetching dashboard records:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchDashboardData();
    return () => {
      isMounted = false;
    };
  }, []);

  const latestAssessment = assessments[0];
  const hasHistory = assessments.length > 0;

  // Real assessment trends for optional "View Your Progress" section
  const timelineAssessments = [...assessments].reverse();
  const timelineLabels = timelineAssessments.map((item) =>
    new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(item.createdAt))
  );

  const glucosePoints = timelineAssessments
    .map((item) => item.measurements?.glucose)
    .filter((g) => g !== null && g !== undefined && g > 0);

  const hasGlucoseData = glucosePoints.length >= 2;

  const progressChartData = {
    labels: timelineLabels,
    datasets: [
      {
        label: 'Fasting Blood Glucose (mg/dL)',
        data: timelineAssessments.map((item) => item.measurements?.glucose || null),
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.08)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#2563EB',
        spanGaps: true,
      },
    ],
  };

  const progressChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { boxWidth: 12, usePointStyle: true, font: { family: 'Inter', size: 12 } },
      },
      tooltip: {
        backgroundColor: '#1E293B',
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        grid: { color: '#F1F5F9' },
        ticks: { font: { family: 'Inter', size: 11 } },
      },
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 11 } },
      },
    },
  };

  const firstName = user?.name ? user.name.split(' ')[0] : '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* 1. Friendly Heading and Subtitle */}
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: 'var(--color-text)' }}>
          Welcome Back{firstName ? `, ${firstName}` : ''}
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', marginTop: '0.4rem', lineHeight: 1.5 }}>
          Here you can manage your assessments and explore helpful health information.
        </p>
      </div>

      {/* 2. Four Simple Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
        }}
        role="region"
        aria-label="Dashboard Quick Access"
      >
        {/* Card 1: Check Risk Factors */}
        <Link
          to="/prediction"
          className="card card-hover"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1.75rem 1.5rem',
            textDecoration: 'none',
            color: 'inherit',
            borderTop: '4px solid var(--color-primary)',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            <PlusCircle size={22} aria-hidden="true" />
          </div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--color-text)' }}>
            Check Risk Factors
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0, flex: 1 }}>
            Take a step-by-step assessment to explore factors related to diabetes.
          </p>
          <div className="flex items-center gap-1" style={{ marginTop: '1.25rem', color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: 600 }}>
            <span>Start assessment</span>
            <ArrowRight size={14} aria-hidden="true" />
          </div>
        </Link>

        {/* Card 2: My Previous Results */}
        <Link
          to="/history"
          className="card card-hover"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1.75rem 1.5rem',
            textDecoration: 'none',
            color: 'inherit',
            borderTop: '4px solid var(--color-secondary)',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-secondary-light)',
              color: 'var(--color-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            <History size={22} aria-hidden="true" />
          </div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--color-text)' }}>
            My Previous Results
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0, flex: 1 }}>
            Find, open, and print reports from your past health assessments.
          </p>
          <div className="flex items-center gap-1" style={{ marginTop: '1.25rem', color: 'var(--color-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
            <span>View results</span>
            <ArrowRight size={14} aria-hidden="true" />
          </div>
        </Link>

        {/* Card 3: Learn About Diabetes */}
        <Link
          to="/learn-about-diabetes"
          className="card card-hover"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1.75rem 1.5rem',
            textDecoration: 'none',
            color: 'inherit',
            borderTop: '4px solid #16A34A',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-success-light)',
              color: 'var(--color-success-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            <BookOpen size={22} aria-hidden="true" />
          </div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--color-text)' }}>
            Learn About Diabetes
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0, flex: 1 }}>
            Read simple explanations about diabetes, risk factors, and healthy habits.
          </p>
          <div className="flex items-center gap-1" style={{ marginTop: '1.25rem', color: '#16A34A', fontSize: '0.875rem', fontWeight: 600 }}>
            <span>Read guides</span>
            <ArrowRight size={14} aria-hidden="true" />
          </div>
        </Link>

        {/* Card 4: My Profile */}
        <Link
          to="/profile"
          className="card card-hover"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1.75rem 1.5rem',
            textDecoration: 'none',
            color: 'inherit',
            borderTop: '4px solid #F59E0B',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-warning-light)',
              color: 'var(--color-warning-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            <User size={22} aria-hidden="true" />
          </div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: 'var(--color-text)' }}>
            My Profile
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0, flex: 1 }}>
            Manage your personal account information and privacy preferences.
          </p>
          <div className="flex items-center gap-1" style={{ marginTop: '1.25rem', color: '#D97706', fontSize: '0.875rem', fontWeight: 600 }}>
            <span>Account settings</span>
            <ArrowRight size={14} aria-hidden="true" />
          </div>
        </Link>
      </div>

      {/* 3. Latest Assessment Section (Display only when real data is available, otherwise show simple empty state) */}
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border-light)' }}>
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Latest Assessment</h2>
        </div>

        {loading ? (
          <div style={{ padding: '2rem 0' }}>
            <LoadingSpinner size="md" message="Loading your assessment..." />
          </div>
        ) : !hasHistory ? (
          /* Simple empty state required */
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
              You haven't completed an assessment yet.
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', maxWidth: '440px', margin: '0 auto 1.5rem' }}>
              Take your first step-by-step health check to explore your markers and review your results.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              style={{ minHeight: '48px', padding: '0.75rem 1.5rem', fontSize: '1rem' }}
              onClick={() => navigate('/prediction')}
            >
              Start Your First Assessment
            </button>
          </div>
        ) : (
          /* Real latest assessment card */
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.25rem',
              }}
            >
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>ASSESSMENT ID</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {latestAssessment.id}
                </div>
                <div className="flex items-center gap-1.5" style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
                  <Calendar size={14} aria-hidden="true" />
                  <span>
                    {new Intl.DateTimeFormat('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    }).format(new Date(latestAssessment.createdAt))}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() =>
                  navigate(`/result/${latestAssessment.id}`, { state: { assessment: latestAssessment } })
                }
              >
                <span>View Full Results</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>

            {/* Submitted biometric values overview */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '0.85rem',
                backgroundColor: '#F8FAFC',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>BMI</span>
                <strong style={{ fontSize: '1rem' }}>
                  {latestAssessment.measurements?.bmi ? `${latestAssessment.measurements.bmi} kg/m²` : '--'}
                </strong>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>Fasting Glucose</span>
                <strong style={{ fontSize: '1rem' }}>
                  {latestAssessment.measurements?.glucose
                    ? `${latestAssessment.measurements.glucose} ${latestAssessment.measurements.glucoseUnit || 'mg/dL'}`
                    : 'Not provided'}
                </strong>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>Blood Pressure</span>
                <strong style={{ fontSize: '1rem' }}>
                  {latestAssessment.measurements?.systolicBP
                    ? `${latestAssessment.measurements.systolicBP}/${latestAssessment.measurements?.diastolicBP || '--'} mmHg`
                    : 'Not provided'}
                </strong>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>Family History</span>
                <strong style={{ fontSize: '1rem' }}>
                  {latestAssessment.measurements?.familyHistory === 'yes'
                    ? 'Reported'
                    : latestAssessment.measurements?.familyHistory === 'no'
                    ? 'None reported'
                    : 'Not known'}
                </strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Separate Optional Section: "View Your Progress" (Only for real data when user chooses to view it) */}
      <div className="card" style={{ padding: '1.75rem 2rem' }}>
        <button
          type="button"
          onClick={() => setShowProgressSection(!showProgressSection)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            textAlign: 'left',
          }}
          aria-expanded={showProgressSection}
        >
          <div className="flex items-center gap-2">
            <TrendingUp size={20} color="var(--color-primary)" aria-hidden="true" />
            <div>
              <h2 style={{ fontSize: '1.15rem', margin: 0, color: 'var(--color-text)' }}>
                View Your Progress
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                Optional section for tracking your health measurements over time
              </span>
            </div>
          </div>
          <div style={{ color: 'var(--color-text-secondary)' }}>
            {showProgressSection ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </button>

        {showProgressSection && (
          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border-light)' }}>
            {!hasHistory ? (
              <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                You haven't completed any assessments yet. Progress charts will appear here after you save your measurements.
              </p>
            ) : !hasGlucoseData ? (
              <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                Complete two or more assessments with blood glucose measurements to see your trend line.
              </p>
            ) : (
              <div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                  Fasting blood glucose measurements recorded across your previous assessments:
                </p>
                <div style={{ height: '240px', width: '100%', position: 'relative' }}>
                  <Line data={progressChartData} options={progressChartOptions} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
