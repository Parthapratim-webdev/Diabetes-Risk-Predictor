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
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { EMAIL_REGEX } from '../utils/validation';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import toast from 'react-hot-toast';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await login({ email: data.email, password: data.password });
      toast.success(result.notice || 'Successfully authenticated!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickFillDemo = () => {
    setValue('email', 'alex.morgan@healthportal.demo');
    setValue('password', 'HealthDemo@2026');
    toast('Filled with demonstration credentials for testing.', {
      icon: '💡',
    });
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
          {/* Left / Side Brand Illustration Panel */}
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
                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={22} fill="#FFFFFF" />
                </div>
                <h3 style={{ color: '#FFFFFF', margin: 0, fontSize: '1.25rem' }}>Diabetes Risk Predictor</h3>
              </div>

              <h2 style={{ color: '#FFFFFF', fontSize: '1.85rem', marginBottom: '1rem', lineHeight: 1.25 }}>
                Access Your Health Dashboard
              </h2>
              <p style={{ color: '#CCFBF1', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Track your biometric assessments over time, evaluate educational risk indicators, and monitor lifestyle progress.
              </p>
            </div>

            {/* Side Note */}
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.25rem', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <div className="flex items-center gap-2" style={{ marginBottom: '0.35rem' }}>
                <ShieldCheck size={18} color="#A7F3D0" />
                <strong style={{ fontSize: '0.85rem', color: '#FFFFFF' }}>Privacy-First Platform</strong>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                Architecture prepared for secure REST APIs, HTTP-only cookies, and client token encryption.
              </p>
            </div>
          </div>

          {/* Right Form Container */}
          <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>Sign In</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.925rem' }}>
                Enter your credentials to manage your health assessments.
              </p>
            </div>

            {/* Quick-Fill Demonstration Notice */}
            <div
              style={{
                marginBottom: '1.5rem',
                padding: '0.85rem 1rem',
                backgroundColor: 'var(--color-primary-light)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid rgba(37, 99, 235, 0.2)',
              }}
            >
              <div className="flex items-center gap-2">
                <Sparkles size={18} color="var(--color-primary)" />
                <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                  College Viva Demo Available
                </span>
              </div>
              <button
                type="button"
                onClick={handleQuickFillDemo}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', backgroundColor: '#FFFFFF' }}
              >
                Auto-fill Demo
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Email Field */}
              <div className="form-group">
                <label className="form-label form-label-required" htmlFor="email">
                  Email Address
                </label>
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
                    {...register('email', {
                      required: 'Email address is required',
                      pattern: {
                        value: EMAIL_REGEX,
                        message: 'Please enter a valid email address format',
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

              {/* Password Field */}
              <div className="form-group">
                <div className="flex items-center justify-between">
                  <label className="form-label form-label-required" htmlFor="password">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => toast.info('For this college demo, password reset instructions are logged to simulated session.')}
                    style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 500 }}
                  >
                    Forgot Password?
                  </button>
                </div>
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
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
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
              </div>

              {/* Remember Me */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="checkbox-label">
                  <input type="checkbox" {...register('rememberMe')} />
                  <span>Remember me on this browser session</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="spinner spinner-sm spinner-white" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Sign In</span>
                    <ArrowRight size={18} />
                  </div>
                )}
              </button>
            </form>

            {/* Registration link */}
            <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              Don't have an account yet?{' '}
              <Link to="/register" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                Create Free Account
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
