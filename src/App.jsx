import React, { useEffect } from 'react';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import DashboardLayout from './components/layout/DashboardLayout';

function AppContent() {
  const { state, actions } = useDashboard();

  // Apply dark mode to document
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  return <DashboardLayout />;
}

function App() {
  return (
    <DashboardProvider>
      <AppContent />
    </DashboardProvider>
  );
}

export default App;