# Diabetes Risk Predictor — Frontend Web Application

> **Academic Capstone Project**: Full-Stack Healthcare Assessment Platform  
> **Frontend Stack**: React.js (v19) + Vite + React Router DOM + Chart.js + React Hook Form + Pure CSS3  
> **Backend Integration**: Pre-configured for Node.js, Express.js, and MongoDB

---

## 1. Project Overview

**Diabetes Risk Predictor** is a modern, responsive healthcare SaaS web application built to facilitate educational risk-factor evaluation and metabolic health literacy. The platform provides an intuitive, non-invasive experience for users to assess how primary biometric factors—such as Body Mass Index (BMI), fasting blood glucose, and resting blood pressure—correlate with recognized clinical indicator categories (inspired by American Diabetes Association standards).

The application is structured as a **decoupled full-stack architecture**. This repository houses the complete, production-grade frontend client, prepared with centralized Axios interceptors, JWT/HTTP-only cookie compatibility, and structured demonstration data for academic presentations and viva evaluations.

---

## 2. Key Features

### 🖥️ Public Landing Experience
* **Hero Section**: Healthcare SaaS branding with interactive biometric preview cards and subtle blue/teal gradients.
* **How It Works**: 3-step structured guidance (Biometric entry → Indicator review → Prevention guidance).
* **Feature Grid**: 8 feature highlights with custom Lucide healthcare iconography.
* **Clinical Knowledge**: Educational breakdown of Type 1, Type 2, Gestational, and Prediabetes.
* **Interactive FAQ**: Accessible expandable accordion clarifying scope and data privacy.
* **Medical Disclaimer**: Prominent notices throughout clarifying educational scope.

### 🔐 Authentication System (Integration Ready)
* **Login & Registration**: Managed via **React Hook Form** with real-time field validation.
* **Password Security**: Live password strength scoring meter (evaluating length, lowercase, uppercase, numbers, and symbols).
* **Show/Hide Password**: Accessible toggles on all sensitive fields.
* **Demo Auto-Fill**: One-click demo credentials for academic evaluations and viva demos (`alex.morgan@healthportal.demo`).
* **Route Protection**: Client-side route guarding preserving intended redirection paths (`ProtectedRoute.jsx`).

### 📊 Interactive Analytics Dashboard
* **Collapsible Sidebar**: Smooth desktop collapse and mobile drawer navigation.
* **Summary Metrics**: 4 dynamic stat cards (Total Assessments, Latest Assessment Date, Average Fasting Glucose, Profile Completion).
* **Vitals Timeline Chart**: Dual-axis Chart.js visualization mapping fasting glucose and systolic blood pressure trends.
* **Risk Indicator Distribution**: Bar chart displaying historical evaluations across indicator brackets.
* **Recent Activity Table**: Sortable activity log with direct navigation to detailed reports.

### 🩺 3-Step Health Assessment Form
* **Step 1 — Basic Biometrics**: Biological age, sex, height (cm), weight (kg).
* **Live Dynamic BMI Calculator**: Auto-calculates BMI via `weight / (height/100)²` with educational category tags (Underweight, Normal, Overweight, Obesity Classes I–III) and healthy target weight ranges.
* **Step 2 — Health Measurements**: Fasting blood glucose (with units selector), systolic & diastolic blood pressure, optional HbA1c (%). Range checks prevent erroneous inputs.
* **Step 3 — Medical History**: Genetic predisposition (first-degree family history), physical activity tier, dietary habits, and smoking status.
* **Form Safety**: Confirmation modal preventing accidental data loss on reset.

### 📄 Assessment Results & Reporting
* **Risk Indicator Classification**: Transparent summary of contributing factors without arbitrary black-box medical scores.
* **Report Printing**: Print-optimized stylesheet (`@media print`) generating clean clinical summary sheets.
* **Report Download**: One-click generation of `.txt` medical summary files.
* **Next Steps**: Actionable, evidence-based lifestyle guidance and screening suggestions.

### 📚 Health Insights & Resources
* Curated reference guides for standard clinical tests:
  * **Fasting Plasma Glucose (FPG)**
  * **Glycated Hemoglobin (HbA1c)**
  * **Oral Glucose Tolerance Test (OGTT)**
* Evidence-based lifestyle pillars (physical activity, glycemic nutrition, sleep hygiene).
* Direct citations and links to authoritative organizations (**WHO**, **ADA**, **CDC**, **IDF**).

