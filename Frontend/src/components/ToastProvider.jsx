import React from 'react';
import { Toaster } from 'react-hot-toast';

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#FFFFFF',
          color: '#172033',
          boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.08)',
          borderRadius: '12px',
          padding: '12px 16px',
          fontSize: '0.925rem',
          fontWeight: 500,
          border: '1px solid #E2E8F0',
        },
        success: {
          iconTheme: {
            primary: '#16A34A',
            secondary: '#FFFFFF',
          },
          style: {
            borderLeft: '4px solid #16A34A',
          },
        },
        error: {
          iconTheme: {
            primary: '#DC2626',
            secondary: '#FFFFFF',
          },
          style: {
            borderLeft: '4px solid #DC2626',
          },
        },
      }}
    />
  );
};

export default ToastProvider;
