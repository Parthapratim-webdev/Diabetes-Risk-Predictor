import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Heart,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Check,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { EMAIL_REGEX } from '../utils/validation';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import toast from 'react-hot-toast';

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
  });

  const passwordValue = watch('password', '');

  // Password requirements checks
  const meetsMinLength = passwordValue.length >= 8;
  const meetsUppercase = /[A-Z]/.test(passwordValue);
  const meetsLowercase = /[a-z]/.test(passwordValue);
  const meetsNumber = /[0-9]/.test(passwordValue);

  const onSubmit = async (data) => {
    if (isSubmitting) return;

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await registerAuth({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
      });

      toast.success('Your account has been created successfully!');
      navigate('/dashboard');
    } catch (err) {
      // Show user-friendly error message without technical details
      const friendlyMessage =
        err?.message && !err.message.includes('object') && !err.message.includes('at ')
          ? err.message
          : 'Your account could not be created. Please try again.';

      setErrorMessage(friendlyMessage);
      toast.error(friendlyMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem' }}>
        <div
          className="card"
          style={{
            maxWidth: '1020px',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            padding: 0,
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)',
            borderRadius: 'var(--radius-xl)',
          }}
        >
          {/* Side Overview Panel */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0D9488 0%, #1E40AF 100%)',
              color: '#FFFFFF',
              padding: '3.5rem 2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div className="flex items-center gap-2" style={{ marginBottom: '2rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Heart size={22} fill="#FFFFFF" />
                </div>
                <h3 style={{ color: '#FFFFFF', margin: 0, fontSize: '1.25rem' }}>Diabetes Risk Predictor</h3>
              </div>

              <h2 style={{ color: '#FFFFFF', fontSize: '1.85rem', marginBottom: '1rem', lineHeight: 1.25 }}>
                Create Your Account
              </h2>
              <p style={{ color: '#E0F2FE', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Join to track your health assessments over time, save your results, and explore personalized health information.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
                <div className="flex items-center gap-2.5" style={{ fontSize: '0.9rem', color: '#F0FDFA' }}>
                  <Check size={18} color="#A7F3D0" />
                  <span>Save and review your previous results</span>
                </div>
                <div className="flex items-center gap-2.5" style={{ fontSize: '0.9rem', color: '#F0FDFA' }}>
                  <Check size={18} color="#A7F3D0" />
                  <span>Track measurements like glucose, BMI, and vitals</span>
                </div>
                <div className="flex items-center gap-2.5" style={{ fontSize: '0.9rem', color: '#F0FDFA' }}>
                  <Check size={18} color="#A7F3D0" />
                  <span>Evidence-informed guidance aligned with ADA guidelines</span>
                </div>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255,255,255,0.15)',
                marginTop: '2rem',
              }}
            >
              <div className="flex items-center gap-2" style={{ marginBottom: '0.3rem' }}>
                <ShieldCheck size={18} color="#A7F3D0" />
                <strong style={{ fontSize: '0.85rem', color: '#FFFFFF' }}>Privacy Protected</strong>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                Your information is kept secure. Passwords are never stored in browser storage.
              </p>
            </div>
          </div>

          {/* Registration Form Container */}
          <div style={{ padding: '3rem 2.5rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.35rem', color: 'var(--color-text)' }}>
                Create an Account
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.925rem', margin: 0 }}>
                Please fill in the fields below to get started.
              </p>
            </div>

            {/* Failure Alert Banner */}
            {errorMessage && (
              <div
                className="alert-banner danger"
                style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                role="alert"
              >
                <AlertCircle size={20} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem' }}>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* 1. Full Name */}
              <div className="form-group">
                <label className="form-label form-label-required" htmlFor="name">
                  Full Name
                </label>
                <span className="form-helper" style={{ marginBottom: '0.35rem' }}>
                  Enter your first and last name.
                </span>
                <div className="input-wrapper">
                  <div className="input-icon-left">
                    <User size={18} />
                  </div>
                  <input
                    id="name"
                    type="text"
                    className={`form-input form-input-with-icon-left ${errors.name ? 'has-error' : ''}`}
                    placeholder="e.g. Alex Morgan"
                    autoComplete="name"
                    disabled={isSubmitting}
                    {...register('name', {
                      required: 'Please enter your full name.',
                      minLength: { value: 2, message: 'Please enter your full name (at least 2 characters).' },
                    })}
                  />
                </div>
                {errors.name && (
                  <span className="form-error">
                    <AlertCircle size={14} />
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* 2. Email Address */}
              <div className="form-group">
                <label className="form-label form-label-required" htmlFor="email">
                  Email Address
                </label>
                <span className="form-helper" style={{ marginBottom: '0.35rem' }}>
                  Enter your email address. We'll use this to identify your account.
                </span>
                <div className="input-wrapper">
                  <div className="input-icon-left">
                    <Mail size={18} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className={`form-input form-input-with-icon-left ${errors.email ? 'has-error' : ''}`}
                    placeholder="name@example.com"
                    autoComplete="email"
                    disabled={isSubmitting}
                    {...register('email', {
                      required: 'Please enter your email address.',
                      pattern: {
                        value: EMAIL_REGEX,
                        message: 'Please enter a valid email address.',
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <span className="form-error">
                    <AlertCircle size={14} />
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* 3. Password */}
              <div className="form-group">
                <label className="form-label form-label-required" htmlFor="password">
                  Password
                </label>
                <span className="form-helper" style={{ marginBottom: '0.35rem' }}>
                  Choose a secure password with at least 8 characters.
                </span>
                <div className="input-wrapper">
                  <div className="input-icon-left">
                    <Lock size={18} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className={`form-input form-input-with-icon-left form-input-with-icon-right ${
                      errors.password ? 'has-error' : ''
                    }`}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    disabled={isSubmitting}
                    {...register('password', {
                      required: 'Please enter a password.',
                      minLength: { value: 8, message: 'Password must be at least 8 characters long.' },
                      validate: {
                        hasUpper: (val) => /[A-Z]/.test(val) || 'Password must include at least one uppercase letter.',
                        hasLower: (val) => /[a-z]/.test(val) || 'Password must include at least one lowercase letter.',
                        hasNumber: (val) => /[0-9]/.test(val) || 'Password must include at least one number.',
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="input-icon-right"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="form-error">
                    <AlertCircle size={14} />
                    {errors.password.message}
                  </span>
                )}

                {/* Password Requirements Guidance Box (Explained before submission) */}
                <div
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.85rem 1rem',
                    backgroundColor: '#F8FAFC',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.825rem',
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--color-text)', display: 'block', marginBottom: '0.4rem' }}>
                    Password requirements:
                  </span>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                    }}
                  >
                    <li
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        color: meetsMinLength ? 'var(--color-success)' : 'var(--color-text-secondary)',
                      }}
                    >
                      <Check size={14} color={meetsMinLength ? 'var(--color-success)' : '#CBD5E1'} />
                      <span>At least 8 characters long</span>
                    </li>
                    <li
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        color: meetsUppercase ? 'var(--color-success)' : 'var(--color-text-secondary)',
                      }}
                    >
                      <Check size={14} color={meetsUppercase ? 'var(--color-success)' : '#CBD5E1'} />
                      <span>At least one uppercase letter (A–Z)</span>
                    </li>
                    <li
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        color: meetsLowercase ? 'var(--color-success)' : 'var(--color-text-secondary)',
                      }}
                    >
                      <Check size={14} color={meetsLowercase ? 'var(--color-success)' : '#CBD5E1'} />
                      <span>At least one lowercase letter (a–z)</span>
                    </li>
                    <li
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        color: meetsNumber ? 'var(--color-success)' : 'var(--color-text-secondary)',
                      }}
                    >
                      <Check size={14} color={meetsNumber ? 'var(--color-success)' : '#CBD5E1'} />
                      <span>At least one number (0–9)</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 4. Confirm Password */}
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label className="form-label form-label-required" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <span className="form-helper" style={{ marginBottom: '0.35rem' }}>
                  Re-enter your password to make sure it matches.
                </span>
                <div className="input-wrapper">
                  <div className="input-icon-left">
                    <Lock size={18} />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`form-input form-input-with-icon-left form-input-with-icon-right ${
                      errors.confirmPassword ? 'has-error' : ''
                    }`}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    disabled={isSubmitting}
                    {...register('confirmPassword', {
                      required: 'Please confirm your password.',
                      validate: (val) => val === passwordValue || 'Your passwords do not match.',
                    })}
                  />
                  <button
                    type="button"
                    className="input-icon-right"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="form-error">
                    <AlertCircle size={14} />
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              {/* Submit Button (Disables repeated submissions while processing) */}
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', minHeight: '48px', fontSize: '1rem' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="spinner spinner-sm spinner-white" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Create Account</span>
                    <ArrowRight size={18} />
                  </div>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.925rem', color: 'var(--color-text-secondary)' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                Log In
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