### ⚙️ Profile & Data Governance
* Profile metadata management (`name`, `email`, `role`).
* Change password dialog with validation.
* Notification preferences toggles.
* **Export My Data**: Generates a machine-readable JSON archive of all session records.
* **Data Deletion Interface**: Accessible modal dialog to request record erasure.

---

## 3. Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **UI Framework** | React.js (v19) | Modern component architecture & hooks |
| **Build Tool** | Vite (v8) | Blazing-fast HMR and optimized production bundles |
| **Routing** | React Router DOM (v7) | Declarative client routing and shared layout outlets |
| **Charts** | Chart.js & react-chartjs-2 | Visual trends for glucose, blood pressure, and activity |
| **Form Handling** | React Hook Form | High-performance, re-render-efficient form validation |
| **Iconography** | Lucide React | Modern, lightweight medical and UI icons |
| **Notifications** | React Hot Toast | Accessible, non-intrusive notification banners |
| **HTTP Client** | Axios | Centralized API client configured with interceptors |
| **Styling** | Plain CSS3 & CSS Custom Properties | Maintainable design system without Tailwind bloat |

---

## 4. Visual Identity & Design Tokens

Inspired by modern healthcare SaaS platforms (e.g., Epic Systems, One Medical):

| Token Name | Value | Purpose |
| :--- | :--- | :--- |
| `--color-primary` | `#2563EB` | Primary brand blue |
| `--color-secondary` | `#0D9488` | Secondary medical teal |
| `--color-bg` | `#F5F8FC` | Soft, clinical neutral background |
| `--color-card` | `#FFFFFF` | Card and surface elements |
| `--color-text` | `#172033` | High-contrast body text |
| `--color-text-secondary` | `#64748B` | Secondary and descriptive copy |
| `--color-success` | `#16A34A` | Healthy indicator badge |
| `--color-warning` | `#F59E0B` | Moderate risk / warning state |
| `--color-error` | `#DC2626` | Elevated indicator / error state |

---

## 5. Project Directory Structure

```text
college-project/
├── public/
│   ├── favicon.svg             # Medical shield & heart SVG logo
│   └── images/                 # Healthcare image assets
├── src/
│   ├── assets/                 # SVGs and static brand graphics
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.jsx          # Top navigation with responsive mobile menu
│   │   ├── Footer.jsx          # Footer with medical disclaimer and references
│   │   ├── Sidebar.jsx         # Collapsible dashboard sidebar
│   │   ├── DashboardLayout.jsx # Shared layout wrapper with header & notifications
│   │   ├── ProtectedRoute.jsx  # Client-side session guard
│   │   ├── StatCard.jsx        # Metric summary card
│   │   ├── LoadingSpinner.jsx  # Spinners and skeleton loaders
│   │   ├── EmptyState.jsx      # Reusable empty state view
│   │   ├── Modal.jsx           # Accessible dialog modal
│   │   └── ToastProvider.jsx   # Hot toast notification configuration
│   ├── pages/                  # Page route components
│   │   ├── Home.jsx            # Landing page
│   │   ├── Login.jsx           # Sign-in form with demo auto-fill
│   │   ├── Register.jsx        # Registration form with strength meter
│   │   ├── Dashboard.jsx       # Analytics dashboard with Chart.js
│   │   ├── Prediction.jsx      # 3-step assessment with live BMI calculator
│   │   ├── Result.jsx          # Results, download report, print view
│   │   ├── History.jsx         # Assessment history with table/card views & search
│   │   ├── Profile.jsx         # Profile management, export, security settings
│   │   ├── HealthInsights.jsx  # Educational health resource library
│   │   ├── About.jsx           # Capstone documentation & system architecture
│   │   └── NotFound.jsx        # Custom 404 page
│   ├── services/               # API integration modules
│   │   ├── api.js              # Centralized Axios client with interceptors
│   │   ├── authService.js      # Auth API calls & demo session fallback
│   │   └── predictionService.js# Prediction API calls & demonstration evaluation
│   ├── hooks/
│   │   └── useAuth.js          # Custom authentication hook
│   ├── context/
│   │   └── AuthContext.jsx     # User authentication state provider
│   ├── utils/
│   │   ├── validation.js       # Regex patterns & clinical range constants
│   │   └── bmiCalculator.js    # BMI calculation & category classification
│   ├── styles/                 # Modular CSS stylesheets
│   │   ├── global.css          # CSS variables, typography, print styles
│   │   ├── components.css      # Reusable buttons, cards, forms, modals
│   │   └── responsive.css      # Responsive media queries & drawer rules
│   ├── App.jsx                 # Route tree definitions
│   └── main.jsx                # Application bootstrap
├── .env                        # Local development variables
├── .env.example                # Sample environment template
├── .gitignore                  # Git exclusions
├── package.json                # Project dependencies and npm scripts
└── README.md                   # Comprehensive documentation
```

