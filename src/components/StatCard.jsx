import React from 'react';

export const StatCard = ({
  title,
  value,
  subtext,
  icon: Icon,
  iconColor = 'var(--color-primary)',
  iconBg = 'var(--color-primary-light)',
  badge,
  badgeType = 'neutral',
  onClick,
}) => {
  return (
    <div
      className={`stat-card ${onClick ? 'card-hover cursor-pointer' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="stat-info">
        <span className="stat-title">{title}</span>
        <span className="stat-value">{value}</span>
        {subtext && <span className="stat-subtext">{subtext}</span>}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
        {Icon && (
          <div
            className="stat-icon-wrapper"
            style={{ backgroundColor: iconBg, color: iconColor }}
          >
            <Icon size={24} />
          </div>
        )}
        {badge && <span className={`badge badge-${badgeType}`}>{badge}</span>}
      </div>
    </div>
  );
};

export default StatCard;
