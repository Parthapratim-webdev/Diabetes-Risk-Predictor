import React from 'react';
import { Link } from 'react-router-dom';
import { HeartCrack, Home, LayoutDashboard, Lightbulb } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const NotFound = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem' }}>
        <div
          className="card"
          style={{
            maxWidth: '560px',
            width: '100%',
            textAlign: 'center',
            padding: '3.5rem 2rem',
            boxShadow: 'var(--shadow-xl)',
            borderRadius: 'var(--radius-xl)',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-error-light)',
              color: 'var(--color-error)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
            }}
          >
            <HeartCrack size={42} />
          </div>

          <span className="badge badge-danger" style={{ marginBottom: '1rem' }}>
            HTTP Error 404
          </span>

          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.75rem', color: 'var(--color-text)' }}>
            Page Not Found
          </h1>

          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            The healthcare resource, assessment record, or page you are attempting to reach does not exist or may have been relocated.
          </p>

          <div className="flex justify-center items-center gap-3" style={{ flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary">
              <Home size={16} />
              <span>Return Home</span>
            </Link>

            <Link to="/dashboard" className="btn btn-outline">
              <LayoutDashboard size={16} />
              <span>Go to Dashboard</span>
            </Link>

            <Link to="/health-insights" className="btn btn-ghost">
              <Lightbulb size={16} />
              <span>Health Insights</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
