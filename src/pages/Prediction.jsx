import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Scale,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Info,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { calculateBMI } from '../utils/bmiCalculator';
import { predictionService } from '../services/predictionService';
import { Modal } from '../components/Modal';
import toast from 'react-hot-toast';

export const Prediction = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [bmiResult, setBmiResult] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      age: '',
      gender: 'Male',
      heightCm: '',
      weightKg: '',
      glucose: '',
      glucoseUnit: 'mg/dL',
      systolicBP: '',
      diastolicBP: '',
      hba1c: '',
      familyHistory: 'false',
      physicalActivity: 'Moderate (1-2 days/week)',
      dietaryQuality: 'Balanced',
      smoker: 'false',
    },
    mode: 'onChange',
  });

  const watchedHeight = watch('heightCm');
  const watchedWeight = watch('weightKg');

  // Dynamically calculate BMI whenever height or weight updates
  useEffect(() => {
    if (watchedHeight && watchedWeight) {
      const calc = calculateBMI(watchedHeight, watchedWeight);
      setBmiResult(calc);
    } else {
      setBmiResult(null);
    }
  }, [watchedHeight, watchedWeight]);

  // Step validation before proceeding
  const handleNext = async () => {
    let fieldsToValidate = [];
    if (currentStep === 1) {
      fieldsToValidate = ['age', 'gender', 'heightCm', 'weightKg'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['glucose', 'systolicBP', 'diastolicBP'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.error('Please resolve validation errors before continuing.');
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmReset = () => {
    reset();
    setBmiResult(null);
    setCurrentStep(1);
    setResetModalOpen(false);
    toast.success('Form cleared.');
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        age: Number(data.age),
        heightCm: Number(data.heightCm),
        weightKg: Number(data.weightKg),
        glucose: Number(data.glucose),
        systolicBP: Number(data.systolicBP),
        diastolicBP: Number(data.diastolicBP),
        hba1c: data.hba1c ? Number(data.hba1c) : null,
        familyHistory: data.familyHistory === 'true',
        smoker: data.smoker === 'true',
      };

      const response = await predictionService.submitPrediction(payload);
      const assessmentData = response.data;

      toast.success('Assessment evaluated successfully!');
      navigate(`/result/${assessmentData.id}`, { state: { assessment: assessmentData } });
    } catch (err) {
      toast.error(err.message || 'Failed to submit assessment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'Basic Biometrics', desc: 'Age, Height, Weight & BMI' },
    { number: 2, title: 'Health Measurements', desc: 'Glucose & Blood Pressure' },
    { number: 3, title: 'Medical History', desc: 'Family & Lifestyle Factors' },
  ];

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Educational Notice Banner */}
      <div className="alert-banner info">
        <Info size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong style={{ display: 'block', marginBottom: '0.2rem' }}>
            Educational Assessment & Backend Integration Ready
          </strong>
          <span>
            This tool evaluates your biometrics against standard clinical reference guidelines. 
            All submissions prepare parameters for the backend prediction pipeline (<code>POST /api/predictions</code>).
          </span>
        </div>
      </div>

      {/* Main Multi-Step Form Card */}
      <div className="card" style={{ padding: '2.5rem' }}>
        {/* Step Progress Bar */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            {/* Connecting line */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '10%',
                right: '10%',
                height: '3px',
                backgroundColor: '#E2E8F0',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                  backgroundColor: 'var(--color-primary)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>

            {steps.map((s) => {
              const isCompleted = currentStep > s.number;
              const isCurrent = currentStep === s.number;

              return (
                <div
                  key={s.number}
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: isCurrent
                        ? 'var(--color-primary)'
                        : isCompleted
                        ? 'var(--color-success)'
                        : '#FFFFFF',
                      color: isCurrent || isCompleted ? '#FFFFFF' : 'var(--color-text-secondary)',
                      border: isCurrent || isCompleted ? 'none' : '2px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      boxShadow: isCurrent ? '0 0 0 4px rgba(37, 99, 235, 0.15)' : 'none',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={20} /> : s.number}
                  </div>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: isCurrent ? 700 : 500,
                      color: isCurrent ? 'var(--color-primary)' : 'var(--color-text)',
                      marginTop: '0.5rem',
                    }}
                  >
                    {s.title}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{s.desc}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* STEP 1: BASIC INFORMATION */}
          {currentStep === 1 && (
            <div>
              <div style={{ marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border-light)' }}>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Step 1: Basic Biometrics & Body Mass Index</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
                  Please enter your biological age, height, and weight to calculate your BMI.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                {/* Age */}
                <div className="form-group">
                  <label className="form-label form-label-required" htmlFor="age">
                    Age (Years)
                  </label>
                  <input
                    id="age"
                    type="number"
                    className={`form-input ${errors.age ? 'has-error' : ''}`}
                    placeholder="e.g. 42"
                    {...register('age', {
                      required: 'Age is required',
                      min: { value: 18, message: 'Assessment requires age ≥ 18' },
                      max: { value: 120, message: 'Please enter a valid age ≤ 120' },
                    })}
                  />
                  {errors.age && (
                    <span className="form-error">
                      <AlertCircle size={14} />
                      {errors.age.message}
                    </span>
                  )}
                </div>

                {/* Biological Gender */}
                <div className="form-group">
                  <label className="form-label form-label-required" htmlFor="gender">
                    Biological Sex
                  </label>
                  <select id="gender" className="form-select" {...register('gender')}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other / Prefer not to say</option>
                  </select>
                </div>

                {/* Height */}
                <div className="form-group">
                  <label className="form-label form-label-required" htmlFor="heightCm">
                    Height (centimeters)
                  </label>
                  <input
                    id="heightCm"
                    type="number"
                    step="0.5"
                    className={`form-input ${errors.heightCm ? 'has-error' : ''}`}
                    placeholder="e.g. 175"
                    {...register('heightCm', {
                      required: 'Height in cm is required',
                      min: { value: 50, message: 'Minimum height is 50 cm' },
                      max: { value: 260, message: 'Maximum height is 260 cm' },
                    })}
                  />
                  {errors.heightCm && (
                    <span className="form-error">
                      <AlertCircle size={14} />
                      {errors.heightCm.message}
                    </span>
                  )}
                </div>

                {/* Weight */}
                <div className="form-group">
                  <label className="form-label form-label-required" htmlFor="weightKg">
                    Weight (kilograms)
                  </label>
                  <input
                    id="weightKg"
                    type="number"
                    step="0.5"
                    className={`form-input ${errors.weightKg ? 'has-error' : ''}`}
                    placeholder="e.g. 78"
                    {...register('weightKg', {
                      required: 'Weight in kg is required',
                      min: { value: 20, message: 'Minimum weight is 20 kg' },
                      max: { value: 350, message: 'Maximum weight is 350 kg' },
                    })}
                  />
                  {errors.weightKg && (
                    <span className="form-error">
                      <AlertCircle size={14} />
                      {errors.weightKg.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Dynamic Live BMI Calculator Display */}
              <div
                style={{
                  marginTop: '1.5rem',
                  padding: '1.25rem',
                  backgroundColor: '#F8FAFC',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
                  <div className="flex items-center gap-2">
                    <Scale size={20} color="var(--color-primary)" />
                    <strong style={{ fontSize: '0.95rem' }}>Automated Body Mass Index (BMI) Calculation</strong>
                  </div>
                  {bmiResult?.isValid && (
                    <span className={`badge ${bmiResult.badgeClass}`}>
                      {bmiResult.category}
                    </span>
                  )}
                </div>

                {bmiResult?.isValid ? (
                  <div>
                    <div className="flex items-baseline gap-3" style={{ marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '2rem', fontWeight: 800, color: bmiResult.color }}>
                        {bmiResult.bmi}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>kg/m²</span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                        (Ideal reference weight range: {bmiResult.healthyWeightRange})
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                      {bmiResult.description}
                    </p>
                    <div style={{ marginTop: '0.75rem', fontSize: '0.775rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border-light)', paddingTop: '0.5rem' }}>
                      <ShieldAlert size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                      {bmiResult.disclaimer}
                    </div>
                  </div>
                ) : (
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                    Enter your height and weight above to automatically compute your BMI and view educational guidelines.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: HEALTH MEASUREMENTS */}
          {currentStep === 2 && (
            <div>
              <div style={{ marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border-light)' }}>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Step 2: Clinical Health Measurements</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
                  Provide your most recent fasting blood glucose and resting blood pressure readings.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                {/* Fasting Blood Glucose */}
                <div className="form-group">
                  <label className="form-label form-label-required" htmlFor="glucose">
                    Fasting Blood Glucose ({watch('glucoseUnit')})
                  </label>
                  <input
                    id="glucose"
                    type="number"
                    step="1"
                    className={`form-input ${errors.glucose ? 'has-error' : ''}`}
                    placeholder="e.g. 95"
                    {...register('glucose', {
                      required: 'Fasting glucose reading is required',
                      min: { value: 50, message: 'Value must be ≥ 50 mg/dL' },
                      max: { value: 400, message: 'Value must be ≤ 400 mg/dL' },
                    })}
                  />
                  {errors.glucose ? (
                    <span className="form-error">
                      <AlertCircle size={14} />
                      {errors.glucose.message}
                    </span>
                  ) : (
                    <span className="form-helper">ADA Normal Fasting: 70 - 99 mg/dL</span>
                  )}
                </div>

                {/* Measurement Units */}
                <div className="form-group">
                  <label className="form-label" htmlFor="glucoseUnit">
                    Measurement Units
                  </label>
                  <select id="glucoseUnit" className="form-select" {...register('glucoseUnit')}>
                    <option value="mg/dL">mg/dL (Milligrams per deciliter)</option>
                    <option value="mmol/L">mmol/L (Standard International)</option>
                  </select>
                </div>

                {/* Systolic BP */}
                <div className="form-group">
                  <label className="form-label form-label-required" htmlFor="systolicBP">
                    Systolic Blood Pressure (mmHg)
                  </label>
                  <input
                    id="systolicBP"
                    type="number"
                    className={`form-input ${errors.systolicBP ? 'has-error' : ''}`}
                    placeholder="e.g. 120"
                    {...register('systolicBP', {
                      required: 'Systolic blood pressure is required',
                      min: { value: 70, message: 'Systolic BP must be ≥ 70 mmHg' },
                      max: { value: 230, message: 'Systolic BP must be ≤ 230 mmHg' },
                    })}
                  />
                  {errors.systolicBP ? (
                    <span className="form-error">
                      <AlertCircle size={14} />
                      {errors.systolicBP.message}
                    </span>
                  ) : (
                    <span className="form-helper">Top number (Standard: &lt; 120 mmHg)</span>
                  )}
                </div>

                {/* Diastolic BP */}
                <div className="form-group">
                  <label className="form-label form-label-required" htmlFor="diastolicBP">
                    Diastolic Blood Pressure (mmHg)
                  </label>
                  <input
                    id="diastolicBP"
                    type="number"
                    className={`form-input ${errors.diastolicBP ? 'has-error' : ''}`}
                    placeholder="e.g. 80"
                    {...register('diastolicBP', {
                      required: 'Diastolic blood pressure is required',
                      min: { value: 40, message: 'Diastolic BP must be ≥ 40 mmHg' },
                      max: { value: 140, message: 'Diastolic BP must be ≤ 140 mmHg' },
                    })}
                  />
                  {errors.diastolicBP ? (
                    <span className="form-error">
                      <AlertCircle size={14} />
                      {errors.diastolicBP.message}
                    </span>
                  ) : (
                    <span className="form-helper">Bottom number (Standard: &lt; 80 mmHg)</span>
                  )}
                </div>

                {/* Optional HbA1c */}
                <div className="form-group">
                  <label className="form-label" htmlFor="hba1c">
                    HbA1c Glycated Hemoglobin % (Optional)
                  </label>
                  <input
                    id="hba1c"
                    type="number"
                    step="0.1"
                    className={`form-input ${errors.hba1c ? 'has-error' : ''}`}
                    placeholder="e.g. 5.4"
                    {...register('hba1c', {
                      min: { value: 3.5, message: 'HbA1c must be ≥ 3.5%' },
                      max: { value: 16.0, message: 'HbA1c must be ≤ 16.0%' },
                    })}
                  />
                  {errors.hba1c ? (
                    <span className="form-error">
                      <AlertCircle size={14} />
                      {errors.hba1c.message}
                    </span>
                  ) : (
                    <span className="form-helper">Normal reference: &lt; 5.7%</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: MEDICAL HISTORY & LIFESTYLE */}
          {currentStep === 3 && (
            <div>
              <div style={{ marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border-light)' }}>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Step 3: Medical History & Lifestyle Patterns</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
                  Relevant behavioral and genetic factors associated with metabolic health.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                {/* Family History */}
                <div className="form-group">
                  <label className="form-label form-label-required" htmlFor="familyHistory">
                    Family History of Diabetes
                  </label>
                  <select id="familyHistory" className="form-select" {...register('familyHistory')}>
                    <option value="false">No known first-degree family history</option>
                    <option value="true">Yes (Parent, sibling, or child diagnosed)</option>
                  </select>
                  <span className="form-helper">Genetic background can influence metabolic predisposition.</span>
                </div>

                {/* Physical Activity */}
                <div className="form-group">
                  <label className="form-label form-label-required" htmlFor="physicalActivity">
                    Physical Activity Level
                  </label>
                  <select id="physicalActivity" className="form-select" {...register('physicalActivity')}>
                    <option value="Active (3-5 days/week)">Active (At least 150 min/week)</option>
                    <option value="Moderate (1-2 days/week)">Moderate (1-2 days per week)</option>
                    <option value="Sedentary">Sedentary (Little or no planned exercise)</option>
                  </select>
                </div>

                {/* Dietary Pattern */}
                <div className="form-group">
                  <label className="form-label form-label-required" htmlFor="dietaryQuality">
                    Dietary Habits
                  </label>
                  <select id="dietaryQuality" className="form-select" {...register('dietaryQuality')}>
                    <option value="Balanced">Balanced (Whole grains, vegetables, lean proteins)</option>
                    <option value="Moderate">Moderate (Occasional sweetened foods/drinks)</option>
                    <option value="High Refined Carbs">High refined carbs / frequent sweetened beverages</option>
                  </select>
                </div>

                {/* Smoking Status */}
                <div className="form-group">
                  <label className="form-label form-label-required" htmlFor="smoker">
                    Tobacco / Smoking Status
                  </label>
                  <select id="smoker" className="form-select" {...register('smoker')}>
                    <option value="false">Non-smoker</option>
                    <option value="true">Current or frequent smoker</option>
                  </select>
                </div>
              </div>

              {/* Final Medical Disclaimer Box */}
              <div
                style={{
                  marginTop: '1.5rem',
                  padding: '1.25rem',
                  backgroundColor: '#FFFBEB',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid #FDE68A',
                  color: '#92400E',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                }}
              >
                <div className="flex items-center gap-2" style={{ marginBottom: '0.35rem' }}>
                  <ShieldAlert size={18} color="#D97706" />
                  <strong>Educational Scope Confirmation</strong>
                </div>
                <span>
                  This assessment is for educational purposes only and is not a medical diagnosis. 
                  Consult a qualified healthcare professional for appropriate laboratory testing and clinical interpretation.
                </span>
              </div>
            </div>
          )}

          {/* Step Form Navigation Actions */}
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
            {/* Reset Button */}
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setResetModalOpen(true)}
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <RotateCcw size={16} />
              <span>Reset Form</span>
            </button>

            {/* Previous & Next/Submit Buttons */}
            <div className="flex items-center gap-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handlePrev}
                >
                  <ArrowLeft size={16} />
                  <span>Previous</span>
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  <span>Continue to Step {currentStep + 1}</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-secondary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="spinner spinner-sm spinner-white" />
                      <span>Evaluating Assessment...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} />
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
        title="Discard Entered Assessment Data?"
        footer={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setResetModalOpen(false)}>
              Keep Editing
            </button>
            <button type="button" className="btn btn-danger" onClick={handleConfirmReset}>
              Yes, Discard All
            </button>
          </>
        }
      >
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
          Are you sure you want to reset the form? All biometric inputs, measurements, and calculated values will be discarded.
        </p>
      </Modal>
    </div>
  );
};

export default Prediction;
