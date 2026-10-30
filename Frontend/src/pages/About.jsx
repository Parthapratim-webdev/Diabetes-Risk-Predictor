import React from 'react';
import {
  GraduationCap,
  Layers,
  Server,
  Database,
  Code2,
  Cpu,
  Workflow,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const About = () => {
  const techStack = [
    {
      category: 'Frontend Client',
      items: [
        { name: 'React.js 19', role: 'Component-based UI library' },
        { name: 'Vite 8', role: 'Next-generation build tool & dev server' },
        { name: 'React Router DOM 7', role: 'Declarative client-side routing & layouts' },
        { name: 'Chart.js & react-chartjs-2', role: 'Interactive health data visualizations' },
        { name: 'React Hook Form', role: 'Performant, accessible form validation' },
        { name: 'Lucide React', role: 'Clean, modern healthcare iconography' },
        { name: 'React Hot Toast', role: 'Lightweight, animated notification system' },
        { name: 'Pure CSS3', role: 'Modular design tokens without utility overhead' },
      ],
    },
    {
      category: 'Planned Backend & Database',
      items: [
        { name: 'Node.js (v20+)', role: 'Asynchronous event-driven server runtime' },
        { name: 'Express.js', role: 'RESTful API routing & middleware architecture' },
        { name: 'MongoDB', role: 'NoSQL document database for assessment records' },
        { name: 'Mongoose', role: 'Schema modeling and data validation' },
        { name: 'JWT & Bcrypt', role: 'Stateless token authentication & password hashing' },
        { name: 'HTTP-Only Cookies', role: 'XSS-resilient session credential transport' },
      ],
    },
  ];

  const apiEndpoints = [
    { method: 'POST', endpoint: '/api/auth/register', desc: 'Registers user account with email, name, and hashed password' },
    { method: 'POST', endpoint: '/api/auth/login', desc: 'Validates credentials and issues secure HTTP-only cookie / JWT' },
    { method: 'GET', endpoint: '/api/auth/me', desc: 'Retrieves authenticated user profile and permissions' },
    { method: 'POST', endpoint: '/api/predictions', desc: 'Evaluates biometric payload and stores prediction record' },
    { method: 'GET', endpoint: '/api/predictions', desc: 'Fetches paginated previous results with filter & search' },
    { method: 'GET', endpoint: '/api/predictions/:id', desc: 'Retrieves complete assessment breakdown by unique ID' },
    { method: 'PATCH', endpoint: '/api/users/profile', desc: 'Updates user metadata, notification & privacy preferences' },
    { method: 'POST', endpoint: '/api/auth/logout', desc: 'Revokes session tokens and clears authentication cookies' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '3.5rem 0 6rem' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          {/* Hero Header */}
          <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3.5rem' }}>
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
                marginBottom: '1rem',
              }}
            >
              <GraduationCap size={16} />
              <span>Academic Full-Stack Engineering Capstone</span>
            </div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
              About Diabetes Risk Predictor
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              A full-stack web engineering project developed to demonstrate modern frontend architecture, 
              accessible UI/UX principles, and seamless readiness for Express.js and MongoDB backend integration.
            </p>
          </div>

          {/* Section 1: Problem Statement & Objectives */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
            <div className="card" style={{ padding: '2rem' }}>
              <div className="flex items-center gap-2" style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>
                <Layers size={22} />
                <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--color-text)' }}>Problem Statement</h3>
              </div>
              <p style={{ fontSize: '0.925rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Diabetes mellitus is among the fastest-growing global health challenges, yet millions remain undiagnosed during the critical prediabetic window. 
                Many individuals lack an accessible, transparent medium to understand how common biometrics—such as BMI, fasting blood glucose, and resting blood pressure—interconnect in signaling early metabolic strain.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
              <div className="flex items-center gap-2" style={{ marginBottom: '1rem', color: 'var(--color-secondary)' }}>
                <Workflow size={22} />
                <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--color-text)' }}>Project Objectives</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li className="flex items-start gap-2" style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                  <CheckCircle2 size={16} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>Build an accessible, multi-step React frontend with dynamic validation and live BMI calculations.</span>
                </li>
                <li className="flex items-start gap-2" style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                  <CheckCircle2 size={16} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>Implement responsive data visualizations for biometrics using Chart.js.</span>
                </li>
                <li className="flex items-start gap-2" style={{ fontSize: '0.9rem', color: 'var(--color-secondary)' }}>
                  <CheckCircle2 size={16} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>Establish strict decoupling between frontend UI and backend Express API services.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 2: System Architecture Diagram */}
          <section className="card" style={{ padding: '2.5rem', marginBottom: '3.5rem' }}>
            <div className="flex items-center gap-2" style={{ marginBottom: '1.5rem' }}>
              <Cpu size={24} color="var(--color-primary)" />
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Full-Stack System Architecture</h2>
            </div>

            {/* Visual Architecture Diagram Blocks */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.25rem',
                position: 'relative',
              }}
            >
              {/* Layer 1: Client */}
              <div
                style={{
                  background: 'var(--color-primary-light)',
                  border: '1px solid rgba(37, 99, 235, 0.25)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="badge badge-primary">Client Layer</span>
                  <Code2 size={18} color="var(--color-primary)" />
                </div>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>React 19 SPA</strong>
                <p style={{ fontSize: '0.825rem', color: '#1E3A8A', margin: 0 }}>
                  Vite build system, React Router, React Hook Form, Chart.js, Axios interceptors, responsive CSS.
                </p>
              </div>

              {/* Layer 2: API Gateway */}
              <div
                style={{
                  background: 'var(--color-secondary-light)',
                  border: '1px solid rgba(13, 148, 136, 0.25)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="badge badge-secondary">API Layer</span>
                  <Server size={18} color="var(--color-secondary)" />
                </div>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-secondary)' }}>Express.js REST API</strong>
                <p style={{ fontSize: '0.825rem', color: '#134E4A', margin: 0 }}>
                  JSON schema validator, JWT verification middleware, rate limiter, CORS & HTTP-only cookies.
                </p>
              </div>

              {/* Layer 3: Database */}
              <div
                style={{
                  background: '#F8FAFC',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="badge badge-neutral">Data Layer</span>
                  <Database size={18} color="#475569" />
                </div>
                <strong style={{ fontSize: '1.1rem', color: '#0F172A' }}>MongoDB & Mongoose</strong>
                <p style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                  Users collection with bcrypt password hashes, and Predictions collection with indexed user IDs.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Technologies Used Table */}
          <section style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }} id="technologies">Technologies Used</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {techStack.map((col, idx) => (
                <div key={idx} className="card" style={{ padding: '1.75rem' }}>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
                    {col.category}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {col.items.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          justifyContent: 'space-between',
                          paddingBottom: '0.5rem',
                          borderBottom: '1px solid var(--color-border-light)',
                        }}
                      >
                        <strong style={{ fontSize: '0.9rem', color: 'var(--color-text)' }}>{item.name}</strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{item.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: API Endpoint Specifications */}
          <section className="card" style={{ padding: '2rem', marginBottom: '3.5rem' }} id="api-specs">
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Backend Integration Specification</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
              These endpoints represent the contract between this React frontend and the upcoming Node.js/Express service:
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Method</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Endpoint</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Description & Scope</th>
                  </tr>
                </thead>
                <tbody>
                  {apiEndpoints.map((ep, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span
                          className={`badge ${
                            ep.method === 'POST'
                              ? 'badge-primary'
                              : ep.method === 'GET'
                              ? 'badge-success'
                              : 'badge-warning'
                          }`}
                        >
                          {ep.method}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', fontWeight: 600 }}>
                        {ep.endpoint}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--color-text-secondary)' }}>
                        {ep.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: Project Limitations & Future Enhancements */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', color: '#B91C1C' }}>
                Project Limitations & Ethical Scope
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                • <strong>Educational Demo:</strong> This application does not constitute a certified medical diagnostic device under FDA, CE, or CDSCO regulations.
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                • <strong>Model Generalizability:</strong> Assessment rules are based on population-level statistical guidelines (ADA & WHO) and do not account for individual comorbidities or pharmaceutical regimens.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
                Future Enhancements Roadmap
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                • <strong>Machine Learning Pipeline:</strong> Integration of trained gradient-boosted trees (e.g. XGBoost / LightGBM) via a microservice.
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                • <strong>Wearable Device Sync:</strong> Apple HealthKit & Google Health Connect ingestion for passive resting vitals.
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                • <strong>Multilingual Localization:</strong> Comprehensive i18n support for global accessibility.
              </p>
            </div>
          </div>

          {/* Final Medical Disclaimer Box */}
          <div className="alert-banner warning" style={{ margin: 0 }}>
            <ShieldAlert size={22} style={{ flexShrink: 0, marginTop: '2px', color: '#D97706' }} />
            <div>
              <strong style={{ display: 'block', marginBottom: '0.2rem' }}>Medical Notice</strong>
              <span style={{ fontSize: '0.875rem' }}>
                This assessment is for educational purposes only and is not a medical diagnosis. 
                Consult a qualified healthcare professional for appropriate testing and interpretation.
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
