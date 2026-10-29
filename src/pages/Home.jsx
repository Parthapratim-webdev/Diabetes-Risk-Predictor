import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Activity,
  BarChart3,
  BookOpen,
  Lock,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Info,
  Clock,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const Home = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const faqs = [
    {
      q: 'What is Diabetes Risk Predictor?',
      a: 'Diabetes Risk Predictor is an educational healthcare platform designed for academic demonstration and health literacy. It empowers users to explore how vital biometric factors like fasting glucose, blood pressure, BMI, and family history interrelate in evaluating potential diabetes risk indicators.',
    },
    {
      q: 'How does the assessment work?',
      a: 'The assessment collects standard biometric information (age, height, weight, glucose, blood pressure) in an intuitive 3-step form. It evaluates these values against recognized clinical thresholds (such as ADA fasting glucose categories) and provides an educational risk factor breakdown.',
    },
    {
      q: 'Is the result a medical diagnosis?',
      a: 'No. This application is strictly an educational tool and does NOT provide medical diagnosis or treatment plans. An accurate diagnosis of pre-diabetes or diabetes requires laboratory-administered clinical testing (e.g., HbA1c, Fasting Plasma Glucose, or Oral Glucose Tolerance Test) performed and evaluated by qualified healthcare providers.',
    },
    {
      q: 'Can I view previous assessments?',
      a: 'Yes! When signed in, your previous assessments are accessible in your personal dashboard and history log. You can review past submissions, observe longitudinal changes, download summary reports, and print documentation.',
    },
    {
      q: 'How is my information handled?',
      a: 'In this frontend implementation, assessment inputs are processed in-session for demonstration purposes and are never transmitted to unauthorized third parties or sold. The application is architected with strict privacy principles and prepared for secure JWT/HTTP-only cookie backend sessions.',
    },
    {
      q: 'Should I consult a healthcare professional?',
      a: 'Yes. If your assessment highlights elevated biometric indicators, or if you experience common diabetes symptoms (such as excessive thirst, frequent urination, fatigue, or unexplained weight loss), you should promptly schedule a consultation with a certified doctor.',
    },
  ];

  const features = [
    {
      icon: Activity,
      title: 'Educational Health Assessment',
      desc: 'Step-by-step biometric evaluation assessing BMI, fasting glucose, and cardiovascular vitals against standard educational baselines.',
    },
    {
      icon: BarChart3,
      title: 'Personalized Dashboard',
      desc: 'Clean interactive dashboard visualizing your assessment trends, biometrics over time, and risk category distributions.',
    },
    {
      icon: Clock,
      title: 'Assessment History',
      desc: 'Comprehensive historical records with search, filtering, and detailed record breakdown for every assessment.',
    },
    {
      icon: TrendingUp,
      title: 'Measurement Visualizations',
      desc: 'Responsive Chart.js visual analytics that illuminate key health indicators and longitudinal changes.',
    },
    {
      icon: BookOpen,
      title: 'Health Education Resources',
      desc: 'Evidence-based guides explaining diabetes types, clinical tests (HbA1c, OGTT), nutrition, and prevention habits.',
    },
    {
      icon: Lock,
      title: 'Secure Authentication',
      desc: 'Modern auth architecture designed for Node.js / Express with tokenized sessions and client-side route protection.',
    },
    {
      icon: Smartphone,
      title: 'Fully Responsive Design',
      desc: 'Flawlessly optimized for desktops, laptops, tablets, and smartphones with clean touch-friendly controls.',
    },
    {
      icon: CheckCircle2,
      title: 'Understandable Results',
      desc: 'Clear, transparent explanations without confusing medical jargon or invented risk algorithms.',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* HERO SECTION */}
        <section
          style={{
            background: 'linear-gradient(180deg, #EFF6FF 0%, #F5F8FC 100%)',
            padding: '5rem 0 6rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Background Circles */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-5%',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(13,148,136,0.12) 0%, rgba(255,255,255,0) 70%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-15%',
              left: '-8%',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, rgba(255,255,255,0) 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                alignItems: 'center',
                gap: '4rem',
              }}
            >
              {/* Left Column: Headlines & CTAs */}
              <div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    padding: '0.4rem 0.9rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(37, 99, 235, 0.2)',
                  }}
                >
                  <ShieldCheck size={16} />
                  <span>Educational Health Assessment Platform</span>
                </div>

                <h1
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
                    fontWeight: 800,
                    lineHeight: 1.15,
                    marginBottom: '1.25rem',
                    color: '#0F172A',
                  }}
                >
                  Understand Your Health.{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Take Control of Your Future.
                  </span>
                </h1>

                <p
                  style={{
                    fontSize: '1.125rem',
                    lineHeight: 1.6,
                    color: 'var(--color-text-secondary)',
                    marginBottom: '2rem',
                    maxWidth: '560px',
                  }}
                >
                  Explore diabetes risk factors through an educational assessment experience designed to help you better understand important health indicators.
                </p>

                <div className="flex items-center gap-4" style={{ flexWrap: 'wrap' }}>
                  <Link to="/prediction" className="btn btn-primary btn-lg">
                    <span>Start Assessment</span>
                    <ArrowRight size={18} />
                  </Link>
                  <a href="#features" className="btn btn-outline btn-lg">
                    <span>Explore Features</span>
                  </a>
                </div>

                {/* Key Pillars */}
                <div
                  style={{
                    marginTop: '2.5rem',
                    display: 'flex',
                    gap: '1.75rem',
                    flexWrap: 'wrap',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--color-border)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} color="var(--color-success)" />
                    <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text)' }}>
                      No invasive sign-up required
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} color="var(--color-success)" />
                    <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text)' }}>
                      Evidence-based references
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} color="var(--color-success)" />
                    <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-text)' }}>
                      Interactive analytics
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Dashboard Mockup & Floating Cards */}
              <div style={{ position: 'relative' }}>
                {/* Main Hero Card Container */}
                <div
                  className="card"
                  style={{
                    padding: '2rem',
                    background: '#FFFFFF',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.12)',
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    position: 'relative',
                  }}
                >
                  <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border-light)' }}>
                    <div className="flex items-center gap-3">
                      <div className="avatar" style={{ width: '42px', height: '42px', background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                        <Stethoscope size={22} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1rem' }}>Clinical Biometrics Summary</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Demonstration Assessment View</span>
                      </div>
                    </div>
                    <span className="badge badge-success">Evaluated</span>
                  </div>

                  {/* Sample Vitals Preview Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>FASTING GLUCOSE</span>
                      <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0F172A', marginTop: '0.2rem' }}>92 <span style={{ fontSize: '0.8rem', fontWeight: 400 }}>mg/dL</span></div>
                      <span className="badge badge-success" style={{ marginTop: '0.4rem', fontSize: '0.65rem' }}>Normal Range</span>
                    </div>

                    <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>CALCULATED BMI</span>
                      <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0F172A', marginTop: '0.2rem' }}>22.4 <span style={{ fontSize: '0.8rem', fontWeight: 400 }}>kg/m²</span></div>
                      <span className="badge badge-success" style={{ marginTop: '0.4rem', fontSize: '0.65rem' }}>Healthy Range</span>
                    </div>

                    <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>BLOOD PRESSURE</span>
                      <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0F172A', marginTop: '0.2rem' }}>118/76 <span style={{ fontSize: '0.8rem', fontWeight: 400 }}>mmHg</span></div>
                      <span className="badge badge-success" style={{ marginTop: '0.4rem', fontSize: '0.65rem' }}>Optimal</span>
                    </div>

                    <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>PHYSICAL ACTIVITY</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginTop: '0.4rem' }}>4 days/wk</div>
                      <span className="badge badge-secondary" style={{ marginTop: '0.4rem', fontSize: '0.65rem' }}>Active Profile</span>
                    </div>
                  </div>

                  {/* Educational Breakdown Snippet */}
                  <div style={{ padding: '0.85rem 1rem', background: 'var(--color-secondary-light)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(13,148,136,0.2)' }}>
                    <div className="flex items-center gap-2" style={{ color: 'var(--color-secondary)' }}>
                      <Zap size={16} />
                      <strong style={{ fontSize: '0.85rem' }}>Educational Assessment Note</strong>
                    </div>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#134E4A' }}>
                      Key markers reflect consistent exercise and balanced lifestyle indicators. Review your personalized report in the dashboard.
                    </p>
                  </div>
                </div>

                {/* Floating UI Badge 1 */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    background: '#FFFFFF',
                    padding: '0.75rem 1.25rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    animation: 'floatSlow 4s ease-in-out infinite alternate',
                  }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A' }}>
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>Clinical Screening</span>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--color-text)' }}>ADA Standard Reference</strong>
                  </div>
                </div>

                {/* Floating UI Badge 2 */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-25px',
                    left: '-20px',
                    background: '#FFFFFF',
                    padding: '0.75rem 1.25rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}>
                    <Activity size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>BMI Dynamic Formula</span>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--color-text)' }}>Auto-calculated Metric</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" style={{ padding: '6rem 0', backgroundColor: '#FFFFFF' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 4rem' }}>
              <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>Step-by-Step Experience</span>
              <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>How the Assessment Works</h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
                Three straightforward steps designed to help you explore and understand how biometric factors relate to diabetes risk awareness.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {/* Step 1 */}
              <div className="card card-hover" style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                  1
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Enter Your Information</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                  Provide basic biometrics including age, height, and weight. The integrated calculator automatically generates your BMI with educational reference boundaries.
                </p>
              </div>

              {/* Step 2 */}
              <div className="card card-hover" style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--color-secondary-light)', color: 'var(--color-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                  2
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Review Your Assessment</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                  Inspect how individual readings—fasting blood glucose, blood pressure, and family medical history—impact overall diabetes risk factors.
                </p>
              </div>

              {/* Step 3 */}
              <div className="card card-hover" style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem', marginBottom: '1.25rem' }}>
                  3
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Learn About Your Health</h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
                  Discover actionable preventative lifestyle guidance, recommended clinical screenings (such as HbA1c), and when to consult a certified doctor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID SECTION */}
        <section id="features" style={{ padding: '6rem 0', backgroundColor: 'var(--color-bg)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 4rem' }}>
              <span className="badge badge-secondary" style={{ marginBottom: '0.75rem' }}>Full-Featured Application</span>
              <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>Designed for Health Awareness & Research</h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
                Built with modern React architecture, responsive visualizations, and clean components ready for full-stack integration.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.5rem' }}>
              {features.map((feat, index) => {
                const Icon = feat.icon;
                return (
                  <div key={index} className="card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      <Icon size={22} />
                    </div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{feat.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, flex: 1 }}>
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* HEALTH EDUCATION OVERVIEW SECTION */}
        <section style={{ padding: '6rem 0', backgroundColor: '#FFFFFF' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>Clinical Knowledge</span>
                <h2 style={{ fontSize: '2.25rem', marginBottom: '1.25rem' }}>Understanding Diabetes & Risk Factors</h2>
                <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                  Diabetes mellitus is a chronic metabolic condition characterized by elevated blood glucose levels resulting from defects in insulin secretion, insulin action, or both.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-primary)' }}>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Type 2 Diabetes & Insulin Resistance</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                      The most common form, where cells fail to respond effectively to insulin. Frequently associated with lifestyle factors, excess visceral adiposity, and genetic predisposition.
                    </p>
                  </div>

                  <div style={{ padding: '1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-secondary)' }}>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Pre-Diabetes: The Window of Opportunity</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                      Blood sugar levels are higher than normal (fasting glucose 100-125 mg/dL) but not yet reaching diagnostic thresholds. Early lifestyle changes can reverse or delay progression.
                    </p>
                  </div>

                  <div style={{ padding: '1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #F59E0B' }}>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>When to Seek Professional Advice</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                      If you notice frequent urination, unquenchable thirst, blurred vision, slow healing cuts, or extreme fatigue, schedule formal laboratory testing with your doctor.
                    </p>
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <Link to="/health-insights" className="btn btn-secondary">
                    <span>Explore Full Health Insights Library</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Educational Infographic Card */}
              <div
                className="card"
                style={{
                  background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                  color: '#FFFFFF',
                  padding: '2.5rem',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-xl)',
                }}
              >
                <h3 style={{ color: '#FFFFFF', fontSize: '1.35rem', marginBottom: '1.5rem' }}>Standard Fasting Glucose Ranges</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.06)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="flex items-center justify-between" style={{ marginBottom: '0.25rem' }}>
                      <strong style={{ color: '#4ADE80' }}>Normal Healthy Range</strong>
                      <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>70 – 99 mg/dL</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#94A3B8' }}>
                      Optimal glucose regulation with efficient cellular insulin uptake.
                    </p>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.06)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="flex items-center justify-between" style={{ marginBottom: '0.25rem' }}>
                      <strong style={{ color: '#FBBF24' }}>Impaired Fasting Glucose (Pre-Diabetes)</strong>
                      <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>100 – 125 mg/dL</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#94A3B8' }}>
                      Elevated risk state. Lifestyle modifications strongly advised.
                    </p>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.06)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="flex items-center justify-between" style={{ marginBottom: '0.25rem' }}>
                      <strong style={{ color: '#F87171' }}>Clinical Diagnostic Threshold</strong>
                      <span className="badge badge-danger" style={{ fontSize: '0.7rem' }}>≥ 126 mg/dL</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#94A3B8' }}>
                      Requires repeat confirmatory testing and clinical oversight by a physician.
                    </p>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.775rem', color: '#94A3B8' }}>
                  <Info size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                  Source: American Diabetes Association (ADA) Standards of Care in Diabetes.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section style={{ padding: '6rem 0', backgroundColor: 'var(--color-bg)' }}>
          <div className="container" style={{ maxWidth: '820px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>Common Inquiries</span>
              <h2 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>Frequently Asked Questions</h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
                Clarifications regarding the scope, data handling, and purpose of the Diabetes Risk Predictor project.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="card"
                    style={{
                      padding: '1.25rem 1.5rem',
                      cursor: 'pointer',
                      border: isOpen ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                      transition: 'all var(--transition-fast)',
                    }}
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="flex items-center justify-between">
                      <h4 style={{ fontSize: '1.05rem', color: isOpen ? 'var(--color-primary)' : 'var(--color-text)', margin: 0 }}>
                        {faq.q}
                      </h4>
                      <div style={{ color: isOpen ? 'var(--color-primary)' : 'var(--color-text-secondary)', marginLeft: '1rem' }}>
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                    {isOpen && (
                      <p style={{ marginTop: '0.85rem', fontSize: '0.925rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section style={{ padding: '5rem 0', backgroundColor: '#FFFFFF', borderTop: '1px solid var(--color-border)' }}>
          <div className="container">
            <div
              style={{
                background: 'linear-gradient(135deg, #1E40AF 0%, #0F766E 100%)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: '4rem 2rem',
                textAlign: 'center',
                boxShadow: 'var(--shadow-xl)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', marginBottom: '1rem' }}>
                Begin Your Health Assessment Journey
              </h2>
              <p style={{ color: '#E0F2FE', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
                Spend two minutes exploring your biometrics, calculating your BMI, and reviewing evidence-based diabetes risk indicators.
              </p>
              <div className="flex justify-center items-center gap-4" style={{ flexWrap: 'wrap' }}>
                <Link
                  to="/prediction"
                  className="btn btn-lg"
                  style={{ backgroundColor: '#FFFFFF', color: 'var(--color-primary)', fontWeight: 700 }}
                >
                  Start Assessment Now
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/health-insights"
                  className="btn btn-outline btn-lg"
                  style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.4)' }}
                >
                  Learn Health Insights
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
