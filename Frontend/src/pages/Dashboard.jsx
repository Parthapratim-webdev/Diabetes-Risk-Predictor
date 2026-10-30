import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Activity,
  PlusCircle,
  History as HistoryIcon,
  User,
  Lightbulb,
  Calendar,
  TrendingUp,
  Info,
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { predictionService } from '../services/predictionService';
import { StatCard } from '../components/StatCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

export const Dashboard = () => {
  const navigate = useNavigate();

  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await predictionService.getPredictionHistory();
        setAssessments(response.data || []);
      } catch (err) {
        console.error('Error fetching dashboard records:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const totalAssessments = assessments.length;
  const latestAssessment = assessments[0];
  const latestDateFormatted = latestAssessment
    ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(
        new Date(latestAssessment.createdAt)
      )
    : 'No Assessments Yet';

  // Average glucose
  const avgGlucose = totalAssessments > 0
    ? Math.round(
        assessments.reduce((acc, curr) => acc + (curr.measurements?.glucose || 0), 0) / totalAssessments
      )
    : '--';

  // Chart 1: Fasting Glucose & Systolic BP Timeline
  const timelineLabels = assessments
    .slice(0, 6)
    .reverse()
    .map((item) =>
      new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(item.createdAt))
    );

  const glucoseData = assessments
    .slice(0, 6)
    .reverse()
    .map((item) => item.measurements?.glucose || 0);

  const systolicData = assessments
    .slice(0, 6)
    .reverse()
    .map((item) => item.measurements?.systolicBP || 0);

  const lineChartData = {
    labels: timelineLabels.length > 0 ? timelineLabels : ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Fasting Glucose (mg/dL)',
        data: glucoseData.length > 0 ? glucoseData : [90, 95, 92, 98],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#2563EB',
      },
      {
        label: 'Systolic Blood Pressure (mmHg)',
        data: systolicData.length > 0 ? systolicData : [115, 120, 118, 122],
        borderColor: '#0D9488',
        backgroundColor: 'rgba(13, 148, 136, 0.1)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#0D9488',
      },
    ],
  };

  const lineChartOptions = {
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

  // Chart 2: Risk Indicators Category Breakdown
  const lowCount = assessments.filter((a) => a.predictionResult?.riskLevel === 'Low').length;
  const modCount = assessments.filter((a) => a.predictionResult?.riskLevel === 'Moderate').length;
  const elevatedCount = assessments.filter((a) => a.predictionResult?.riskLevel === 'Elevated').length;

  const barChartData = {
    labels: ['Low Indicators', 'Moderate Indicators', 'Elevated Indicators'],
    datasets: [
      {
        label: 'Assessments',
        data: totalAssessments > 0 ? [lowCount, modCount, elevatedCount] : [1, 2, 1],
        backgroundColor: ['#16A34A', '#F59E0B', '#DC2626'],
        borderRadius: 8,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1E293B',
        padding: 10,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, font: { family: 'Inter', size: 11 } },
        grid: { color: '#F1F5F9' },
      },
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter', size: 11 } },
      },
    },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Demonstration Banner Notice */}
      <div className="alert-banner info" style={{ margin: 0 }}>
        <Info size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong style={{ display: 'block', marginBottom: '0.2rem' }}>
            Demonstration Environment & API Integration State
          </strong>
          <span>
            Dashboard statistics and visual trends are currently rendered from demonstration test data. 
            The architecture is pre-configured to communicate with Express.js endpoints (<code>GET /api/predictions</code>).
          </span>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        <StatCard
          title="Total Assessments"
          value={loading ? '...' : totalAssessments}
          subtext="Biometric evaluations logged"
          icon={Activity}
          iconColor="#2563EB"
          iconBg="#EFF6FF"
          badge="Active"
          badgeType="primary"
        />

        <StatCard
          title="Most Recent Assessment"
          value={loading ? '...' : latestDateFormatted}
          subtext={latestAssessment ? `ID: ${latestAssessment.id}` : 'No submissions yet'}
          icon={Calendar}
          iconColor="#0D9488"
          iconBg="#F0FDFA"
        />

        <StatCard
          title="Avg. Fasting Glucose"
          value={loading ? '...' : `${avgGlucose} mg/dL`}
          subtext="Standard target: < 100 mg/dL"
          icon={TrendingUp}
          iconColor="#16A34A"
          iconBg="#DCFCE7"
          badge="Reference"
          badgeType="success"
        />

        <StatCard
          title="Profile Completion"
          value="90%"
          subtext="Biometrics & baseline saved"
          icon={User}
          iconColor="#F59E0B"
          iconBg="#FEF3C7"
          badge="Complete"
          badgeType="warning"
        />
      </div>

      {/* Quick Actions Toolbar */}
      <div
        className="card"
        style={{
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Quick Actions</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: '0.15rem 0 0' }}>
            Direct access to core features and assessment tools.
          </p>
        </div>

        <div className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
          <Link to="/prediction" className="btn btn-primary btn-sm">
            <PlusCircle size={16} />
            <span>Check Your Risk Factors</span>
          </Link>
          <Link to="/history" className="btn btn-outline btn-sm">
            <HistoryIcon size={16} />
            <span>Your Previous Results</span>
          </Link>
          <Link to="/profile" className="btn btn-outline btn-sm">
            <User size={16} />
            <span>Update Profile</span>
          </Link>
          <Link to="/health-insights" className="btn btn-ghost btn-sm">
            <Lightbulb size={16} />
            <span>Health Insights</span>
          </Link>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {/* Chart 1: Vitals Timeline */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header">
            <div>
              <h3 className="card-title">Vitals & Biometric Trend</h3>
              <p className="card-subtitle">Fasting blood glucose & systolic blood pressure tracking</p>
            </div>
            <span className="badge badge-primary">Timeline</span>
          </div>
          <div style={{ height: '280px', width: '100%', position: 'relative' }}>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Chart 2: Indicators Distribution */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header">
            <div>
              <h3 className="card-title">Risk Factor Assessment Distribution</h3>
              <p className="card-subtitle">Frequency of low, moderate, and elevated indicator evaluations</p>
            </div>
            <span className="badge badge-secondary">Categorized</span>
          </div>
          <div style={{ height: '280px', width: '100%', position: 'relative' }}>
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Recent Assessment Activity</h3>
            <p className="card-subtitle">Latest biometric evaluations recorded on your account</p>
          </div>
          <Link to="/history" className="btn btn-outline btn-sm">
            View All ({totalAssessments})
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner size="md" message="Loading recent records..." />
        ) : assessments.length === 0 ? (
          <EmptyState
            title="No Assessments Yet"
            description="Take your first educational assessment to view your progress and personalized risk factors."
            actionText="Check Your Risk Factors"
            onAction={() => navigate('/prediction')}
          />
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.85rem 1rem' }}>Assessment ID</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Date</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Glucose</th>
                  <th style={{ padding: '0.85rem 1rem' }}>BMI</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Classification</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {assessments.slice(0, 5).map((item) => {
                  const riskLevel = item.predictionResult?.riskLevel || 'Low';
                  const badgeClass =
                    riskLevel === 'Low'
                      ? 'badge-success'
                      : riskLevel === 'Moderate'
                      ? 'badge-warning'
                      : 'badge-danger';

                  const dateStr = new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  }).format(new Date(item.createdAt));

                  return (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: '1px solid var(--color-border-light)',
                        transition: 'background-color var(--transition-fast)',
                      }}
                    >
                      <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                        {item.id}
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>
                        {dateStr}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>{item.measurements?.glucose || '--'}</strong> mg/dL
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong>{item.measurements?.bmi || '--'}</strong> kg/m²
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span className={`badge ${badgeClass}`}>
                          {item.predictionResult?.classification || 'Assessment Complete'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => navigate(`/result/${item.id}`, { state: { assessment: item } })}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
