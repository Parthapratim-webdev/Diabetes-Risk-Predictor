import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  Trash2,
  Table as TableIcon,
  Grid,
  Info,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Calendar,
} from 'lucide-react';
import { predictionService } from '../services/predictionService';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';
import { Modal } from '../components/Modal';
import toast from 'react-hot-toast';

export const History = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('ALL');
  const [sortOrder, setSortOrder] = useState('newest');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await predictionService.getPredictionHistory({
        search: searchQuery,
        riskLevel: selectedRiskFilter,
        sort: sortOrder,
      });
      setAssessments(response.data || []);
      setCurrentPage(1);
    } catch {
      toast.error('Failed to load your previous results.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [searchQuery, selectedRiskFilter, sortOrder]);

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

  // Pagination calculations
  const totalPages = Math.ceil(assessments.length / itemsPerPage) || 1;
  const paginatedItems = assessments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header & Description */}
      <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Your Previous Results</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
            Review, search, and inspect past biometric evaluations and risk indicator profiles.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => navigate('/prediction')}
        >
          <PlusCircle size={16} />
          <span>Check Your Risk Factors</span>
        </button>
      </div>

      {/* Demonstration environment alert */}
      <div className="alert-banner info" style={{ margin: 0 }}>
        <Info size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
        <span style={{ fontSize: '0.85rem' }}>
          Historical records are maintained for this active session. When the Node.js / Express backend is connected, 
          these records sync securely with MongoDB collections via <code>GET /api/predictions</code>.
        </span>
      </div>

      {/* Search, Filter & Controls Toolbar */}
      <div
        className="card"
        style={{
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          {/* Search Box */}
          <div className="input-wrapper">
            <div className="input-icon-left">
              <Search size={18} />
            </div>
            <input
              type="text"
              className="form-input form-input-with-icon-left"
              placeholder="Search by ID or Classification..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter by Risk Level */}
          <div className="input-wrapper">
            <div className="input-icon-left">
              <Filter size={18} />
            </div>
            <select
              className="form-select form-input-with-icon-left"
              value={selectedRiskFilter}
              onChange={(e) => setSelectedRiskFilter(e.target.value)}
            >
              <option value="ALL">All Risk Indicator Levels</option>
              <option value="Low">Low Risk Indicators</option>
              <option value="Moderate">Moderate Indicators</option>
              <option value="Elevated">Elevated Indicators</option>
            </select>
          </div>

          {/* Sort Order */}
          <div className="input-wrapper">
            <div className="input-icon-left">
              <ArrowUpDown size={18} />
            </div>
            <select
              className="form-select form-input-with-icon-left"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
            </select>
          </div>

          {/* View Toggle (Table / Card) */}
          <div className="flex items-center justify-end gap-2">
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginRight: '0.25rem' }}>
              View:
            </span>
            <button
              type="button"
              className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setViewMode('table')}
              aria-label="Table view"
              title="Table view"
            >
              <TableIcon size={16} />
            </button>
            <button
              type="button"
              className={`btn btn-sm ${viewMode === 'card' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setViewMode('card')}
              aria-label="Card grid view"
              title="Card view"
            >
              <Grid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Table or Cards */}
      {loading ? (
        <LoadingSpinner size="lg" message="Loading records..." />
      ) : assessments.length === 0 ? (
        <div className="card">
          <EmptyState
            title="No Assessments Matching Filter"
            description="No assessments matched your query. Try resetting your search or filter options, or create a new assessment."
            actionText="Clear Filters"
            onAction={() => {
              setSearchQuery('');
              setSelectedRiskFilter('ALL');
            }}
            secondaryActionText="New Assessment"
            onSecondaryAction={() => navigate('/prediction')}
          />
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.9rem 1.25rem' }}>Assessment ID</th>
                  <th style={{ padding: '0.9rem 1.25rem' }}>Date Evaluated</th>
                  <th style={{ padding: '0.9rem 1.25rem' }}>Glucose</th>
                  <th style={{ padding: '0.9rem 1.25rem' }}>Blood Pressure</th>
                  <th style={{ padding: '0.9rem 1.25rem' }}>BMI</th>
                  <th style={{ padding: '0.9rem 1.25rem' }}>Classification</th>
                  <th style={{ padding: '0.9rem 1.25rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((item) => {
                  const riskLevel = item.predictionResult?.riskLevel || 'Low';
                  const badgeClass =
                    riskLevel === 'Low'
                      ? 'badge-success'
                      : riskLevel === 'Moderate'
                      ? 'badge-warning'
                      : 'badge-danger';

                  const dateFormatted = new Intl.DateTimeFormat('en-US', {
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
                      <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                        {item.id}
                      </td>
                      <td style={{ padding: '1rem 1.25rem', color: 'var(--color-text-secondary)' }}>
                        {dateFormatted}
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <strong>{item.measurements?.glucose || '--'}</strong> mg/dL
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        {item.measurements?.systolicBP}/{item.measurements?.diastolicBP} mmHg
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <strong>{item.measurements?.bmi || '--'}</strong> kg/m²
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <span className={`badge ${badgeClass}`}>
                          {item.predictionResult?.classification || 'Completed'}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => navigate(`/result/${item.id}`, { state: { assessment: item } })}
                            title="View Full Assessment"
                          >
                            <Eye size={14} />
                            <span>Details</span>
                          </button>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            onClick={() => handleDeleteClick(item)}
                            style={{ color: 'var(--color-error)' }}
                            title="Delete Record"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* CARD GRID VIEW */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.25rem' }}>
          {paginatedItems.map((item) => {
            const riskLevel = item.predictionResult?.riskLevel || 'Low';
            const badgeClass =
              riskLevel === 'Low'
                ? 'badge-success'
                : riskLevel === 'Moderate'
                ? 'badge-warning'
                : 'badge-danger';

            return (
              <div key={item.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '0.95rem' }}>
                    {item.id}
                  </span>
                  <span className={`badge ${badgeClass}`}>
                    {riskLevel}
                  </span>
                </div>

                <div className="flex items-center gap-1" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                  <Calendar size={13} />
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>

                <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <div>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', display: 'block' }}>Glucose</span>
                    <strong>{item.measurements?.glucose} mg/dL</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', display: 'block' }}>BMI</span>
                    <strong>{item.measurements?.bmi} kg/m²</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', display: 'block' }}>Blood Pressure</span>
                    <strong>{item.measurements?.systolicBP}/{item.measurements?.diastolicBP}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', display: 'block' }}>Family History</span>
                    <strong>{item.measurements?.familyHistory ? 'Yes' : 'No'}</strong>
                  </div>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifySelf: 'flex-end', justifyContent: 'space-between', borderTop: '1px solid var(--color-border-light)', paddingTop: '0.75rem' }}>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => handleDeleteClick(item)}
                    style={{ color: 'var(--color-error)' }}
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/result/${item.id}`, { state: { assessment: item } })}
                  >
                    <Eye size={14} />
                    <span>View Result</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between" style={{ marginTop: '1rem', padding: '0.5rem 0' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
            Showing page {currentPage} of {totalPages} ({assessments.length} total records)
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn btn-outline btn-sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Assessment Record?"
        footer={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>
              Confirm Delete
            </button>
          </>
        }
      >
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          Are you sure you want to delete assessment <strong>{itemToDelete?.id}</strong>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default History;
