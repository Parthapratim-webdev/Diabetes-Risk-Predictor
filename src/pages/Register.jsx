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
import { EMAIL_REGEX, checkPasswordStrength } from '../utils/validation';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import toast from 'react-hot-toast';

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      consent: false,
    },
  });

  const passwordValue = watch('password', '');
  const passwordStrength = checkPasswordStrength(passwordValue);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await registerAuth({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      toast.success(result.notice || 'Account registered successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please check inputs.');
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
            maxWidth: '1050px',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            padding: 0,
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)',
            borderRadius: 'var(--radius-xl)',
          }}
        >
          {/* Side Info Panel */}
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
                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={22} fill="#FFFFFF" />
                </div>
                <h3 style={{ color: '#FFFFFF', margin: 0, fontSize: '1.25rem' }}>Diabetes Risk Predictor</h3>
              </div>

              <h2 style={{ color: '#FFFFFF', fontSize: '1.85rem', marginBottom: '1rem', lineHeight: 1.25 }}>
                Start Tracking Your Health Insights
              </h2>
              <p style={{ color: '#E0F2FE', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Create a secure educational account to monitor health assessments, track vital statistics, and learn evidence-based prevention strategies.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div className="flex items-center gap-2" style={{ fontSize: '0.9rem', color: '#F0FDFA' }}>
                  <Check size={18} color="#A7F3D0" />
                  <span>Personalized dashboard & metric histories</span>
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: '0.9rem', color: '#F0FDFA' }}>
                  <Check size={18} color="#A7F3D0" />
                  <span>Evidence-based clinical reference ranges</span>
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: '0.9rem', color: '#F0FDFA' }}>
                  <Check size={18} color="#A7F3D0" />
                  <span>Downloadable & printable summary reports</span>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.15)', marginTop: '2rem' }}>
              <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
                <ShieldCheck size={18} color="#A7F3D0" />
                <strong style={{ fontSize: '0.85rem', color: '#FFFFFF' }}>Academic Privacy Notice</strong>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#E2E8F0' }}>
                Passwords are never stored in plaintext. Fully prepared for bcrypt hashing on Node.js/Express.
              </p>
            </div>
          </div>

          {/* Registration Form */}
          <div style={{ padding: '3rem 2.5rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--color-text)' }}>Create Account</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.925rem' }}>
                Join the platform to access your personal assessments.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Full Name */}
              <div className="form-group">
                <label className="form-label form-label-required" htmlFor="name">
                  Full Name
                </label>
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
                    {...register('name', {
                      required: 'Full name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
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

              {/* Email */}
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

              {/* Password */}
              <div className="form-group">
                <label className="form-label form-label-required" htmlFor="password">
                  Password
                </label>
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
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 8, message: 'Password must be at least 8 characters' },
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

                {/* Password Strength Meter */}
                {passwordValue.length > 0 && (
                  <div style={{ marginTop: '0.65rem' }}>
                    <div className="flex items-center justify-between" style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                      <span style={{ color: 'var(--color-text-secondary)' }}>Password Strength:</span>
                      <strong style={{ color: passwordStrength.color }}>{passwordStrength.label}</strong>
                    </div>
                    <div style={{ height: '6px', width: '100%', backgroundColor: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${passwordStrength.percentage}%`,
                          backgroundColor: passwordStrength.color,
                          transition: 'width 0.3s ease, background-color 0.3s ease',
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label className="form-label form-label-required" htmlFor="confirmPassword">
                  Confirm Password
                </label>
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
                    placeholder="Repeat password"
                    autoComplete="new-password"
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (val) => val === passwordValue || 'Passwords do not match',
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

              {/* Terms and Privacy Consent */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    {...register('consent', {
                      required: 'You must acknowledge the educational notice and terms to proceed.',
                    })}
                  />
                  <span>
                    I understand this platform is for educational risk awareness only, not medical diagnosis.
                  </span>
                </label>
                {errors.consent && (
                  <span className="form-error">
                    <AlertCircle size={14} />
                    {errors.consent.message}
                  </span>
                )}
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
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Complete Registration</span>
                    <ArrowRight size={18} />
                  </div>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                Sign In
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
