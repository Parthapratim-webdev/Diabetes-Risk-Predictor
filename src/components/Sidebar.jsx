import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  History,
  Lightbulb,
  User,
  Info,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Heart,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Sidebar = ({ isCollapsed, onToggleCollapse, isMobileOpen, onCloseMobile }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    if (onCloseMobile) onCloseMobile();
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'New Assessment', path: '/prediction', icon: PlusCircle },
    { name: 'Assessment History', path: '/history', icon: History },
    { name: 'Health Insights', path: '/health-insights', icon: Lightbulb },
    { name: 'My Profile', path: '/profile', icon: User },
    { name: 'About Project', path: '/about', icon: Info },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}
        aria-label="Dashboard Sidebar Navigation"
      >
        {/* Sidebar Header */}
        <div className="sidebar-header">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="brand-icon" style={{ width: '32px', height: '32px' }}>
                <Heart size={16} fill="#FFFFFF" />
              </div>
              <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text)' }}>
                Diabetes<span style={{ color: 'var(--color-primary)' }}>Risk</span>
              </span>
            </div>
          )}

          {isCollapsed && (
            <div className="brand-icon" style={{ width: '36px', height: '36px', margin: '0 auto' }}>
              <Heart size={18} fill="#FFFFFF" />
            </div>
          )}

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            className="sidebar-toggle-btn no-mobile"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Sidebar Navigation Items */}
        <ul className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path} className="sidebar-item">
                <NavLink
                  to={item.path}
                  end={item.path === '/dashboard'}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={onCloseMobile}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon size={20} style={{ flexShrink: 0 }} />
                  {!isCollapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Sidebar Footer / User summary & Logout */}
        <div className="sidebar-footer">
          {!isCollapsed && user && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 0.5rem 0.75rem',
                borderBottom: '1px solid var(--color-border-light)',
                marginBottom: '0.5rem',
              }}
            >
              <div className="avatar" style={{ width: '34px', height: '34px', fontSize: '0.8rem' }}>
                {user.avatarInitials || 'AM'}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <p style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {user.name}
                </p>
                <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                  Demo Mode
                </span>
              </div>
            </div>
          )}

          <div className="sidebar-item">
            <button
              type="button"
              onClick={handleLogout}
              style={{ color: 'var(--color-error)' }}
              title={isCollapsed ? 'Logout' : undefined}
            >
              <LogOut size={20} style={{ flexShrink: 0 }} />
              {!isCollapsed && <span>Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
