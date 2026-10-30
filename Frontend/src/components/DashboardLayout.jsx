import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Calendar,
  User,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { user, logout, isDemoMode } = useAuth();
  const navigate = useNavigate();

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  const handleLogout = async () => {
    await logout();
    navigate('/');
    toast.success('Successfully logged out.');
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-header no-print">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger toggle */}
            <button
              type="button"
              className="sidebar-toggle-btn"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open navigation sidebar"
              style={{ display: 'flex' }}
            >
              <Menu size={22} />
            </button>

            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                Welcome back, {user?.name ? user.name.split(' ')[0] : 'Alex'} 👋
              </h2>
              <div className="flex items-center gap-2" style={{ marginTop: '0.15rem' }}>
                <span className="flex items-center gap-1" style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                  <Calendar size={13} />
                  {formattedDate}
                </span>
                {isDemoMode && (
                  <span
                    className="badge badge-secondary"
                    style={{ fontSize: '0.7rem', padding: '0.1rem 0.45rem' }}
                    title="Frontend running with demonstration state, ready for Node.js backend integration"
                  >
                    Demo Environment
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Header Icons & Profile */}
          <div className="flex items-center gap-3" style={{ position: 'relative' }}>
            {/* Notifications Button */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className="btn-icon-only btn-ghost"
                onClick={handleNotificationClick}
                aria-label="View notifications"
                style={{ position: 'relative' }}
              >
                <Bell size={20} />
                <span
                  style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                  }}
                />
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div
                  className="card"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    width: '320px',
                    padding: '1rem',
                    zIndex: 200,
                    boxShadow: 'var(--shadow-xl)',
                  }}
                >
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border-light)' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Notifications</span>
                    <span className="badge badge-primary">2 New</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ fontSize: '0.825rem', padding: '0.5rem', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-sm)' }}>
                      <p style={{ fontWeight: 600, color: 'var(--color-primary)', margin: 0 }}>System Ready for API</p>
                      <p style={{ margin: '0.2rem 0 0', color: 'var(--color-text-secondary)' }}>
                        Frontend is prepared to integrate with Express.js at <code>http://localhost:5000/api</code>.
                      </p>
                    </div>
                    <div style={{ fontSize: '0.825rem', padding: '0.5rem', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-sm)' }}>
                      <p style={{ fontWeight: 600, margin: 0 }}>Routine Assessment Due</p>
                      <p style={{ margin: '0.2rem 0 0', color: 'var(--color-text-secondary)' }}>
                        Track your periodic health measurements to monitor longitudinal trends.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className="user-profile-btn"
                onClick={handleProfileClick}
                aria-expanded={showProfileMenu}
                aria-label="User profile menu"
              >
                <div className="avatar">
                  {user?.avatarInitials || (user?.name ? user.name.substring(0, 2).toUpperCase() : 'AM')}
                </div>
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)', lineHeight: 1.2 }}>
                    {user?.name || 'Alex Morgan'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {user?.role || 'Patient Account'}
                  </span>
                </div>
              </button>

              {/* Profile Menu Popover */}
              {showProfileMenu && (
                <div
                  className="card"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    width: '210px',
                    padding: '0.5rem',
                    zIndex: 200,
                    boxShadow: 'var(--shadow-xl)',
                  }}
                >
                  <Link
                    to="/profile"
                    className="sidebar-item"
                    style={{ textDecoration: 'none' }}
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)', color: 'var(--color-text)', fontSize: '0.9rem' }}>
                      <User size={16} />
                      <span>My Profile</span>
                    </div>
                  </Link>
                  <Link
                    to="/health-insights"
                    style={{ textDecoration: 'none' }}
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.6rem 0.75rem', borderRadius: 'var(--radius-sm)', color: 'var(--color-text)', fontSize: '0.9rem' }}>
                      <Sparkles size={16} />
                      <span>Learn About Diabetes</span>
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
                      padding: '0.6rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-error)',
                      fontSize: '0.9rem',
                      textAlign: 'left',
                    }}
                  >
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Nested Route Content */}
        <main className="dashboard-content" role="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