---

## 6. Quick Start & Setup Instructions

### Prerequisites
* **Node.js**: v18.0.0 or later (v20+ recommended)
* **npm**: v9.0.0 or later

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Default configuration:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_ENABLE_DEMO_MODE=true
VITE_APP_NAME="Diabetes Risk Predictor"
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at:
```text
http://localhost:5173
```

### 4. Build for Production
To build the application for deployment:
```bash
npm run build
```
To preview the production build locally:
```bash
npm run preview
```

---

## 7. Future Backend Integration Guide (Node.js & Express)

The frontend is built to integrate with an Express.js and MongoDB backend. When the backend is online, toggle `VITE_ENABLE_DEMO_MODE=false` in `.env`.

### Expected REST API Endpoints

| HTTP Method | Route | Description | Expected Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new user | `{ name, email, password }` |
| `POST` | `/api/auth/login` | Authenticate user & issue cookie/token | `{ email, password }` |
| `GET` | `/api/auth/me` | Fetch active user session | *Header: Bearer Token or Cookie* |
| `POST` | `/api/auth/logout` | Revoke session & clear cookie | — |
| `POST` | `/api/predictions` | Submit biometrics for evaluation | `{ age, heightCm, weightKg, glucose, systolicBP, diastolicBP, familyHistory, ... }` |
| `GET` | `/api/predictions` | Retrieve user assessment history | *Query: `?search=&riskLevel=&sort=`* |
| `GET` | `/api/predictions/:id` | Fetch single assessment report | — |
| `DELETE` | `/api/predictions/:id` | Remove assessment record | — |
| `PATCH` | `/api/users/profile` | Update profile / preferences | `{ name, email, notifications, privacySettings }` |

### Suggested MongoDB Schemas

#### User Schema (`models/User.js`)
```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }, // bcrypt hashed
  role: { type: String, enum: ['User', 'Admin'], default: 'User' },
  notifications: {
    emailReports: { type: Boolean, default: true },
    healthTips: { type: Boolean, default: true },
    reminders: { type: Boolean, default: false }
  },
  privacySettings: {
    shareTelemetry: { type: Boolean, default: false },
    demoModeActive: { type: Boolean, default: false }
  }
}, { timestamps: true });
```

#### Assessment Schema (`models/Prediction.js`)
```javascript
const predictionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  measurements: {
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    heightCm: { type: Number, required: true },
    weightKg: { type: Number, required: true },
    bmi: { type: Number, required: true },
    glucose: { type: Number, required: true },
    systolicBP: { type: Number, required: true },
    diastolicBP: { type: Number, required: true },
    hba1c: { type: Number },
    familyHistory: { type: Boolean, default: false },
    physicalActivity: { type: String },
    dietaryQuality: { type: String }
  },
  predictionResult: {
    classification: { type: String, required: true },
    estimatedProbability: { type: Number },
    riskLevel: { type: String, enum: ['Low', 'Moderate', 'Elevated'] },
    summary: { type: String },
    contributingFactors: [{ factor: String, value: String, status: String, impact: String }],
    recommendations: [String],
    disclaimer: { type: String }
  }
}, { timestamps: true });
```

---

## 8. College Viva & Evaluation Notes

* **No Tailwind CSS**: Pure CSS custom properties and component rules for clean, maintainable, standard CSS3.
* **Component Modularity**: High reusability with zero dead buttons, functional state tracking, dynamic BMI calculations, and accessible modals.
* **Ethical AI & Clinical Notice**: Adheres to strict medical disclaimer guidelines without fabricating diagnostic claims or medical accuracy rates.
* **Offline-Resilient Demo Mode**: If the Express backend is not running, the application gracefully provides realistic demonstration data so that reviewers can inspect every page, chart, and interaction without disruption.

---

## 9. Medical & Academic Disclaimer

> **IMPORTANT**: This software application is developed solely as an educational and academic project. It is **NOT** a certified medical diagnosis tool and does not provide clinical diagnoses, medical advice, or treatment plans. Blood sugar thresholds and biometric indicators presented are derived from general population guidelines (e.g., ADA, WHO) and must not replace professional clinical evaluation. If you have concerns regarding metabolic health or diabetes, please consult a qualified healthcare professional.
