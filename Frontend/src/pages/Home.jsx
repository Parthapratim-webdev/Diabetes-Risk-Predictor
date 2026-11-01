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
      number: '1',
      title: 'Tell us about your health.',
      desc: 'Answer a few straightforward questions about your age, height, weight, and daily lifestyle habits.',
    },
    {
      number: '2',
      title: 'Review your assessment.',
      desc: 'See how your answers connect with recognized metabolic health indicators in clear, simple language.',
    },
    {
      number: '3',
      title: 'Learn about possible next steps.',
      desc: 'Discover practical lifestyle guidance and understand when it is recommended to speak with a healthcare provider.',
    },
  ];

  const helpCards = [
    {
      icon: BookOpen,
      title: 'Understand diabetes.',
      desc: 'Learn the basics of how insulin and blood sugar work, and what distinguishes prediabetes from type 2 diabetes.',
      link: '/learn-about-diabetes',
    },
    {
      icon: Activity,
      title: 'Explore common risk factors.',
      desc: 'Discover how factors like family history, physical activity, and blood glucose levels affect overall risk.',
      link: '/prediction',
    },
    {
      icon: Heart,
      title: 'Learn about healthy habits.',
      desc: 'Explore approachable ideas for balanced nutrition, physical activity, and sustainable daily wellness.',
      link: '/learn-about-diabetes',
    },
    {
      icon: ShieldCheck,
      title: 'Find reliable health information.',
      desc: 'Access evidence-based educational guidance informed by public health standards from the ADA and WHO.',
      link: '/about',
    },
  ];

  const faqs = [
    {
      q: 'Is this assessment a medical diagnosis?',
      a: 'No. This platform is strictly an educational tool designed for health literacy. It helps you explore recognized risk indicators, but cannot diagnose any medical condition. Always consult a qualified physician or healthcare professional for laboratory testing and formal medical advice.',
    },
    {
      q: 'How long does the assessment take?',
      a: 'It typically takes only 2 to 3 minutes. The questions are straightforward and focus on basic health markers like height, weight, and general activity.',
    },
    {
      q: 'Is my personal information secure?',
      a: 'Yes. Your responses are handled confidentially and are used solely within this educational session. We do not sell, distribute, or share your entries with any unauthorized third parties.',
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
            padding: '5rem 0 5.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Background Accents */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-5%',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(13,148,136,0.1) 0%, rgba(255,255,255,0) 70%)',
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
              background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, rgba(255,255,255,0) 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                alignItems: 'center',
                gap: '3.5rem',
              }}
            >
              {/* Left Column: Headline, Subtitle, Actions, Reassurance */}
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
                  <span>Educational Health Literacy</span>
                </div>

                <h1
                  style={{
                    fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
                    fontWeight: 800,
                    lineHeight: 1.2,
                    marginBottom: '1.25rem',
                    color: '#0F172A',
                  }}
                >
                  Take a Simple Step Towards Better Health
                </h1>

                <p
                  style={{
                    fontSize: '1.125rem',
                    lineHeight: 1.65,
                    color: 'var(--color-text-secondary)',
                    marginBottom: '2rem',
                    maxWidth: '560px',
                  }}
                >
                  Answer a few questions about your health to explore factors associated with type 2 diabetes. Learn what your answers may mean and when to seek medical advice.
                </p>

                {/* Buttons */}
                <div className="flex items-center gap-4" style={{ flexWrap: 'wrap' }}>
                  <Link to="/prediction" className="btn btn-primary btn-lg">
                    <span>Get Started</span>
                    <ArrowRight size={18} />
                  </Link>
                  <Link to="/learn-about-diabetes" className="btn btn-outline btn-lg">
                    <span>Learn About Diabetes</span>
                  </Link>
                </div>

                {/* Small Reassurance Message */}
                <div
                  style={{
                    marginTop: '2rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.6rem 1rem',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)',
                    fontSize: '0.9rem',
                    color: 'var(--color-text)',
                    fontWeight: 500,
                  }}
                >
                  <CheckCircle2 size={18} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                  <span>Easy to use • Clear explanations • Your health matters</span>
                </div>
              </div>

              {/* Right Column: Clean, Friendly Preview Card */}
              <div style={{ position: 'relative' }}>
                <div
                  className="card"
                  style={{
                    padding: '2.25rem',
                    background: '#FFFFFF',
                    borderRadius: 'var(--radius-xl)',
                    boxShadow: '0 20px 40px -12px rgba(15, 23, 42, 0.08)',
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                  }}
                >
                  <div className="flex items-center gap-3" style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border-light)' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--color-primary-light)',
                        color: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Heart size={22} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600 }}>What You'll Explore</h4>
                      <span style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)' }}>Quick & Non-Invasive</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                      <CheckCircle2 size={18} color="var(--color-success)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-text)' }}>Basic measurements (height, weight, age)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                      <CheckCircle2 size={18} color="var(--color-success)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-text)' }}>Everyday habits and activity levels</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                      <CheckCircle2 size={18} color="var(--color-success)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-text)' }}>Clear, easy-to-read feedback</span>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: '1.5rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--color-border-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.825rem',
                      color: 'var(--color-text-secondary)',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                    }}
                  >
                    <span className="flex items-center gap-1.5">
                      <Clock size={15} color="var(--color-primary)" /> Takes 2–3 minutes
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck size={15} color="var(--color-secondary)" /> 100% Confidential
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THREE SIMPLE STEPS SECTION */}
        <section style={{ padding: '5rem 0', backgroundColor: '#FFFFFF' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
              <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>How It Works</span>
              <h2 style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>Three Simple Steps</h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
                A straightforward, supportive way to explore your health indicators without complex medical terms.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {steps.map((s, index) => (
                <div key={index} className="card card-hover" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-primary-light)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1.25rem',
                      marginBottom: '1.25rem',
                    }}
                  >
                    {s.number}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{s.title}</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW CAN WE HELP YOU? SECTION */}
        <section style={{ padding: '5rem 0', backgroundColor: 'var(--color-bg)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem' }}>
              <span className="badge badge-secondary" style={{ marginBottom: '0.75rem' }}>Support & Resources</span>
              <h2 style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>How Can We Help You?</h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
                Helpful educational tools designed to keep you informed, confident, and proactive.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
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
                      padding: '2rem',
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-primary-light)',
                        color: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.25rem',
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.65rem', color: 'var(--color-text)' }}>
                      {card.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, flex: 1, margin: 0 }}>
                      {card.desc}
                    </p>
                    <div
                      className="flex items-center gap-1.5"
                      style={{ marginTop: '1.25rem', color: 'var(--color-primary)', fontSize: '0.875rem', fontWeight: 600 }}
                    >
                      <span>Explore topic</span>
                      <ArrowRight size={14} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section style={{ padding: '5rem 0', backgroundColor: '#FFFFFF' }}>
          <div className="container" style={{ maxWidth: '780px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>Common Questions</span>
              <h2 style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>Frequently Asked Questions</h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>
                Clear answers to help you understand what this platform provides.
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
                      <p style={{ marginTop: '0.85rem', fontSize: '0.925rem', lineHeight: 1.65, color: 'var(--color-text-secondary)', margin: '0.85rem 0 0' }}>
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
        <section style={{ padding: '5rem 0', backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
          <div className="container">
            <div
              style={{
                background: 'linear-gradient(135deg, #1E40AF 0%, #0F766E 100%)',
                color: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                padding: '4rem 2rem',
                textAlign: 'center',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', marginBottom: '1rem' }}>
                Take a Simple Step Towards Better Health
              </h2>
              <p style={{ color: '#E0F2FE', fontSize: '1.1rem', maxWidth: '620px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
                Answer a few quick questions to learn more about your health markers and discover positive, sustainable habits.
              </p>
              <div className="flex justify-center items-center gap-4" style={{ flexWrap: 'wrap' }}>
                <Link
                  to="/prediction"
                  className="btn btn-lg"
                  style={{ backgroundColor: '#FFFFFF', color: 'var(--color-primary)', fontWeight: 700 }}
                >
                  Get Started
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/learn-about-diabetes"
                  className="btn btn-outline btn-lg"
                  style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.4)' }}
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
