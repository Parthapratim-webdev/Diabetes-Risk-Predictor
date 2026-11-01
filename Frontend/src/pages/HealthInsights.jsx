import React from 'react';
import {
  Heart,
  Activity,
  Apple,
  Dumbbell,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  Stethoscope,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const HealthInsights = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '3rem 0 5rem' }}>
        <div className="container" style={{ maxWidth: '920px' }}>
          {/* Main Page Header */}
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginBottom: '1rem',
              }}
            >
              <ShieldCheck size={16} aria-hidden="true" />
              <span>Easy-to-Read Health Information</span>
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: 'var(--color-text)', marginBottom: '0.75rem' }}>
              Learn About Diabetes
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              A friendly guide to understanding what diabetes is, common risk factors, why routine testing matters, and simple everyday habits.
            </p>
          </div>

          {/* Educational Purpose Notice */}
          <div className="alert-banner info" style={{ marginBottom: '2.5rem' }} role="region" aria-label="Educational Notice">
            <HelpCircle size={22} style={{ flexShrink: 0, marginTop: '2px', color: '#1D4ED8' }} aria-hidden="true" />
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                Educational Notice
              </strong>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>
                This guide provides general health literacy and is not medical advice. We do not recommend medications or personalized treatments. Always consult a qualified healthcare professional about your symptoms or medical questions.
              </p>
            </div>
          </div>

          {/* 1. What Diabetes Is */}
          <section className="card" style={{ padding: '2.25rem', marginBottom: '2rem' }}>
            <div className="flex items-center gap-2.5" style={{ marginBottom: '1rem' }}>
              <Heart size={24} color="var(--color-primary)" aria-hidden="true" />
              <h2 style={{ fontSize: '1.45rem', margin: 0 }}>What is Diabetes?</h2>
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--color-text)', lineHeight: 1.7, marginBottom: '1rem' }}>
              When we eat, our body breaks down food into a type of sugar called glucose. Glucose enters the bloodstream and provides energy for all our body's cells.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--color-text)', lineHeight: 1.7, margin: 0 }}>
              To help sugar get from the blood into cells, an organ called the pancreas makes a hormone called insulin. Insulin acts like a key that unlocks cell doors. With diabetes, the body either does not make enough insulin or cannot use it as effectively as it should. Over time, sugar builds up in the bloodstream instead of fueling the body.
            </p>
          </section>

          {/* 2. Type 1 vs Type 2 Diabetes */}
          <section className="card" style={{ padding: '2.25rem', marginBottom: '2rem' }}>
            <div className="flex items-center gap-2.5" style={{ marginBottom: '1.25rem' }}>
              <Activity size={24} color="var(--color-secondary)" aria-hidden="true" />
              <h2 style={{ fontSize: '1.45rem', margin: 0 }}>The Difference Between Type 1 and Type 2 Diabetes</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {/* Type 1 */}
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#F8FAFC',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Type 1 Diabetes</h3>
                  <span className="badge badge-secondary">Autoimmune</span>
                </div>
                <p style={{ fontSize: '0.925rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  In type 1 diabetes, the body's immune system mistakenly attacks and stops the cells in the pancreas from making insulin.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <li className="flex items-start gap-2" style={{ fontSize: '0.85rem', color: 'var(--color-text)' }}>
                    <CheckCircle2 size={15} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    <span>Usually diagnosed in children, teens, or young adults</span>
                  </li>
                  <li className="flex items-start gap-2" style={{ fontSize: '0.85rem', color: 'var(--color-text)' }}>
                    <CheckCircle2 size={15} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    <span>Requires daily insulin replacement</span>
                  </li>
                  <li className="flex items-start gap-2" style={{ fontSize: '0.85rem', color: 'var(--color-text)' }}>
                    <CheckCircle2 size={15} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    <span>Cannot be prevented by diet or exercise alone</span>
                  </li>
                </ul>
              </div>

              {/* Type 2 */}
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'var(--color-primary-light)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(37, 99, 235, 0.25)',
                }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--color-primary)' }}>Type 2 Diabetes</h3>
                  <span className="badge badge-primary">Most Common (90-95%)</span>
                </div>
                <p style={{ fontSize: '0.925rem', color: '#1E3A8A', lineHeight: 1.6, marginBottom: '1rem' }}>
                  In type 2 diabetes, cells don't respond normally to insulin (insulin resistance). The pancreas works harder to make more, but eventually cannot keep up.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  <li className="flex items-start gap-2" style={{ fontSize: '0.85rem', color: '#1E3A8A' }}>
                    <CheckCircle2 size={15} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    <span>Develops slowly over many years, often without early symptoms</span>
                  </li>
                  <li className="flex items-start gap-2" style={{ fontSize: '0.85rem', color: '#1E3A8A' }}>
                    <CheckCircle2 size={15} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    <span>Linked with genetics, age, and lifestyle habits</span>
                  </li>
                  <li className="flex items-start gap-2" style={{ fontSize: '0.85rem', color: '#1E3A8A' }}>
                    <CheckCircle2 size={15} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    <span>Can often be delayed or managed with healthy lifestyle changes</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Common Risk Factors for Type 2 Diabetes */}
          <section className="card" style={{ padding: '2.25rem', marginBottom: '2rem' }}>
            <div className="flex items-center gap-2.5" style={{ marginBottom: '1rem' }}>
              <AlertCircle size={24} color="#D97706" aria-hidden="true" />
              <h2 style={{ fontSize: '1.45rem', margin: 0 }}>Common Risk Factors for Type 2 Diabetes</h2>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              A risk factor is something that increases your chances of developing a condition. Having one or more risk factors does not mean you will certainly get diabetes, but it means keeping an eye on your health is especially beneficial.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--color-text)' }}>Age 45 or Older</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem', display: 'block' }}>
                  Risk increases with age, though type 2 diabetes is increasingly seen in younger adults.
                </span>
              </div>

              <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--color-text)' }}>Family History</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem', display: 'block' }}>
                  Having a parent or brother or sister with diabetes increases your genetic predisposition.
                </span>
              </div>

              <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--color-text)' }}>Carrying Extra Weight</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem', display: 'block' }}>
                  Extra body fat, especially around the abdomen, makes cells more resistant to insulin.
                </span>
              </div>

              <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--color-text)' }}>Lower Physical Activity</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem', display: 'block' }}>
                  Being active fewer than 3 times a week makes it harder for your body to regulate blood sugar.
                </span>
              </div>

              <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--color-text)' }}>Higher Blood Pressure</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem', display: 'block' }}>
                  Elevated blood pressure often co-occurs with metabolic changes in the body.
                </span>
              </div>

              <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <strong style={{ fontSize: '0.95rem', display: 'block', color: 'var(--color-text)' }}>History During Pregnancy</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem', display: 'block' }}>
                  Having gestational diabetes increases future lifetime risk for type 2 diabetes.
                </span>
              </div>
            </div>
          </section>

          {/* 4. Why Blood Glucose Testing Matters */}
          <section className="card" style={{ padding: '2.25rem', marginBottom: '2rem' }}>
            <div className="flex items-center gap-2.5" style={{ marginBottom: '1rem' }}>
              <Activity size={24} color="var(--color-primary)" aria-hidden="true" />
              <h2 style={{ fontSize: '1.45rem', margin: 0 }}>Why Blood Glucose Testing Matters</h2>
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--color-text)', lineHeight: 1.7, marginBottom: '1rem' }}>
              In the early stages, high blood glucose almost never causes noticeable symptoms. You cannot tell what your blood sugar levels are simply by how you feel.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--color-text)', lineHeight: 1.7, margin: 0 }}>
              A routine blood test (such as a Fasting Plasma Glucose test or an HbA1c test) ordered by your physician is the only way to measure circulating blood sugar accurately. Discovering higher levels early gives you a valuable window of opportunity to make positive lifestyle adjustments before complications can develop.
            </p>
          </section>

          {/* 5. Physical Activity & Healthy Eating */}
          <section className="card" style={{ padding: '2.25rem', marginBottom: '2rem' }}>
            <div className="flex items-center gap-2.5" style={{ marginBottom: '1.25rem' }}>
              <Apple size={24} color="#16A34A" aria-hidden="true" />
              <h2 style={{ fontSize: '1.45rem', margin: 0 }}>Everyday Healthy Habits</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {/* Physical Activity */}
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#F8FAFC',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
                  <Dumbbell size={20} aria-hidden="true" />
                  <h3 style={{ fontSize: '1.15rem', margin: 0, color: 'var(--color-text)' }}>
                    The Importance of Physical Activity
                  </h3>
                </div>
                <p style={{ fontSize: '0.925rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                  When your muscles contract during exercise, they can absorb glucose directly from the bloodstream, even without extra insulin.
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text)', lineHeight: 1.6, margin: 0 }}>
                  Aim for about <strong>150 minutes of moderate activity each week</strong> (roughly 30 minutes on 5 days). This can be as simple as brisk walking, cycling, gardening, or swimming.
                </p>
              </div>

              {/* Healthy Eating */}
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: '#F8FAFC',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem', color: '#16A34A' }}>
                  <Apple size={20} aria-hidden="true" />
                  <h3 style={{ fontSize: '1.15rem', margin: 0, color: 'var(--color-text)' }}>
                    General Healthy Eating Habits
                  </h3>
                </div>
                <p style={{ fontSize: '0.925rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                  Healthy eating does not mean strict deprivation. It means choosing nourishing foods in balanced proportions:
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.875rem' }}>
                  <li className="flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                    <CheckCircle2 size={14} color="#16A34A" aria-hidden="true" />
                    <span>Fill half your plate with colorful vegetables</span>
                  </li>
                  <li className="flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                    <CheckCircle2 size={14} color="#16A34A" aria-hidden="true" />
                    <span>Choose whole grains (oats, brown rice, whole wheat)</span>
                  </li>
                  <li className="flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                    <CheckCircle2 size={14} color="#16A34A" aria-hidden="true" />
                    <span>Drink plain water rather than sugary sodas or juices</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 6. When to Speak with a Healthcare Professional */}
          <section className="card" style={{ padding: '2.25rem', marginBottom: '2.5rem', borderLeft: '5px solid var(--color-primary)' }}>
            <div className="flex items-center gap-2.5" style={{ marginBottom: '1rem' }}>
              <Stethoscope size={24} color="var(--color-primary)" aria-hidden="true" />
              <h2 style={{ fontSize: '1.45rem', margin: 0 }}>When to Speak with a Healthcare Professional</h2>
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--color-text)', lineHeight: 1.7, marginBottom: '1rem' }}>
              A healthcare professional is your best partner in protecting your long-term health. You should schedule a visit:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
              <div style={{ padding: '0.85rem 1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)' }}>
                <strong>For routine checkups:</strong> If you are 45 or older, or have risk factors like a family history of diabetes.
              </div>
              <div style={{ padding: '0.85rem 1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)' }}>
                <strong>If you notice unusual symptoms:</strong> Such as feeling very thirsty, needing to urinate frequently, unexplained tiredness, or blurry vision.
              </div>
              <div style={{ padding: '0.85rem 1rem', background: '#F8FAFC', borderRadius: 'var(--radius-md)' }}>
                <strong>Before major lifestyle changes:</strong> Before beginning an intense new exercise program or changing your medications.
              </div>
            </div>
          </section>

          {/* 7. Reliable Health Sources & Links */}
          <section className="card" style={{ padding: '2.25rem', backgroundColor: '#FFFFFF' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Reliable Health Sources</h2>
            <p style={{ fontSize: '0.925rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
              For further evidence-based patient information and educational resources, explore these recognized public health authorities:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <a
                href="https://www.who.int/health-topics/diabetes"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ justifyContent: 'space-between', padding: '0.85rem 1rem', fontSize: '0.9rem' }}
              >
                <span>World Health Organization (WHO)</span>
                <ExternalLink size={16} aria-hidden="true" />
              </a>

              <a
                href="https://diabetes.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ justifyContent: 'space-between', padding: '0.85rem 1rem', fontSize: '0.9rem' }}
              >
                <span>American Diabetes Assoc. (ADA)</span>
                <ExternalLink size={16} aria-hidden="true" />
              </a>

              <a
                href="https://www.cdc.gov/diabetes/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ justifyContent: 'space-between', padding: '0.85rem 1rem', fontSize: '0.9rem' }}
              >
                <span>CDC Diabetes Resources</span>
                <ExternalLink size={16} aria-hidden="true" />
              </a>

              <a
                href="https://idf.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ justifyContent: 'space-between', padding: '0.85rem 1rem', fontSize: '0.9rem' }}
              >
                <span>International Diabetes Fed.</span>
                <ExternalLink size={16} aria-hidden="true" />
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
