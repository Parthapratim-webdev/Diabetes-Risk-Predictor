import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Scale,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Edit2,
  Activity,
  Heart,
  Send,
  RotateCcw,
} from 'lucide-react';
import { calculateBMI } from '../utils/bmiCalculator';
import { predictionService } from '../services/predictionService';
import { Modal } from '../components/Modal';
import toast from 'react-hot-toast';

export const Prediction = () => {
  // Steps: 1 = About You, 2 = Health Information, 3 = Review Your Answers
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [bmiResult, setBmiResult] = useState(null);

  // Assessment method: 'standard' (with recent blood glucose tests) or 'basic' (lifestyle & vitals, no lab tests needed)
  const [assessmentMethod, setAssessmentMethod] = useState('standard');

  // Unknown measurement flags (so we never invent missing values or silently substitute zero)
  const [glucoseUnknown, setGlucoseUnknown] = useState(false);
  const [bpUnknown, setBpUnknown] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      age: '',
      gender: 'Prefer not to say',
      heightCm: '',
      weightKg: '',
      glucose: '',
      glucoseUnit: 'mg/dL',
      systolicBP: '',
      diastolicBP: '',
      familyHistory: 'unknown',
      physicalActivity: 'moderate',
    },
    mode: 'onTouched',
  });

  const watchedHeight = watch('heightCm');
  const watchedWeight = watch('weightKg');
  const watchedAge = watch('age');
  const watchedGender = watch('gender');
  const watchedGlucose = watch('glucose');
  const watchedGlucoseUnit = watch('glucoseUnit');
  const watchedSystolic = watch('systolicBP');
  const watchedDiastolic = watch('diastolicBP');
  const watchedFamilyHistory = watch('familyHistory');
  const watchedActivity = watch('physicalActivity');

  // Dynamically calculate BMI whenever valid height and weight are entered
  useEffect(() => {
    if (watchedHeight && watchedWeight) {
      const calc = calculateBMI(watchedHeight, watchedWeight);
      setBmiResult(calc);
    } else {
      setBmiResult(null);
    }
  }, [watchedHeight, watchedWeight]);

  // When glucoseUnknown is toggled, clear or reset validation
  const handleToggleGlucoseUnknown = (checked) => {
    setGlucoseUnknown(checked);
    if (checked) {
      setValue('glucose', '');
    }
  };

  // When bpUnknown is toggled, clear values
  const handleToggleBpUnknown = (checked) => {
    setBpUnknown(checked);
    if (checked) {
      setValue('systolicBP', '');
      setValue('diastolicBP', '');
    }
  };

  // Step navigation with validation
  const handleNext = async () => {
    let fieldsToValidate = [];
    if (currentStep === 1) {
      fieldsToValidate = ['age', 'heightCm', 'weightKg'];
    } else if (currentStep === 2) {
      if (assessmentMethod === 'standard' && !glucoseUnknown) {
        fieldsToValidate.push('glucose');
      }
      if (!bpUnknown) {
        // If user entered one of the BP numbers, validate both
        if (watchedSystolic || watchedDiastolic) {
          fieldsToValidate.push('systolicBP', 'diastolicBP');
        }
      }
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.error('Please check the highlighted fields and correct the information.');
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToStep = (stepNumber) => {
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmReset = () => {
    reset();
    setBmiResult(null);
    setGlucoseUnknown(false);
    setBpUnknown(false);
    setAssessmentMethod('standard');
    setCurrentStep(1);
    setResetModalOpen(false);
    toast.success('Form cleared.');
  };

  // Final submission on Step 3
  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Build clean payload without substituting zero for missing values
      const payload = {
        age: Number(data.age),
        gender: data.gender || 'Prefer not to say',
        heightCm: Number(data.heightCm),
        weightKg: Number(data.weightKg),
        assessmentMethod,
        // Do not invent missing values or silently substitute zero for unknown values:
        glucose:
          assessmentMethod === 'standard' && !glucoseUnknown && data.glucose
            ? Number(data.glucose)
            : null,
        glucoseUnit: data.glucoseUnit || 'mg/dL',
        systolicBP: !bpUnknown && data.systolicBP ? Number(data.systolicBP) : null,
        diastolicBP: !bpUnknown && data.diastolicBP ? Number(data.diastolicBP) : null,
        familyHistory: data.familyHistory,
        physicalActivity: data.physicalActivity,
      };

      const response = await predictionService.submitPrediction(payload);
      const assessmentData = response.data;

      toast.success('Assessment completed.');
      navigate(`/result/${assessmentData.id}`, { state: { assessment: assessmentData } });
    } catch {
      toast.error('We could not complete your assessment. Please check your answers and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepTitles = [
    { number: 1, title: 'About You', desc: 'Age, height, and weight' },
    { number: 2, title: 'Health Information', desc: 'Measurements and family history' },
    { number: 3, title: 'Review Your Answers', desc: 'Check your details before continuing' },
  ];

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Educational Notice Banner */}
      <div className="alert-banner info" role="region" aria-label="Educational Purpose Notice">
        <HelpCircle size={22} style={{ flexShrink: 0, marginTop: '2px', color: '#1D4ED8' }} aria-hidden="true" />
        <div>
          <strong style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.95rem' }}>
            Educational Health Assessment
          </strong>
          <span style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
            This step-by-step tool helps you explore common factors associated with type 2 diabetes. 
            It is for educational purposes only and cannot diagnose diabetes or replace clinical laboratory tests.
          </span>
        </div>
      </div>

      {/* Main Multi-Step Form Card */}
      <div className="card" style={{ padding: '2.5rem' }}>
        {/* Progress Indicator */}
        <div style={{ marginBottom: '2.5rem' }} role="region" aria-label="Assessment Progress">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              Step {currentStep} of 3 — {stepTitles[currentStep - 1].title}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              {Math.round((currentStep / 3) * 100)}% Complete
            </span>
          </div>

          {/* Visual Step Tracker */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
            }}
          >
            {stepTitles.map((step) => {
              const isCurrent = currentStep === step.number;
              const isPast = currentStep > step.number;
              return (
                <div
                  key={step.number}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                  }}
                >
                  <div
                    style={{
                      height: '6px',
                      borderRadius: '3px',
                      backgroundColor: isPast
                        ? 'var(--color-success)'
                        : isCurrent
                        ? 'var(--color-primary)'
                        : '#E2E8F0',
                      transition: 'background-color 0.25s ease',
                    }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    {isPast ? (
                      <CheckCircle2 size={14} color="var(--color-success)" aria-hidden="true" />
                    ) : (
                      <span
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          backgroundColor: isCurrent ? 'var(--color-primary)' : '#94A3B8',
                          color: '#FFFFFF',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {step.number}
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: isCurrent ? 700 : 500,
                        color: isCurrent ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                      }}
                    >
                      {step.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Multi-Step Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* ========================================================================= */}
          {/* STEP 1: ABOUT YOU                                                         */}
          {/* ========================================================================= */}
          {currentStep === 1 && (
            <div>
              <div
                style={{
                  marginBottom: '2rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--color-border-light)',
                }}
              >
                <h1 style={{ fontSize: '1.65rem', margin: 0 }}>Step 1: About You</h1>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginTop: '0.35rem' }}>
                  Please share your basic physical information. We use this to compute your Body Mass Index (BMI).
                </p>
              </div>

              {/* Assessment Method Choice */}
              <div
                style={{
                  marginBottom: '2rem',
                  padding: '1.25rem',
                  backgroundColor: '#F8FAFC',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                    color: 'var(--color-text)',
                  }}
                >
                  Choose Assessment Method
                </label>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                  Select the option that best matches the information you have available:
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  {/* Method 1: Standard Assessment */}
                  <label
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      border:
                        assessmentMethod === 'standard'
                          ? '2px solid var(--color-primary)'
                          : '1px solid var(--color-border)',
                      backgroundColor:
                        assessmentMethod === 'standard' ? 'var(--color-primary-light)' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div className="flex items-center gap-2" style={{ marginBottom: '0.35rem' }}>
                      <input
                        type="radio"
                        name="method"
                        checked={assessmentMethod === 'standard'}
                        onChange={() => setAssessmentMethod('standard')}
                        style={{ width: '1.1rem', height: '1.1rem', accentColor: 'var(--color-primary)' }}
                      />
                      <strong style={{ fontSize: '0.95rem', color: 'var(--color-text)' }}>
                        Standard Assessment
                      </strong>
                    </div>
                    <span style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)', paddingLeft: '1.6rem' }}>
                      Includes blood glucose and blood pressure if available.
                    </span>
                  </label>

                  {/* Method 2: Basic Lifestyle Assessment */}
                  <label
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      border:
                        assessmentMethod === 'basic'
                          ? '2px solid var(--color-primary)'
                          : '1px solid var(--color-border)',
                      backgroundColor:
                        assessmentMethod === 'basic' ? 'var(--color-primary-light)' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div className="flex items-center gap-2" style={{ marginBottom: '0.35rem' }}>
                      <input
                        type="radio"
                        name="method"
                        checked={assessmentMethod === 'basic'}
                        onChange={() => setAssessmentMethod('basic')}
                        style={{ width: '1.1rem', height: '1.1rem', accentColor: 'var(--color-primary)' }}
                      />
                      <strong style={{ fontSize: '0.95rem', color: 'var(--color-text)' }}>
                        Basic Assessment (No Lab Tests)
                      </strong>
                    </div>
                    <span style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)', paddingLeft: '1.6rem' }}>
                      For when you do not have recent blood test results.
                    </span>
                  </label>
                </div>
              </div>

              {/* Step 1 Form Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* 1. Age */}
                <div className="form-group">
                  <label className="form-label form-label-required" htmlFor="age" style={{ fontSize: '1rem' }}>
                    How old are you?
                  </label>
                  <span id="age-helper" className="form-helper" style={{ fontSize: '0.875rem' }}>
                    Your age in years.
                  </span>
                  <div className="input-wrapper" style={{ marginTop: '0.35rem' }}>
                    <input
                      id="age"
                      type="number"
                      aria-describedby="age-helper age-error"
                      className={`form-input ${errors.age ? 'has-error' : ''}`}
                      style={{ minHeight: '48px', fontSize: '1.05rem', padding: '0.75rem 1rem' }}
                      placeholder="e.g. 42"
                      {...register('age', {
                        required: 'Please enter your age.',
                        min: { value: 18, message: 'Please enter an age of 18 or older.' },
                        max: { value: 120, message: 'Please enter an age of 120 or younger.' },
                      })}
                    />
                  </div>
                  {errors.age && (
                    <span id="age-error" className="form-error" style={{ fontSize: '0.85rem' }}>
                      <AlertCircle size={16} aria-hidden="true" />
                      {errors.age.message}
                    </span>
                  )}
                </div>

                {/* 2. Height */}
                <div className="form-group">
                  <label className="form-label form-label-required" htmlFor="heightCm" style={{ fontSize: '1rem' }}>
                    What is your height?
                  </label>
                  <span id="height-helper" className="form-helper" style={{ fontSize: '0.875rem' }}>
                    Enter your height in centimetres.
                  </span>
                  <div className="input-wrapper" style={{ marginTop: '0.35rem' }}>
                    <input
                      id="heightCm"
                      type="number"
                      step="0.5"
                      aria-describedby="height-helper height-error"
                      className={`form-input ${errors.heightCm ? 'has-error' : ''}`}
                      style={{ minHeight: '48px', fontSize: '1.05rem', padding: '0.75rem 1rem' }}
                      placeholder="e.g. 175"
                      {...register('heightCm', {
                        required: 'Please enter your height in centimetres.',
                        min: { value: 50, message: 'Please enter a height of at least 50 cm.' },
                        max: { value: 260, message: 'Please enter a height under 260 cm.' },
                      })}
                    />
                  </div>
                  {errors.heightCm && (
                    <span id="height-error" className="form-error" style={{ fontSize: '0.85rem' }}>
                      <AlertCircle size={16} aria-hidden="true" />
                      {errors.heightCm.message}
                    </span>
                  )}
                </div>

                {/* 3. Weight */}
                <div className="form-group">
                  <label className="form-label form-label-required" htmlFor="weightKg" style={{ fontSize: '1rem' }}>
                    What is your weight?
                  </label>
                  <span id="weight-helper" className="form-helper" style={{ fontSize: '0.875rem' }}>
                    Enter your weight in kilograms.
                  </span>
                  <div className="input-wrapper" style={{ marginTop: '0.35rem' }}>
                    <input
                      id="weightKg"
                      type="number"
                      step="0.5"
                      aria-describedby="weight-helper weight-error"
                      className={`form-input ${errors.weightKg ? 'has-error' : ''}`}
                      style={{ minHeight: '48px', fontSize: '1.05rem', padding: '0.75rem 1rem' }}
                      placeholder="e.g. 78"
                      {...register('weightKg', {
                        required: 'Please enter your weight in kilograms.',
                        min: { value: 20, message: 'Please enter a weight of at least 20 kg.' },
                        max: { value: 350, message: 'Please enter a weight under 350 kg.' },
                      })}
                    />
                  </div>
                  {errors.weightKg && (
                    <span id="weight-error" className="form-error" style={{ fontSize: '0.85rem' }}>
                      <AlertCircle size={16} aria-hidden="true" />
                      {errors.weightKg.message}
                    </span>
                  )}
                </div>

                {/* Optional Sex / Gender */}
                <div className="form-group">
                  <label className="form-label" htmlFor="gender" style={{ fontSize: '1rem' }}>
                    Biological Sex <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>(Optional)</span>
                  </label>
                  <span id="gender-helper" className="form-helper" style={{ fontSize: '0.875rem' }}>
                    Some reference values differ slightly between biological sexes.
                  </span>
                  <div className="input-wrapper" style={{ marginTop: '0.35rem' }}>
                    <select
                      id="gender"
                      aria-describedby="gender-helper"
                      className="form-select"
                      style={{ minHeight: '48px', fontSize: '1rem' }}
                      {...register('gender')}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Automatic BMI Calculation Display */}
              <div
                style={{
                  marginTop: '2rem',
                  padding: '1.5rem',
                  backgroundColor: '#F8FAFC',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                }}
                role="region"
                aria-label="BMI Calculation"
              >
                <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem' }}>
                  <Scale size={20} color="var(--color-primary)" aria-hidden="true" />
                  <strong style={{ fontSize: '1rem' }}>Your Body Mass Index (BMI)</strong>
                  {bmiResult?.isValid && (
                    <span className={`badge ${bmiResult.badgeClass}`} style={{ marginLeft: 'auto' }}>
                      {bmiResult.category}
                    </span>
                  )}
                </div>

                {bmiResult?.isValid ? (
                  <div>
                    <div className="flex items-baseline gap-2" style={{ marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '2.25rem', fontWeight: 800, color: bmiResult.color }}>
                        {bmiResult.bmi}
                      </span>
                      <span style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>kg/m²</span>
                    </div>

                    {/* Simple plain English explanation required */}
                    <div
                      style={{
                        padding: '0.85rem 1rem',
                        backgroundColor: '#FFFFFF',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text)',
                        fontSize: '0.925rem',
                        lineHeight: 1.6,
                      }}
                    >
                      <p style={{ margin: 0 }}>
                        <strong>What this means:</strong> BMI is a calculation based on your height and weight. It is only one measure of health and cannot tell you whether you have diabetes.
                      </p>
                    </div>
                  </div>
                ) : (
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    Enter your height and weight above to automatically see your BMI.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: HEALTH INFORMATION                                                */}
          {/* ========================================================================= */}
          {currentStep === 2 && (
            <div>
              <div
                style={{
                  marginBottom: '2rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--color-border-light)',
                }}
              >
                <h1 style={{ fontSize: '1.65rem', margin: 0 }}>Step 2: Health Information</h1>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginTop: '0.35rem' }}>
                  {assessmentMethod === 'standard'
                    ? 'Enter recent measurements if you know them. If you do not have recent results, simply check the "I do not know" box.'
                    : 'Questions relevant to your chosen assessment method. No laboratory tests are required.'}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* 1. Blood Glucose (Only shown if standard method is selected) */}
                {assessmentMethod === 'standard' && (
                  <div
                    style={{
                      padding: '1.5rem',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <div style={{ marginBottom: '0.75rem' }}>
                      <label
                        className={`form-label ${!glucoseUnknown ? 'form-label-required' : ''}`}
                        htmlFor="glucose"
                        style={{ fontSize: '1.05rem' }}
                      >
                        Fasting Blood Glucose
                      </label>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0' }}>
                        Blood glucose is the amount of sugar in your blood. If you have a recent test result, enter the value shown on your report.
                      </p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '0.2rem 0' }}>
                        <strong>Where to find this:</strong> Look on recent blood test paperwork or lab reports from your doctor (typically labeled "Fasting Blood Glucose" or "Fasting Plasma Glucose").
                      </p>
                    </div>

                    {/* Unknown checkbox */}
                    <label
                      className="checkbox-label"
                      style={{
                        marginBottom: '1rem',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#F8FAFC',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={glucoseUnknown}
                        onChange={(e) => handleToggleGlucoseUnknown(e.target.checked)}
                      />
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-text)' }}>
                        I do not know my blood glucose or haven't had a recent test
                      </span>
                    </label>

                    {!glucoseUnknown && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label className="form-label" htmlFor="glucose" style={{ fontSize: '0.875rem' }}>
                            Test Value (e.g. 95)
                          </label>
                          <input
                            id="glucose"
                            type="number"
                            step="1"
                            className={`form-input ${errors.glucose ? 'has-error' : ''}`}
                            style={{ minHeight: '48px', fontSize: '1rem' }}
                            placeholder="e.g. 95"
                            {...register('glucose', {
                              required: !glucoseUnknown ? 'Please enter your blood glucose reading, or check the box above.' : false,
                              min: { value: 40, message: 'Please enter a value of at least 40.' },
                              max: { value: 500, message: 'Please enter a value under 500.' },
                            })}
                          />
                          {errors.glucose && (
                            <span className="form-error" style={{ fontSize: '0.85rem' }}>
                              <AlertCircle size={16} aria-hidden="true" />
                              {errors.glucose.message}
                            </span>
                          )}
                        </div>

                        <div className="form-group" style={{ margin: 0 }}>
                          <label className="form-label" htmlFor="glucoseUnit" style={{ fontSize: '0.875rem' }}>
                            Measurement Unit
                          </label>
                          <select
                            id="glucoseUnit"
                            className="form-select"
                            style={{ minHeight: '48px', fontSize: '1rem' }}
                            {...register('glucoseUnit')}
                          >
                            <option value="mg/dL">mg/dL (Milligrams per deciliter)</option>
                            <option value="mmol/L">mmol/L (Millimoles per liter)</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Blood Pressure (Optional or unknown toggle) */}
                <div
                  style={{
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <div style={{ marginBottom: '0.75rem' }}>
                    <label className="form-label" htmlFor="systolicBP" style={{ fontSize: '1.05rem' }}>
                      Blood Pressure (Optional)
                    </label>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0' }}>
                      Blood pressure measures the pressure in your arteries as your heart pumps. It is recorded as two numbers, such as 120 over 80 mmHg.
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '0.2rem 0' }}>
                      <strong>Where to find this:</strong> Look on a medical visit summary, a pharmacy blood pressure kiosk reading, or a home blood pressure cuff.
                    </p>
                  </div>

                  {/* Unknown checkbox */}
                  <label
                    className="checkbox-label"
                    style={{
                      marginBottom: '1rem',
                      padding: '0.5rem 0.75rem',
                      backgroundColor: '#F8FAFC',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={bpUnknown}
                      onChange={(e) => handleToggleBpUnknown(e.target.checked)}
                    />
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text)' }}>
                      I do not know my blood pressure reading
                    </span>
                  </label>

                  {!bpUnknown && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label" htmlFor="systolicBP" style={{ fontSize: '0.875rem' }}>
                          Systolic (Top number) in mmHg
                        </label>
                        <input
                          id="systolicBP"
                          type="number"
                          className={`form-input ${errors.systolicBP ? 'has-error' : ''}`}
                          style={{ minHeight: '48px', fontSize: '1rem' }}
                          placeholder="e.g. 120"
                          {...register('systolicBP', {
                            min: { value: 60, message: 'Please enter a systolic value ≥ 60.' },
                            max: { value: 250, message: 'Please enter a systolic value ≤ 250.' },
                          })}
                        />
                        {errors.systolicBP && (
                          <span className="form-error" style={{ fontSize: '0.85rem' }}>
                            <AlertCircle size={16} aria-hidden="true" />
                            {errors.systolicBP.message}
                          </span>
                        )}
                      </div>

                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label" htmlFor="diastolicBP" style={{ fontSize: '0.875rem' }}>
                          Diastolic (Bottom number) in mmHg
                        </label>
                        <input
                          id="diastolicBP"
                          type="number"
                          className={`form-input ${errors.diastolicBP ? 'has-error' : ''}`}
                          style={{ minHeight: '48px', fontSize: '1rem' }}
                          placeholder="e.g. 80"
                          {...register('diastolicBP', {
                            min: { value: 40, message: 'Please enter a diastolic value ≥ 40.' },
                            max: { value: 160, message: 'Please enter a diastolic value ≤ 160.' },
                          })}
                        />
                        {errors.diastolicBP && (
                          <span className="form-error" style={{ fontSize: '0.85rem' }}>
                            <AlertCircle size={16} aria-hidden="true" />
                            {errors.diastolicBP.message}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Family History */}
                <div
                  style={{
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <label className="form-label" htmlFor="familyHistory" style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>
                    Family History of Diabetes
                  </label>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 1rem' }}>
                    Has an immediate biological family member (parent, brother, or sister) been diagnosed with diabetes?
                  </p>

                  <select
                    id="familyHistory"
                    className="form-select"
                    style={{ minHeight: '48px', fontSize: '1rem' }}
                    {...register('familyHistory')}
                  >
                    <option value="no">No known first-degree family history</option>
                    <option value="yes">Yes (A parent, brother, or sister has diabetes)</option>
                    <option value="unknown">I am not sure / Do not know</option>
                  </select>
                </div>

                {/* 4. Physical Activity */}
                <div
                  style={{
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <label className="form-label" htmlFor="physicalActivity" style={{ fontSize: '1.05rem', marginBottom: '0.25rem' }}>
                    Physical Activity in a Typical Week
                  </label>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 1rem' }}>
                    How much moderate physical activity (such as brisk walking, cycling, or active recreation) do you usually do?
                  </p>

                  <select
                    id="physicalActivity"
                    className="form-select"
                    style={{ minHeight: '48px', fontSize: '1rem' }}
                    {...register('physicalActivity')}
                  >
                    <option value="active">Active (150 minutes or more per week)</option>
                    <option value="moderate">Moderate (1 to 2 days per week)</option>
                    <option value="sedentary">Lower activity (Little or no regular planned exercise)</option>
                    <option value="unknown">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: REVIEW YOUR ANSWERS                                               */}
          {/* ========================================================================= */}
          {currentStep === 3 && (
            <div>
              <div
                style={{
                  marginBottom: '1.5rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--color-border-light)',
                }}
              >
                <h1 style={{ fontSize: '1.65rem', margin: 0 }}>Step 3: Review Your Answers</h1>
                <p
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                    marginTop: '0.5rem',
                  }}
                >
                  Please check your answers before continuing.
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 0' }}>
                  You can click the "Edit" button beside any section to go back and update information.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Section A: Basic Information */}
                <div
                  style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.5rem',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <div className="flex items-center justify-between" style={{ marginBottom: '1rem', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '0.75rem' }}>
                    <div className="flex items-center gap-2">
                      <Heart size={18} color="var(--color-primary)" aria-hidden="true" />
                      <h2 style={{ fontSize: '1.15rem', margin: 0 }}>About You</h2>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => handleJumpToStep(1)}
                      aria-label="Edit About You section"
                    >
                      <Edit2 size={14} aria-hidden="true" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.95rem' }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block' }}>Age</span>
                      <strong>{watchedAge ? `${watchedAge} years` : 'Not provided'}</strong>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block' }}>Height</span>
                      <strong>{watchedHeight ? `${watchedHeight} cm` : 'Not provided'}</strong>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block' }}>Weight</span>
                      <strong>{watchedWeight ? `${watchedWeight} kg` : 'Not provided'}</strong>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block' }}>Biological Sex</span>
                      <strong>{watchedGender || 'Not provided'}</strong>
                    </div>

                    <div style={{ gridColumn: '1 / -1', background: '#F8FAFC', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', marginTop: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block' }}>Calculated BMI</span>
                      <strong style={{ fontSize: '1.1rem', color: bmiResult?.color || 'var(--color-text)' }}>
                        {bmiResult?.isValid ? `${bmiResult.bmi} kg/m² (${bmiResult.category})` : 'Unable to calculate'}
                      </strong>
                      <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                        BMI is a calculation based on your height and weight. It is only one measure of health and cannot tell you whether you have diabetes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section B: Health Measurements */}
                <div
                  style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.5rem',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <div className="flex items-center justify-between" style={{ marginBottom: '1rem', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '0.75rem' }}>
                    <div className="flex items-center gap-2">
                      <Activity size={18} color="var(--color-secondary)" aria-hidden="true" />
                      <h2 style={{ fontSize: '1.15rem', margin: 0 }}>Health Information</h2>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => handleJumpToStep(2)}
                      aria-label="Edit Health Information section"
                    >
                      <Edit2 size={14} aria-hidden="true" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', fontSize: '0.95rem' }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block' }}>Assessment Method</span>
                      <strong>{assessmentMethod === 'standard' ? 'Standard Assessment' : 'Basic Assessment (No Lab Tests)'}</strong>
                    </div>

                    {assessmentMethod === 'standard' && (
                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block' }}>Fasting Blood Glucose</span>
                        <strong>
                          {glucoseUnknown || !watchedGlucose
                            ? 'Not provided / Unknown'
                            : `${watchedGlucose} ${watchedGlucoseUnit}`}
                        </strong>
                      </div>
                    )}

                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block' }}>Blood Pressure</span>
                      <strong>
                        {bpUnknown || (!watchedSystolic && !watchedDiastolic)
                          ? 'Not provided / Unknown'
                          : `${watchedSystolic || '--'}/${watchedDiastolic || '--'} mmHg`}
                      </strong>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block' }}>Family History of Diabetes</span>
                      <strong>
                        {watchedFamilyHistory === 'yes'
                          ? 'Yes (Immediate family)'
                          : watchedFamilyHistory === 'no'
                          ? 'No known family history'
                          : 'Not sure / Unknown'}
                      </strong>
                    </div>

                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', display: 'block' }}>Physical Activity Level</span>
                      <strong>
                        {watchedActivity === 'active'
                          ? 'Active (150+ min/week)'
                          : watchedActivity === 'moderate'
                          ? 'Moderate (1-2 days/week)'
                          : watchedActivity === 'sedentary'
                          ? 'Lower activity'
                          : 'Not specified'}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Important Notice Before Submitting */}
                <div
                  style={{
                    padding: '1.25rem',
                    backgroundColor: '#EFF6FF',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #BFDBFE',
                    fontSize: '0.9rem',
                    color: '#1E40AF',
                    lineHeight: 1.6,
                  }}
                >
                  <p style={{ margin: 0 }}>
                    <strong>Note:</strong> When you submit, your answers will be reviewed against health reference guidelines. 
                    This tool does not diagnose any disease. Please speak with a healthcare professional regarding any health questions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* FORM NAVIGATION BUTTONS                                                   */}
          {/* ========================================================================= */}
          <div
            style={{
              marginTop: '2.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            {/* Reset Form Button */}
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setResetModalOpen(true)}
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <RotateCcw size={16} aria-hidden="true" />
              <span>Clear Form</span>
            </button>

            {/* Previous and Next / Submit Buttons */}
            <div className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
              {currentStep > 1 && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handlePrev}
                  style={{ minHeight: '48px', padding: '0.75rem 1.25rem' }}
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                  <span>{currentStep === 3 ? 'Go Back' : 'Previous'}</span>
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                  style={{ minHeight: '48px', padding: '0.75rem 1.5rem', fontSize: '1rem' }}
                >
                  <span>{currentStep === 1 ? 'Continue to Health Information' : 'Continue to Review'}</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  style={{ minHeight: '48px', padding: '0.75rem 1.75rem', fontSize: '1rem' }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="spinner spinner-sm spinner-white" aria-hidden="true" />
                      <span>Submitting Assessment...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send size={18} aria-hidden="true" />
                      <span>Submit Assessment</span>
                    </div>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Confirmation Modal Before Discarding Entered Data */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="Clear Entered Answers?"
        footer={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setResetModalOpen(false)}>
              Keep Answers
            </button>
            <button type="button" className="btn btn-danger" onClick={handleConfirmReset}>
              Yes, Clear Form
            </button>
          </>
        }
      >
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
          Are you sure you want to clear the form? All answers entered in this assessment will be reset.
        </p>
      </Modal>
    </div>
  );
};

export default Prediction;
