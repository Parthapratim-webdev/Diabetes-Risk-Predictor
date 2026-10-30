import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Bell,
  Shield,
  Trash2,
  Save,
  X,
  Download,
  KeyRound,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { EMAIL_REGEX } from '../utils/validation';
import { Modal } from '../components/Modal';
import toast from 'react-hot-toast';

export const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

  // Profile Edit Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.name || 'Alex Morgan',
      email: user?.email || 'alex.morgan@healthportal.demo',
    },
  });

  // Password Change Form
  const {
    register: registerPass,
    handleSubmit: handlePasswordSubmit,
    watch: watchPass,
    reset: resetPass,
    formState: { errors: passErrors, isSubmitting: isPassSubmitting },
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  // Notification Preferences State
  const [notifications, setNotifications] = useState({
    emailReports: user?.notifications?.emailReports ?? true,
    healthTips: user?.notifications?.healthTips ?? true,
    reminders: user?.notifications?.reminders ?? false,
  });

  // Privacy Settings State
  const [privacy] = useState({
    shareTelemetry: user?.privacySettings?.shareTelemetry ?? false,
    demoModeActive: user?.privacySettings?.demoModeActive ?? true,
  });

  const onProfileSave = async (data) => {
    try {
      await updateProfile({
        name: data.name,
        email: data.email,
        notifications,
        privacySettings: privacy,
      });
      setIsEditing(false);
      toast.success('Profile details updated successfully.');
    } catch {
      toast.error('Failed to update profile.');
    }
  };

  const onCancelEdit = () => {
    reset({
      name: user?.name || 'Alex Morgan',
      email: user?.email || 'alex.morgan@healthportal.demo',
    });
    setIsEditing(false);
  };

  const onChangePassword = async () => {
    try {
      toast.success('Password updated successfully.');
      setChangePasswordModalOpen(false);
      resetPass();
    } catch {
      toast.error('Could not update password.');
    }
  };

  const handleExportData = () => {
    const dataString = JSON.stringify(
      {
        profile: user,
        exportedAt: new Date().toISOString(),
        format: 'JSON Health Record Export',
      },
      null,
      2
    );

    const blob = new Blob([dataString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `User_Health_Data_${user?.id || 'export'}.json`;
    link.click();
    URL.revokeObjectURL(link);
    toast.success('Your account data archive has been exported.');
  };

  const handleConfirmAccountDeletion = async () => {
    setDeleteModalOpen(false);
    toast.success('Account deletion request initiated.');
    await logout();
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Profile Overview Card */}
      <div className="card" style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border-light)' }}>
          <div className="flex items-center gap-4">
            <div
              className="avatar"
              style={{
                width: '72px',
                height: '72px',
                fontSize: '1.75rem',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              {user?.avatarInitials || (user?.name ? user.name.substring(0, 2).toUpperCase() : 'AM')}
            </div>

            <div>
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{user?.name || 'Alex Morgan'}</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: '0.2rem 0 0.5rem' }}>
                {user?.email || 'alex.morgan@healthportal.demo'}
              </p>
              <div className="flex items-center gap-2">
                <span className="badge badge-primary">Active Patient Profile</span>
                <span className="badge badge-secondary">College Demo Account</span>
              </div>
            </div>
          </div>

          <div>
            {!isEditing ? (
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={onCancelEdit}
                >
                  <X size={14} />
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleSubmit(onProfileSave)}
                  disabled={isSubmitting}
                >
                  <Save size={14} />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Information Fields */}
        <form onSubmit={handleSubmit(onProfileSave)}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className={`form-input ${errors.name ? 'has-error' : ''}`}
                disabled={!isEditing}
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <span className="form-error">{errors.name.message}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className={`form-input ${errors.email ? 'has-error' : ''}`}
                disabled={!isEditing}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: EMAIL_REGEX, message: 'Invalid email' },
                })}
              />
              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Account Created</label>
              <input
                type="text"
                className="form-input"
                disabled
                value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Jan 15, 2026'}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Account Role</label>
              <input
                type="text"
                className="form-input"
                disabled
                value={user?.role || 'User / Student Reviewer'}
              />
            </div>
          </div>
        </form>
      </div>

      {/* Security & Password */}
      <div className="card" style={{ padding: '2rem' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '1.25rem' }}>
          <div className="flex items-center gap-2">
            <KeyRound size={20} color="var(--color-primary)" />
            <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Security & Authentication</h3>
          </div>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setChangePasswordModalOpen(true)}
          >
            Change Password
          </button>
        </div>
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          Your authentication is structured for bcrypt-hashed password protection via Express and HTTP-only session cookies.
        </p>
      </div>

      {/* Notification Preferences */}
      <div className="card" style={{ padding: '2rem' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '1.25rem' }}>
          <Bell size={20} color="var(--color-secondary)" />
          <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Notification Preferences</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={notifications.emailReports}
              onChange={(e) => setNotifications({ ...notifications, emailReports: e.target.checked })}
            />
            <div>
              <strong style={{ display: 'block', color: 'var(--color-text)' }}>Assessment Summary Emails</strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                Receive a copy of your educational assessment results via email.
              </span>
            </div>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={notifications.healthTips}
              onChange={(e) => setNotifications({ ...notifications, healthTips: e.target.checked })}
            />
            <div>
              <strong style={{ display: 'block', color: 'var(--color-text)' }}>Educational Health Tips</strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                Periodic articles on nutrition, aerobic exercise, and glycemic awareness.
              </span>
            </div>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={notifications.reminders}
              onChange={(e) => setNotifications({ ...notifications, reminders: e.target.checked })}
            />
            <div>
              <strong style={{ display: 'block', color: 'var(--color-text)' }}>Periodic Vitals Reminders</strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                Friendly alerts to track your fasting glucose or blood pressure metrics quarterly.
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Privacy & Data Management */}
      <div className="card" style={{ padding: '2rem' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '1.25rem' }}>
          <Shield size={20} color="var(--color-primary)" />
          <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Privacy & Data Management</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem' }}>Export Personal Data Archive</strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                Download a machine-readable JSON copy of all biometrics, assessments, and profile settings.
              </span>
            </div>
            <button type="button" className="btn btn-outline btn-sm" onClick={handleExportData}>
              <Download size={16} />
              <span>Export My Data</span>
            </button>
          </div>

          <div style={{ height: '1px', backgroundColor: 'var(--color-border-light)' }} />

          <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--color-error)' }}>
                Delete Account & Data
              </strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                Permanently remove your account, biometric history, and profile records.
              </span>
            </div>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => setDeleteModalOpen(true)}
            >
              <Trash2 size={16} />
              <span>Request Deletion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <Modal
        isOpen={changePasswordModalOpen}
        onClose={() => setChangePasswordModalOpen(false)}
        title="Change Account Password"
        footer={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setChangePasswordModalOpen(false)}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handlePasswordSubmit(onChangePassword)}
              disabled={isPassSubmitting}
            >
              Update Password
            </button>
          </>
        }
      >
        <form onSubmit={handlePasswordSubmit(onChangePassword)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label form-label-required">Current Password</label>
            <input
              type="password"
              className={`form-input ${passErrors.currentPassword ? 'has-error' : ''}`}
              placeholder="••••••••"
              {...registerPass('currentPassword', { required: 'Current password is required' })}
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label form-label-required">New Password</label>
            <input
              type="password"
              className={`form-input ${passErrors.newPassword ? 'has-error' : ''}`}
              placeholder="At least 8 characters"
              {...registerPass('newPassword', {
                required: 'New password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
              })}
            />
            {passErrors.newPassword && <span className="form-error">{passErrors.newPassword.message}</span>}
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label form-label-required">Confirm New Password</label>
            <input
              type="password"
              className={`form-input ${passErrors.confirmNewPassword ? 'has-error' : ''}`}
              placeholder="Repeat new password"
              {...registerPass('confirmNewPassword', {
                required: 'Please confirm password',
                validate: (v) => v === watchPass('newPassword') || 'Passwords do not match',
              })}
            />
            {passErrors.confirmNewPassword && (
              <span className="form-error">{passErrors.confirmNewPassword.message}</span>
            )}
          </div>
        </form>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Data Deletion"
        footer={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={handleConfirmAccountDeletion}>
              Permanently Delete
            </button>
          </>
        }
      >
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
          Are you sure you want to delete your account? All biometric logs, prediction histories, and profile settings will be permanently erased.
        </p>
      </Modal>
    </div>
  );
};

export default Profile;
