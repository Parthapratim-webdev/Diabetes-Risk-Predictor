import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldAlert, ExternalLink, Award } from 'lucide-react';

export const Footer = () => {
  const currentYear = 2026;

  return (
    <footer className="footer no-print">
      <div className="container">
        {/* Important Medical Disclaimer Banner */}
        <div className="footer-disclaimer-banner">
          <ShieldAlert size={24} style={{ flexShrink: 0, marginTop: '2px', color: '#60A5FA' }} />
          <div>
            <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '0.25rem' }}>
              Educational Health Disclaimer
            </strong>
            <p style={{ margin: 0, color: '#BFDBFE', fontSize: '0.85rem' }}>
              This web application is developed as an academic full-stack project for educational and risk awareness purposes only. 
              It does not provide clinical diagnoses, medical advice, or treatment plans. Health indicators and assessment outputs should always 
              be reviewed with a certified healthcare professional.
            </p>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="footer-grid">
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div className="brand-icon" style={{ width: '32px', height: '32px' }}>
                <Heart size={16} fill="#FFFFFF" />
              </div>
              <span style={{ fontWeight: 700, fontSize: '1.15rem', color: '#FFFFFF' }}>
                Diabetes Risk Predictor
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#94A3B8', margin: 0 }}>
              An interactive, modern educational platform designed to empower individuals with evidence-based insights 
              on diabetes risk indicators and preventative lifestyle habits.
            </p>
          </div>

          <div className="footer-col">
            <h4>Platform</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/prediction">Check Risk Factors</Link></li>
              <li><Link to="/learn-about-diabetes">Learn About Diabetes</Link></li>
              <li><Link to="/history">My Previous Results</Link></li>
              <li><Link to="/profile">My Profile</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Educational Sources</h4>
            <ul className="footer-links">
              <li>
                <a href="https://www.who.int/health-topics/diabetes" target="_blank" rel="noopener noreferrer">
                  WHO Diabetes Guidelines <ExternalLink size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </a>
              </li>
              <li>
                <a href="https://diabetes.org/" target="_blank" rel="noopener noreferrer">
                  American Diabetes Assoc. <ExternalLink size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </a>
              </li>
              <li>
                <a href="https://www.cdc.gov/diabetes/" target="_blank" rel="noopener noreferrer">
                  CDC Diabetes Resources <ExternalLink size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </a>
              </li>
              <li>
                <a href="https://idf.org/" target="_blank" rel="noopener noreferrer">
                  IDF Diabetes Atlas <ExternalLink size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Information</h4>
            <ul className="footer-links">
              <li><Link to="/about">System Architecture</Link></li>
              <li><Link to="/learn-about-diabetes">Clinical Guidelines</Link></li>
              <li><Link to="/profile">Data & Privacy Settings</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p>© {currentYear} Diabetes Risk Predictor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
