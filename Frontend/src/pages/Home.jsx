import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Activity,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Heart,
  Clock,
  Sparkles,
  Check,
  Lock,
  Compass,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const Home = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const steps = [
    {
      number: '01',
      tag: 'Step 1 • Health Profile',
      title: 'Tell us about your health',
      desc: 'Answer a few straightforward questions about your age, measurements (height, weight), blood glucose, and daily lifestyle habits.',
      badge: '2 mins',
    },
    {
      number: '02',
      tag: 'Step 2 • Risk Analysis',
      title: 'Review your assessment',
      desc: 'See how your answers connect with recognized metabolic health indicators and clinical risk factors in clear, accessible language.',
      badge: 'Instant Results',
    },
    {
      number: '03',
      tag: 'Step 3 • Action Plan',
      title: 'Discover next steps',
      desc: 'Explore approachable, evidence-based lifestyle recommendations and understand when it is recommended to speak with your physician.',
      badge: 'Doctor Checklist',
    },
  ];

  const helpCards = [
    {
      icon: BookOpen,
      tag: 'Clinical Education',
      title: 'Understand diabetes & insulin',
      desc: 'Learn the fundamentals of blood glucose regulation, insulin resistance, and what distinguishes prediabetes from type 2 diabetes.',
      link: '/learn-about-diabetes',
      accent: 'linear-gradient(135deg, #2563EB, #3B82F6)',
    },
    {
      icon: Activity,
      tag: 'Interactive Tool',
      title: 'Explore common risk factors',
      desc: 'Discover how biomarkers like family history, sedentary habits, BMI, and fasting glucose collectively influence your metabolic health.',
      link: '/prediction',
      accent: 'linear-gradient(135deg, #0D9488, #14B8A6)',
    },
    {
      icon: Heart,
      tag: 'Daily Wellness',
      title: 'Build sustainable habits',
      desc: 'Explore nutrition approaches, manageable daily movement targets, and proactive wellness practices to maintain healthy glucose levels.',
      link: '/learn-about-diabetes',
      accent: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
    },
    {
      icon: ShieldCheck,
      tag: 'Verified Standards',
      title: 'Reliable, evidence-based info',
      desc: 'Access healthcare literacy guidance grounded in recognized clinical guidelines from the American Diabetes Association (ADA) and WHO.',
      link: '/about',
      accent: 'linear-gradient(135deg, #10B981, #059669)',
    },
  ];

  const stats = [
    { label: 'Clinical Indicators', value: '8+', sub: 'ADA / WHO risk markers' },
    { label: 'Evaluation Time', value: '~2 min', sub: 'Non-invasive & confidential' },
    { label: 'Educational Focus', value: '100%', sub: 'No medical jargon' },
    { label: 'Security & Privacy', value: 'Encrypted', sub: 'Never shared with 3rd parties' },
  ];

  const faqs = [
    {
      q: 'Is this assessment a medical diagnosis?',
      a: 'No. This platform is strictly an educational tool designed to promote health literacy and proactive lifestyle habits. It helps you explore recognized risk indicators, but cannot replace laboratory testing or diagnose any condition. Always consult a qualified physician for formal medical testing and guidance.',
    },
    {
      q: 'How long does the assessment take?',
      a: 'It typically takes only 2 to 3 minutes. The questions are straightforward and focus on basic health markers like age, height, weight, physical activity, and recent blood glucose if known.',
    },
    {
      q: 'What if I do not know my fasting blood sugar or blood pressure?',
      a: 'You can easily toggle "I don\'t know this measurement" during the assessment. Our system supports both a comprehensive standard evaluation (with lab tests) and a lifestyle-first basic evaluation without inventing missing values.',
    },
    {
      q: 'Is my personal information secure?',
      a: 'Yes. Your responses are handled confidentially and are used solely within your session. We do not sell, distribute, or share your entries with any unauthorized third parties or advertisers.',
    },
    {
      q: 'Can I print or share my results with my doctor?',
      a: 'Absolutely! Every assessment includes a dedicated "Doctor Discussion Summary" report that you can easily print or download as a text summary to review during your next doctor appointment.',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* ====================================================================
            HERO SECTION - GOOGLE STITCH ELEVATED CANVAS
            ==================================================================== */}
        <section
          style={{
            position: 'relative',
            padding: '5.5rem 0 6rem',
            overflow: 'hidden',
            background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37, 99, 235, 0.09) 0%, rgba(248, 250, 253, 0) 100%), var(--color-bg)',
          }}
        >
          {/* Subtle Ambient Radial Lighting */}
          <div
            style={{
              position: 'absolute',
              top: '5%',
              right: '-8%',
              width: '560px',
              height: '560px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(13, 148, 136, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
              pointerEvents: 'none',
              filter: 'blur(40px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-10%',
              left: '-10%',
              width: '640px',
              height: '640px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
              pointerEvents: 'none',
              filter: 'blur(50px)',
            }}
          />

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                alignItems: 'center',
                gap: '4rem',
              }}
            >
              {/* Left Column: Hero Typography & Primary Actions */}
              <div>
                {/* Stitch Status Chip */}
                <div
                  className="stitch-pill stitch-glass"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid rgba(37, 99, 235, 0.2)',
                    boxShadow: 'var(--shadow-xs)',
                    color: 'var(--color-primary)',
                    marginBottom: '1.75rem',
                    padding: '0.45rem 1rem',
                  }}
                >
                  <span className="stitch-pulse-dot" style={{ backgroundColor: '#10B981' }} />
                  <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Metabolic Health Assessment</span>
                  <span style={{ color: 'var(--color-text-muted)' }}>•</span>
                  <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.825rem', fontWeight: 500 }}>
                    Evidence-Based Literacy
                  </span>
                </div>

                <h1
                  style={{
                    fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)',
                    fontWeight: 800,
                    lineHeight: 1.15,
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.03em',
                    color: '#0F172A',
                  }}
                >
                  Take a Proactive Step Towards{' '}
                  <span className="stitch-gradient-text">Better Metabolic Health</span>
                </h1>

                <p
                  style={{
                    fontSize: '1.15rem',
                    lineHeight: 1.7,
                    color: 'var(--color-text-secondary)',
                    marginBottom: '2.25rem',
                    maxWidth: '560px',
                  }}
                >
                  Evaluate your diabetes risk indicators in under 3 minutes. Receive clear, supportive feedback, personalized lifestyle guidance, and a doctor-ready checklist.
                </p>

                {/* Primary CTA Buttons */}
                <div className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
                  <Link to="/prediction" className="btn btn-primary btn-lg" style={{ gap: '0.65rem' }}>
                    <span>Check Risk Factors</span>
                    <ArrowRight size={18} />
                  </Link>
                  <Link to="/learn-about-diabetes" className="btn btn-outline btn-lg">
                    <span>Learn About Diabetes</span>
                  </Link>
                </div>

                {/* Trust Points */}
                <div
                  style={{
                    marginTop: '2.5rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '1.25rem',
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.875rem',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} color="var(--color-success)" />
                    <span>Free & Confidential</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} color="var(--color-success)" />
                    <span>ADA Guideline Informed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} color="var(--color-success)" />
                    <span>Instant Visual Scorecard</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Google Stitch Live Mockup Card */}
              <div style={{ position: 'relative' }}>
                <div
                  className="stitch-card stitch-glass"
                  style={{
                    padding: '2rem',
                    borderRadius: 'var(--radius-2xl)',
                    border: '1px solid rgba(226, 232, 240, 0.85)',
                    boxShadow: 'var(--shadow-stitch-card-hover)',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  }}
                >
                  {/* Mockup Card Header */}
                  <div
                    className="flex items-center justify-between"
                    style={{
                      paddingBottom: '1.25rem',
                      borderBottom: '1px solid var(--color-border-light)',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: 'var(--radius-md)',
                          background: 'linear-gradient(135deg, #1A73E8, #0D9488)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF',
                          boxShadow: '0 4px 10px rgba(26, 115, 232, 0.25)',
                        }}
                      >
                        <Activity size={20} />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Interactive Health Scan</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                          Personalized Health Overview
                        </span>
                      </div>
                    </div>
                    <span className="badge badge-success">
                      <span className="stitch-pulse-dot" style={{ backgroundColor: '#16A34A' }} />
                      Optimal Range
                    </span>
                  </div>

                  {/* Sample Interactive Visual Meter */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)' }}>
                        Metabolic Risk Probability
                      </span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-success)' }}>
                        14% • Low Risk
                      </span>
                    </div>
                    <div className="stitch-risk-meter" style={{ margin: '0.35rem 0' }}>
                      <div className="stitch-meter-track" style={{ height: '10px' }}>
                        <div
                          className="stitch-meter-fill"
                          style={{
                            width: '28%',
                            background: 'linear-gradient(90deg, #16A34A 0%, #22C55E 100%)',
                          }}
                        />
                      </div>
                      <div className="stitch-meter-labels">
                        <span>Normal (0–30%)</span>
                        <span>Borderline (31–60%)</span>
                        <span>High (61–100%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Mock Health Indicators Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div
                      style={{
                        padding: '0.85rem 1rem',
                        backgroundColor: '#F8FAFD',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border-light)',
                      }}
                    >
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', fontWeight: 600 }}>
                        BODY MASS INDEX
                      </span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text)' }}>
                        22.4 kg/m²
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600, display: 'block' }}>
                        Healthy Weight
                      </span>
                    </div>

                    <div
                      style={{
                        padding: '0.85rem 1rem',
                        backgroundColor: '#F8FAFD',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border-light)',
                      }}
                    >
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', fontWeight: 600 }}>
                        FASTING GLUCOSE
                      </span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text)' }}>
                        92 mg/dL
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600, display: 'block' }}>
                        Normal Range
                      </span>
                    </div>
                  </div>

                  {/* Feature Check List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <div className="flex items-center gap-2.5" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={12} color="#16A34A" />
                      </div>
                      <span>Evaluates lifestyle, physical activity & vitals</span>
                    </div>
                    <div className="flex items-center gap-2.5" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={12} color="#16A34A" />
                      </div>
                      <span>Generates printable physician discussion checklist</span>
                    </div>
                  </div>

                  {/* Card Footer Ticker */}
                  <div
                    className="flex justify-between items-center"
                    style={{
                      marginTop: '1.5rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--color-border-light)',
                      fontSize: '0.8rem',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} color="var(--color-primary)" /> Average time: 2 mins
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Lock size={14} color="var(--color-secondary)" /> 100% Private
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div
              style={{
                marginTop: '4.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {stats.map((item, idx) => (
                <div
                  key={idx}
                  className="stitch-card"
                  style={{
                    padding: '1.35rem 1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                  }}
                >
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.04em' }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>
                    {item.value}
                  </span>
                  <span style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)' }}>
                    {item.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            THREE SIMPLE STEPS - STITCH CARDS WITH CONNECTOR FLOW
            ==================================================================== */}
        <section style={{ padding: '5.5rem 0', backgroundColor: '#FFFFFF' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 4rem' }}>
              <span className="stitch-pill badge-primary" style={{ marginBottom: '1rem' }}>
                <Sparkles size={14} /> How It Works
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', marginBottom: '0.85rem' }}>
                Three Steps to Clarity
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                A supportive, straightforward pathway to evaluate health markers without confusing medical jargon.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
                gap: '2rem',
                position: 'relative',
              }}
            >
              {steps.map((s, index) => (
                <div
                  key={index}
                  className="card card-hover"
                  style={{
                    padding: '2.25rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--color-border)',
                    position: 'relative',
                  }}
                >
                  <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: 'var(--radius-md)',
                        background: 'linear-gradient(135deg, var(--color-primary-light), #DBEAFE)',
                        color: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '1.25rem',
                        boxShadow: 'var(--shadow-xs)',
                      }}
                    >
                      {s.number}
                    </div>
                    <span className="badge badge-primary">{s.badge}</span>
                  </div>

                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
                    {s.tag}
                  </span>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.85rem', color: 'var(--color-text)' }}>
                    {s.title}
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====================================================================
            HEALTH TOPICS & RESOURCES
            ==================================================================== */}
        <section style={{ padding: '5.5rem 0', backgroundColor: 'var(--color-bg)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 4rem' }}>
              <span className="stitch-pill badge-secondary" style={{ marginBottom: '1rem' }}>
                <Compass size={14} /> Knowledge & Prevention
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', marginBottom: '0.85rem' }}>
                Empowering Health Literacy
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Understand the science of glucose management and adopt practical daily wellness habits.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
                gap: '1.75rem',
              }}
            >
              {helpCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <Link
                    key={index}
                    to={card.link}
                    className="card card-hover"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '2.25rem 1.85rem',
                      textDecoration: 'none',
                      color: 'inherit',
                      borderRadius: 'var(--radius-xl)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-md)',
                        background: card.accent,
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.35rem',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <span style={{ fontSize: '0.775rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
                      {card.tag}
                    </span>

                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-text)' }}>
                      {card.title}
                    </h3>

                    <p style={{ fontSize: '0.925rem', color: 'var(--color-text-secondary)', lineHeight: 1.65, flex: 1, margin: 0 }}>
                      {card.desc}
                    </p>

                    <div
                      className="flex items-center gap-1.5"
                      style={{
                        marginTop: '1.5rem',
                        color: 'var(--color-primary)',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                      }}
                    >
                      <span>Explore Topic</span>
                      <ArrowRight size={15} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====================================================================
            FREQUENTLY ASKED QUESTIONS - MODERN ACCORDION
            ==================================================================== */}
        <section style={{ padding: '5.5rem 0', backgroundColor: '#FFFFFF' }}>
          <div className="container" style={{ maxWidth: '820px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span className="stitch-pill badge-primary" style={{ marginBottom: '1rem' }}>
                Questions & Answers
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', marginBottom: '0.85rem' }}>
                Frequently Asked Questions
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)' }}>
                Clear explanations about our educational methodology, privacy standards, and clinical sources.
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
                      padding: '1.35rem 1.65rem',
                      cursor: 'pointer',
                      borderRadius: 'var(--radius-lg)',
                      border: isOpen ? '1.5px solid var(--color-primary)' : '1px solid var(--color-border)',
                      backgroundColor: isOpen ? '#FAFCFF' : '#FFFFFF',
                      transition: 'all var(--transition-fast)',
                    }}
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="flex items-center justify-between">
                      <h4
                        style={{
                          fontSize: '1.075rem',
                          color: isOpen ? 'var(--color-primary)' : 'var(--color-text)',
                          fontWeight: 700,
                          margin: 0,
                        }}
                      >
                        {faq.q}
                      </h4>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: isOpen ? 'var(--color-primary-light)' : 'var(--color-bg)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isOpen ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                          flexShrink: 0,
                          marginLeft: '1rem',
                        }}
                      >
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>
                    {isOpen && (
                      <p
                        style={{
                          marginTop: '1rem',
                          fontSize: '0.95rem',
                          lineHeight: 1.7,
                          color: 'var(--color-text-secondary)',
                          margin: '1rem 0 0',
                          borderTop: '1px solid var(--color-border-light)',
                          paddingTop: '0.85rem',
                        }}
                      >
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====================================================================
            CALL TO ACTION BANNER - STITCH GRADIENT ACCENT
            ==================================================================== */}
        <section style={{ padding: '5.5rem 0', backgroundColor: 'var(--color-bg)' }}>
          <div className="container">
            <div
              style={{
                background: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 50%, #0F766E 100%)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-2xl)',
                padding: '4.5rem 2.5rem',
                textAlign: 'center',
                boxShadow: '0 20px 50px -10px rgba(30, 58, 138, 0.35)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-30%',
                  right: '-10%',
                  width: '400px',
                  height: '400px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
                  pointerEvents: 'none',
                }}
              />

              <span
                className="stitch-pill"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  marginBottom: '1.25rem',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                }}
              >
                Start Free Assessment
              </span>

              <h2
                style={{
                  color: '#FFFFFF',
                  fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                  fontWeight: 800,
                  marginBottom: '1.25rem',
                  letterSpacing: '-0.025em',
                }}
              >
                Know Your Numbers. Empower Your Health.
              </h2>

              <p
                style={{
                  color: '#E0F2FE',
                  fontSize: '1.15rem',
                  maxWidth: '640px',
                  margin: '0 auto 2.75rem',
                  lineHeight: 1.7,
                }}
              >
                Take the 2-minute assessment today to evaluate your metabolic risk indicators and discover simple, positive lifestyle choices.
              </p>

              <div className="flex justify-center items-center gap-4" style={{ flexWrap: 'wrap' }}>
                <Link
                  to="/prediction"
                  className="btn btn-lg"
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: '#1E40AF',
                    fontWeight: 700,
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <span>Begin Risk Check</span>
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/learn-about-diabetes"
                  className="btn btn-outline btn-lg"
                  style={{
                    color: '#FFFFFF',
                    borderColor: 'rgba(255, 255, 255, 0.45)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  }}
                >
                  Learn About Diabetes
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
