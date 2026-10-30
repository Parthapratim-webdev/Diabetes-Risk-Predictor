import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Heart,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { EMAIL_REGEX } from '../utils/validation';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import toast from 'react-hot-toast';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { login, loginDemoGuest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    if (isSubmitting) return;

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await login({
        email: data.email.trim().toLowerCase(),
        password: data.password,
      });

      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      const friendlyMessage =
        err?.message && !err.message.includes('object') && !err.message.includes('at ')
          ? err.message
          : 'We could not sign you in. Please check your email and password.';

      setErrorMessage(friendlyMessage);
      toast.error(friendlyMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestDemoAccess = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await loginDemoGuest();
      toast.success('Signed in as Guest Preview.');
      navigate('/dashboard');
    } catch {
      toast.error('Could not start preview session. Please try again.');
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
            maxWidth: '1000px',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            padding: 0,
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)',
            borderRadius: 'var(--radius-xl)',
          }}
        >
          {/* Side Overview Panel */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1E40AF 0%, #0D9488 100%)',
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
                Welcome Back
              </h2>
              <p style={{ color: '#CCFBF1', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Sign in to view your previous results, track changes in your health measurements, and continue your health journey.
              </p>
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.1)',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <div className="flex items-center gap-2" style={{ marginBottom: '0.35rem' }}>
                <ShieldCheck size={18} color="#A7F3D0" />
                <strong style={{ fontSize: '0.85rem', color: '#FFFFFF' }}>Confidential & Secure</strong>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                Your session is protected. Passwords are never saved in browser storage.
              </p>
            </div>
          </div>

          {/* Login Form Container */}
          <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.35rem', color: 'var(--color-text)' }}>
                Log In
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.925rem', margin: 0 }}>
                Enter your account details to continue.
              </p>
            </div>

            {/* Error Message Alert */}
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
              {/* 1. Email Field */}
              <div className="form-group">
                <label className="form-label form-label-required" htmlFor="email">
                  Email Address
                </label>
                <span className="form-helper" style={{ marginBottom: '0.35rem' }}>
                  Enter the email address for your account.
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

              {/* 2. Password Field */}
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label className="form-label form-label-required" htmlFor="password">
                  Password
                </label>
                <span className="form-helper" style={{ marginBottom: '0.35rem' }}>
                  Enter your account password.
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
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={isSubmitting}
                    {...register('password', {
                      required: 'Please enter your password.',
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
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Log In</span>
                    <ArrowRight size={18} />
                  </div>
                )}
              </button>
            </form>

            {/* Optional Guest Demo Mode (Explicitly marked, honest preview) */}
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button
                type="button"
                onClick={handleGuestDemoAccess}
                className="btn btn-outline btn-sm"
                style={{ width: '100%', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}
                disabled={isSubmitting}
              >
                <UserCheck size={16} />
                <span>Continue as Guest (Demo Mode - No Account Needed)</span>
              </button>
            </div>

            {/* Create Account link */}
            <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.925rem', color: 'var(--color-text-secondary)' }}>
              Don't have an account yet?{' '}
              <Link to="/register" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
