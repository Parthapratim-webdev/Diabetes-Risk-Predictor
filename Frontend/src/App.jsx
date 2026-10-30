import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Global Styles
import './styles/global.css';
import './styles/components.css';
import './styles/responsive.css';

// Context & Providers
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/ToastProvider';

// Shared Components & Layouts
import { DashboardLayout } from './components/DashboardLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

// Public Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { HealthInsights } from './pages/HealthInsights';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';

// Protected / App Pages
import { Dashboard } from './pages/Dashboard';
import { Prediction } from './pages/Prediction';
import { Result } from './pages/Result';
import { History } from './pages/History';
import { Profile } from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastProvider />
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/health-insights" element={<HealthInsights />} />
          <Route path="/about" element={<About />} />

          {/* Protected Dashboard Routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/prediction" element={<Prediction />} />
            <Route path="/result" element={<Result />} />
            <Route path="/result/:id" element={<Result />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Fallback 404 Route */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
