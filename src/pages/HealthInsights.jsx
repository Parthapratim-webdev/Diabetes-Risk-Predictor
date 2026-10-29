import React from 'react';
import {
  Activity,
  Apple,
  Dumbbell,
  ExternalLink,
  Info,
  CheckCircle2,
  FileCheck2,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const HealthInsights = () => {
  const diabetesTypes = [
    {
      title: 'Type 2 Diabetes',
      badge: 'Most Prevalent (90-95%)',
      badgeClass: 'badge-primary',
      description:
        'Occurs when body cells develop resistance to insulin, and the pancreas progressively cannot produce sufficient insulin to overcome this resistance.',
      indicators: ['Gradual onset', 'Insulin resistance', 'Visceral adiposity association', 'Genetic predisposition'],
    },
    {
      title: 'Prediabetes',
      badge: 'Reversible Window',
      badgeClass: 'badge-warning',
      description:
        'Blood glucose levels are elevated above normal (100–125 mg/dL fasting), but below the diagnostic threshold for diabetes. Represents a crucial opportunity for lifestyle interventions.',
      indicators: ['Fasting Glucose: 100-125 mg/dL', 'HbA1c: 5.7% - 6.4%', 'Often asymptomatic'],
    },
    {
      title: 'Type 1 Diabetes',
      badge: 'Autoimmune',
      badgeClass: 'badge-secondary',
      description:
        'An autoimmune condition in which the immune system mistakenly destroys insulin-producing beta cells in the pancreatic islets of Langerhans, requiring lifelong insulin therapy.',
      indicators: ['Rapid onset in childhood/young adult', 'Absolute insulin deficiency', 'Requires external insulin'],
    },
    {
      title: 'Gestational Diabetes',
      badge: 'Pregnancy-Related',
      badgeClass: 'badge-neutral',
      description:
        'Develops during pregnancy due to hormonal changes that cause insulin resistance. Typically resolves postpartum, but elevates subsequent lifetime risk for Type 2 diabetes.',
      indicators: ['Screened between weeks 24–28', 'Postpartum follow-up recommended'],
    },
  ];

  const clinicalScreenings = [
    {
      name: 'Fasting Plasma Glucose (FPG)',
      sample: 'Venous Blood Draw (after 8-hour fast)',
      ranges: [
        { label: 'Normal', value: '< 100 mg/dL (5.6 mmol/L)', color: '#16A34A' },
        { label: 'Prediabetes', value: '100 – 125 mg/dL (5.6 - 6.9 mmol/L)', color: '#D97706' },
        { label: 'Diabetes threshold', value: '≥ 126 mg/dL (7.0 mmol/L)', color: '#DC2626' },
      ],
      description: 'Standard initial biochemical screening test measuring baseline circulating blood sugar.',
    },
    {
      name: 'Glycated Hemoglobin (HbA1c)',
      sample: 'Blood test (No fasting strictly required)',
      ranges: [
        { label: 'Normal', value: '< 5.7% (39 mmol/mol)', color: '#16A34A' },
        { label: 'Prediabetes', value: '5.7% – 6.4% (39 - 47 mmol/mol)', color: '#D97706' },
        { label: 'Diabetes threshold', value: '≥ 6.5% (48 mmol/mol)', color: '#DC2626' },
      ],
      description: 'Reflects average blood glucose exposure over the preceding 2 to 3 months by assessing sugar bound to hemoglobin.',
    },
    {
      name: 'Oral Glucose Tolerance Test (OGTT)',
      sample: 'Fasting draw followed by 75g glucose drink & 2-hour draw',
      ranges: [
        { label: 'Normal', value: '< 140 mg/dL (7.8 mmol/L)', color: '#16A34A' },
        { label: 'Impaired (Prediabetes)', value: '140 – 199 mg/dL (7.8 - 11.0 mmol/L)', color: '#D97706' },
        { label: 'Diabetes threshold', value: '≥ 200 mg/dL (11.1 mmol/L)', color: '#DC2626' },
      ],
      description: 'Assesses the physiological efficiency of peripheral tissues in clearing glucose from circulation.',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '3.5rem 0 6rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
            <span className="badge badge-secondary" style={{ marginBottom: '0.75rem' }}>
              Evidence-Based Library
            </span>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Diabetes Health Insights & Resources</h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              A curated educational guide covering diabetes classifications, physiological risk factors, clinical tests, and evidence-supported lifestyle prevention strategies.
            </p>
          </div>

          {/* Prominent Educational Notice */}
          <div className="alert-banner info" style={{ marginBottom: '3rem' }}>
            <Info size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', marginBottom: '0.2rem' }}>
                Educational Resource Purpose
              </strong>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>
                This knowledge base is prepared to support personal health literacy and risk factor awareness. 
                It is not clinical advice. Always consult a physician or registered dietitian for medical diagnosis, prescriptions, or nutritional programs.
              </p>
            </div>
          </div>

          {/* Section 1: Types of Diabetes */}
          <section style={{ marginBottom: '4rem' }}>
            <div className="flex items-center gap-2" style={{ marginBottom: '1.5rem' }}>
              <Activity size={24} color="var(--color-primary)" />
              <h2 style={{ fontSize: '1.65rem', margin: 0 }}>Understanding Diabetes Mellitus</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {diabetesTypes.map((type, idx) => (
                <div key={idx} className="card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{type.title}</h3>
                    <span className={`badge ${type.badgeClass}`}>{type.badge}</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {type.description}
                  </p>
                  <div style={{ marginTop: 'auto', background: '#F8FAFC', padding: '0.85rem', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                      Key Characteristics
                    </span>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {type.indicators.map((ind, i) => (
                        <li key={i} className="flex items-center gap-1.5" style={{ fontSize: '0.8rem', color: 'var(--color-text)' }}>
                          <CheckCircle2 size={13} color="var(--color-primary)" />
                          <span>{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Clinical Screening Standards & Reference Ranges */}
          <section style={{ marginBottom: '4rem' }}>
            <div className="flex items-center gap-2" style={{ marginBottom: '1.5rem' }}>
              <FileCheck2 size={24} color="var(--color-secondary)" />
              <h2 style={{ fontSize: '1.65rem', margin: 0 }}>Standard Clinical Screenings</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {clinicalScreenings.map((screening, idx) => (
                <div key={idx} className="card">
                  <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{screening.name}</h3>
                    <span className="badge badge-neutral" style={{ fontSize: '0.75rem' }}>{screening.sample}</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
                    {screening.description}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    {screening.ranges.map((r, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '0.85rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          background: '#F8FAFC',
                          borderLeft: `4px solid ${r.color}`,
                        }}
                      >
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                          {r.label}
                        </span>
                        <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginTop: '0.2rem' }}>
                          {r.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Lifestyle Prevention Strategies */}
          <section style={{ marginBottom: '4rem' }}>
            <div className="flex items-center gap-2" style={{ marginBottom: '1.5rem' }}>
              <Apple size={24} color="var(--color-success)" />
              <h2 style={{ fontSize: '1.65rem', margin: 0 }}>Preventative Lifestyle Pillars</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div className="card" style={{ borderTop: '4px solid var(--color-primary)' }}>
                <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem' }}>
                  <Dumbbell size={20} color="var(--color-primary)" />
                  <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Physical Activity</h3>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Aim for at least <strong>150 minutes of moderate-intensity aerobic exercise</strong> (e.g. brisk walking, cycling) per week, coupled with resistance training 2–3 times weekly to enhance peripheral insulin sensitivity.
                </p>
              </div>

              <div className="card" style={{ borderTop: '4px solid var(--color-secondary)' }}>
                <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem' }}>
                  <Apple size={20} color="var(--color-secondary)" />
                  <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Glycemic Nutrition</h3>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Focus on dietary fiber, non-starchy vegetables, legumes, whole grains, and healthy fats (such as extra virgin olive oil and nuts). Minimize sugar-sweetened beverages and ultra-processed refined carbohydrates.
                </p>
              </div>

              <div className="card" style={{ borderTop: '4px solid #F59E0B' }}>
                <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem' }}>
                  <Activity size={20} color="#F59E0B" />
                  <h3 style={{ fontSize: '1.15rem', margin: 0 }}>Sleep & Stress Regulation</h3>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Chronic sleep deprivation (&lt; 6 hours nightly) elevates circulating cortisol and nocturnal catecholamines, promoting insulin resistance and daytime glycemic instability.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Trusted External Resources */}
          <section className="card" style={{ padding: '2.5rem', backgroundColor: '#FFFFFF' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Trusted Healthcare Authorities</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
              For validated clinical guidelines, patient education pamphlets, and epidemiological research:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <a
                href="https://www.who.int/health-topics/diabetes"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ justifyContent: 'space-between', padding: '1rem' }}
              >
                <span>World Health Organization (WHO)</span>
                <ExternalLink size={16} />
              </a>

              <a
                href="https://diabetes.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ justifyContent: 'space-between', padding: '1rem' }}
              >
                <span>American Diabetes Assoc. (ADA)</span>
                <ExternalLink size={16} />
              </a>

              <a
                href="https://www.cdc.gov/diabetes/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ justifyContent: 'space-between', padding: '1rem' }}
              >
                <span>CDC Diabetes Education</span>
                <ExternalLink size={16} />
              </a>

              <a
                href="https://idf.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ justifyContent: 'space-between', padding: '1rem' }}
              >
                <span>International Diabetes Federation</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HealthInsights;
