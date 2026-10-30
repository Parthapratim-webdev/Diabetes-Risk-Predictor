import React from 'react';

export const LoadingSpinner = ({ size = 'md', color = 'primary', message = '' }) => {
  const sizeClass = size === 'sm' ? 'spinner-sm' : size === 'lg' ? 'spinner-lg' : '';
  const colorClass = color === 'white' ? 'spinner-white' : '';

  return (
    <div className="flex flex-col items-center justify-center gap-3" style={{ padding: '2rem 1rem' }}>
      <div className={`spinner ${sizeClass} ${colorClass}`} aria-label="Loading" />
      {message && <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{message}</p>}
    </div>
  );
};

export const SkeletonCard = () => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '160px' }}>
      <div className="skeleton" style={{ width: '40%', height: '20px' }} />
      <div className="skeleton" style={{ width: '70%', height: '32px' }} />
      <div className="skeleton" style={{ width: '50%', height: '16px' }} />
    </div>
  );
};

export const SkeletonTable = ({ rows = 4 }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="skeleton"
          style={{ width: '100%', height: '52px', borderRadius: 'var(--radius-md)' }}
        />
      ))}
    </div>
  );
};

export default LoadingSpinner;
