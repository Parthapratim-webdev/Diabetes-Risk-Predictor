import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowUpDown,
  Eye,
  Trash2,
  Printer,
  Calendar,
  PlusCircle,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { predictionService } from '../services/predictionService';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Modal } from '../components/Modal';
import toast from 'react-hot-toast';

export const History = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const navigate = useNavigate();

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      const response = await predictionService.getPredictionHistory({
        search: searchQuery,
        sort: sortOrder,
      });
      setAssessments(response.data || []);
    } catch {
      toast.error('Could not load your previous results.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, sortOrder]);

  useEffect(() => {
    let isMounted = true;
    predictionService
      .getPredictionHistory({
        search: searchQuery,
        sort: sortOrder,
      })
      .then((response) => {
        if (isMounted) {
          setAssessments(response.data || []);
        }
      })
      .catch(() => {
        if (isMounted) {
          toast.error('Could not load your previous results.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [searchQuery, sortOrder]);

  const handleDeleteClick = (assessment) => {
    setItemToDelete(assessment);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await predictionService.deleteAssessment(itemToDelete.id);
      toast.success(`Assessment ${itemToDelete.id} removed.`);
      setDeleteModalOpen(false);
      setItemToDelete(null);
      fetchRecords();
    } catch {
      toast.error('Could not delete assessment record.');
    }
  };

  const handlePrintRecord = (item) => {
    navigate(`/result/${item.id}`, { state: { assessment: item } });
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', margin: 0, color: 'var(--color-text)' }}>My Previous Results</h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginTop: '0.35rem' }}>
            Find your previous assessments, view their dates, print reports, or review details.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => navigate('/prediction')}
          style={{ minHeight: '44px' }}
        >
          <PlusCircle size={18} aria-hidden="true" />
          <span>New Assessment</span>
        </button>
      </div>

      {/* Educational Notice Banner */}
      <div className="alert-banner info" style={{ margin: 0 }} role="region" aria-label="Educational Notice">
        <HelpCircle size={20} style={{ flexShrink: 0, marginTop: '2px', color: '#1D4ED8' }} aria-hidden="true" />
        <span style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
          Your assessment history is saved confidentially during your session. No sample records are shown as genuine medical information.
        </span>
      </div>

      {/* Search and Sort Toolbar (Shown only if history exists or user is searching) */}
      {(assessments.length > 0 || searchQuery) && (
        <div
          className="card"
          style={{
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {/* Search Box */}
          <div className="input-wrapper" style={{ maxWidth: '380px' }}>
            <div className="input-icon-left">
              <Search size={18} aria-hidden="true" />
            </div>
            <input
              type="text"
              className="form-input form-input-with-icon-left"
              style={{ minHeight: '44px', fontSize: '0.95rem' }}
              placeholder="Search by assessment ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search previous assessments by ID"
            />
          </div>

          {/* Sort Order */}
          <div className="input-wrapper" style={{ maxWidth: '240px' }}>
            <div className="input-icon-left">
              <ArrowUpDown size={18} aria-hidden="true" />
            </div>
            <select
              className="form-select form-input-with-icon-left"
              style={{ minHeight: '44px', fontSize: '0.95rem' }}
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              aria-label="Sort assessments order"
            >
              <option value="newest">Newest Assessments First</option>
              <option value="oldest">Oldest Assessments First</option>
            </select>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {loading ? (
        <div style={{ padding: '3rem 0' }}>
          <LoadingSpinner size="lg" message="Loading your assessments..." />
        </div>
      ) : assessments.length === 0 ? (
        /* Empty State required when no history exists */
        <div className="card" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
            }}
          >
            <Clock size={28} aria-hidden="true" />
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem' }}>
            {searchQuery ? 'No assessments found matching your search.' : "You haven't completed an assessment yet."}
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', maxWidth: '440px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
            {searchQuery
              ? 'Try clearing your search query to see all your saved assessments.'
              : 'Complete your first step-by-step assessment to save your results here.'}
          </p>

          {searchQuery ? (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              style={{ minHeight: '48px', padding: '0.75rem 1.5rem', fontSize: '1rem' }}
              onClick={() => navigate('/prediction')}
            >
              Start Your First Assessment
            </button>
          )}
        </div>
      ) : (
        /* Simple responsive list / cards (clean on mobile and desktop) */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {assessments.map((item) => {
            const dateFormatted = new Intl.DateTimeFormat('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            }).format(new Date(item.createdAt));

            const m = item.measurements || {};
            const isEvaluated = Boolean(item.predictionResult);

            return (
              <div
                key={item.id}
                className="card card-hover"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  borderLeft: '4px solid var(--color-primary)',
                }}
              >
                {/* Header row: ID, Date, Status */}
                <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                      ASSESSMENT ID
                    </span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                      {item.id}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5" style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                    <Calendar size={14} aria-hidden="true" />
                    <span>{dateFormatted}</span>
                  </div>

                  <div>
                    {isEvaluated ? (
                      <span className="badge badge-success">Evaluated</span>
                    ) : (
                      <span className="badge badge-neutral">Answers Recorded</span>
                    )}
                  </div>
                </div>

                {/* Information preview */}
                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '0.75rem',
                    fontSize: '0.875rem',
                  }}
                >
                  <div>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', display: 'block' }}>Age</span>
                    <strong>{m.age ? `${m.age} yrs` : '--'}</strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', display: 'block' }}>Height & Weight</span>
                    <strong>{m.heightCm ? `${m.heightCm} cm` : '--'} / {m.weightKg ? `${m.weightKg} kg` : '--'}</strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', display: 'block' }}>BMI</span>
                    <strong>{m.bmi ? `${m.bmi} kg/m²` : '--'}</strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', display: 'block' }}>Fasting Glucose</span>
                    <strong>{m.glucose ? `${m.glucose} ${m.glucoseUnit || 'mg/dL'}` : 'Not provided'}</strong>
                  </div>

                  <div>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', display: 'block' }}>Blood Pressure</span>
                    <strong>{m.systolicBP ? `${m.systolicBP}/${m.diastolicBP || '--'} mmHg` : 'Not provided'}</strong>
                  </div>
                </div>

                {/* Actions: Open Details, Print, Delete */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    borderTop: '1px solid var(--color-border-light)',
                    paddingTop: '0.75rem',
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => handleDeleteClick(item)}
                    style={{ color: 'var(--color-error)' }}
                    aria-label={`Delete assessment record ${item.id}`}
                  >
                    <Trash2 size={15} aria-hidden="true" />
                    <span>Delete Record</span>
                  </button>

                  <div className="flex items-center gap-2" style={{ flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => handlePrintRecord(item)}
                      aria-label={`Print assessment report for ${item.id}`}
                    >
                      <Printer size={15} aria-hidden="true" />
                      <span>Print Report</span>
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`/result/${item.id}`, { state: { assessment: item } })}
                      aria-label={`Open details for assessment ${item.id}`}
                    >
                      <Eye size={15} aria-hidden="true" />
                      <span>Open Details</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Assessment Record?"
        footer={
          <>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleConfirmDelete}
            >
              Confirm Delete
            </button>
          </>
        }
      >
        <p style={{ color: 'var(--color-text)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
          Are you sure you want to delete assessment <strong>{itemToDelete?.id}</strong>? This will remove the saved answers from your history.
        </p>
      </Modal>
    </div>
  );
};

export default History;
