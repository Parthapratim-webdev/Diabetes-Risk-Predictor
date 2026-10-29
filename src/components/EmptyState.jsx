import React from 'react';
import { AlertCircle } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = AlertCircle,
  title = 'No Records Found',
  description = 'There is currently no data available to display in this view.',
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <Icon size={32} />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      <div className="flex items-center gap-3">
        {actionText && onAction && (
          <button type="button" className="btn btn-primary" onClick={onAction}>
            {actionText}
          </button>
        )}
        {secondaryActionText && onSecondaryAction && (
          <button type="button" className="btn btn-outline" onClick={onSecondaryAction}>
            {secondaryActionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
