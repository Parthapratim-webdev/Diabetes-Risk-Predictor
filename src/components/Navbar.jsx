import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, ArrowRight, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    closeMobileMenu();
    navigate('/');
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={closeMobileMenu}>
          <div className="brand-icon">
            <Heart size={20} fill="#FFFFFF" />
          </div>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>DiabetesRisk</span>
            <span style={{ color: 'var(--color-primary)' }}>Predictor</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>
          </li>
          <li>
            <a href="/#how-it-works" className="nav-link" onClick={closeMobileMenu}>
              How It Works
            </a>
          </li>
          <li>
            <a href="/#features" className="nav-link" onClick={closeMobileMenu}>
              Features
            </a>
          </li>
          <li>
            <NavLink to="/health-insights" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              Health Insights
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              About
            </NavLink>
          </li>
        </ul>

        {/* Desktop Actions */}
        <div className="nav-actions nav-actions-desktop">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="btn btn-primary btn-sm">
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="btn btn-ghost btn-sm">
                Login
              </Link>
              <Link to="/prediction" className="btn btn-primary btn-sm">
                Get Started
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <li>
              <NavLink to="/" end className="nav-link" onClick={closeMobileMenu} style={{ fontSize: '1.1rem' }}>
                Home
              </NavLink>
            </li>
            <li>
              <a href="/#how-it-works" className="nav-link" onClick={closeMobileMenu} style={{ fontSize: '1.1rem' }}>
                How It Works
              </a>
            </li>
            <li>
              <a href="/#features" className="nav-link" onClick={closeMobileMenu} style={{ fontSize: '1.1rem' }}>
                Features
              </a>
            </li>
            <li>
              <NavLink to="/health-insights" className="nav-link" onClick={closeMobileMenu} style={{ fontSize: '1.1rem' }}>
                Health Insights
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-link" onClick={closeMobileMenu} style={{ fontSize: '1.1rem' }}>
                About Project
              </NavLink>
            </li>
          </ul>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-primary" onClick={closeMobileMenu}>
                  <LayoutDashboard size={18} />
                  Go to Dashboard
                </Link>
                <button type="button" className="btn btn-outline" onClick={handleLogout}>
                  Logout ({user?.name || 'User'})
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline" onClick={closeMobileMenu}>
                  Login to Account
                </Link>
                <Link to="/prediction" className="btn btn-primary" onClick={closeMobileMenu}>
                  Start Assessment
                  <ArrowRight size={18} />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
