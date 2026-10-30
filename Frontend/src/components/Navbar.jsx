import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Heart,
  Menu,
  X,
  ChevronDown,
  User,
  History,
  LayoutDashboard,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const accountMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleAccountMenu = () => {
    setAccountMenuOpen((prev) => !prev);
  };

  const closeAccountMenu = () => {
    setAccountMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    closeMobileMenu();
    closeAccountMenu();
    navigate('/');
  };

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setAccountMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        setAccountMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Main 5 navigation options
  const mainNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Check Risk Factors', path: '/prediction' },
    { name: 'Learn About Diabetes', path: '/health-insights' },
    { name: 'My Results', path: '/history' },
    { name: 'My Profile', path: '/profile' },
  ];

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
          {mainNavItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="nav-actions nav-actions-desktop">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {/* Account Dropdown */}
              <div style={{ position: 'relative' }} ref={accountMenuRef}>
                <button
                  type="button"
                  className="user-profile-btn"
                  onClick={toggleAccountMenu}
                  aria-expanded={accountMenuOpen}
                  aria-label="Account menu"
                  style={{ gap: '0.5rem', padding: '0.35rem 0.75rem' }}
                >
                  <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>
                    {user?.name ? user.name.substring(0, 2).toUpperCase() : 'ME'}
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text)' }}>
                    {user?.name || 'My Account'}
                  </span>
                  <ChevronDown size={16} color="var(--color-text-secondary)" />
                </button>

                {accountMenuOpen && (
                  <div
                    className="card"
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 8px)',
                      width: '230px',
                      padding: '0.6rem',
                      zIndex: 200,
                      boxShadow: 'var(--shadow-xl)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                    }}
                  >
                    <div style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid var(--color-border-light)', marginBottom: '0.25rem' }}>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text)' }}>
                        {user?.name || 'Account User'}
                      </p>
                      <p style={{ margin: '0.15rem 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {user?.email || 'Signed In'}
                      </p>
                    </div>

                    <Link
                      to="/profile"
                      className="sidebar-item"
                      style={{ textDecoration: 'none' }}
                      onClick={closeAccountMenu}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', color: 'var(--color-text)', fontSize: '0.9rem' }}>
                        <User size={16} color="var(--color-primary)" />
                        <span>My Profile</span>
                      </div>
                    </Link>

                    <Link
                      to="/history"
                      className="sidebar-item"
                      style={{ textDecoration: 'none' }}
                      onClick={closeAccountMenu}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', color: 'var(--color-text)', fontSize: '0.9rem' }}>
                        <History size={16} color="var(--color-primary)" />
                        <span>My Results</span>
                      </div>
                    </Link>

                    <Link
                      to="/dashboard"
                      className="sidebar-item"
                      style={{ textDecoration: 'none' }}
                      onClick={closeAccountMenu}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.55rem 0.75rem', borderRadius: 'var(--radius-sm)', color: 'var(--color-text)', fontSize: '0.9rem' }}>
                        <LayoutDashboard size={16} color="var(--color-secondary)" />
                        <span>Dashboard</span>
                      </div>
                    </Link>

                    <div style={{ height: '1px', backgroundColor: 'var(--color-border-light)', margin: '0.35rem 0' }} />

                    <button
                      type="button"
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        padding: '0.55rem 0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--color-error)',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        textAlign: 'left',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <LogOut size={16} />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Direct Quick Logout Button */}
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={handleLogout}
                title="Log out of your account"
              >
                <LogOut size={14} />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="btn btn-ghost btn-sm">
                Log In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Create Account
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Clear Menu Button */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
        </button>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-backdrop"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          {/* Main 5 Navigation Links (Large Touch Targets, Flat List) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', paddingLeft: '0.25rem' }}>
              Main Menu
            </span>
            {mainNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <span>{item.name}</span>
                <ChevronRight size={18} color="var(--color-text-muted)" />
              </NavLink>
            ))}
          </div>

          {/* Account Actions Section */}
          <div style={{ marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {isAuthenticated ? (
              <>
                {/* User Info Card */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.85rem 1rem',
                    background: 'var(--color-bg)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <div className="avatar" style={{ width: '40px', height: '40px' }}>
                    {user?.name ? user.name.substring(0, 2).toUpperCase() : 'ME'}
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-text)' }}>
                      {user?.name || 'Account User'}
                    </p>
                    <p style={{ margin: '0.15rem 0 0', fontSize: '0.8rem', color: 'var(--color-text-muted)', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {user?.email || 'Logged in'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleLogout}
                  style={{ minHeight: '48px', width: '100%', color: 'var(--color-error)', borderColor: '#FCA5A5' }}
                >
                  <LogOut size={18} />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="btn btn-primary"
                  onClick={closeMobileMenu}
                  style={{ minHeight: '48px', width: '100%', fontSize: '1rem' }}
                >
                  Create Account
                </Link>
                <Link
                  to="/login"
                  className="btn btn-outline"
                  onClick={closeMobileMenu}
                  style={{ minHeight: '48px', width: '100%', fontSize: '1rem' }}
                >
                  Log In
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
