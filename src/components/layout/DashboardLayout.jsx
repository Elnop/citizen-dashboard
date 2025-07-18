import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import Header from './Header';
import Sidebar from './Sidebar';
import MetricsGrid from '../metrics/MetricsGrid';
import EngagementPieChart from '../charts/EngagementPieChart';
import HoursBarChart from '../charts/HoursBarChart';
import TrendLineChart from '../charts/TrendLineChart';
import TopEmployeesChart from '../charts/TopEmployeesChart';
import LoadingSpinner from '../common/LoadingSpinner';

function DashboardLayout() {
  const { state } = useDashboard();

  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white dark:bg-gray-800 shadow-lg">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Metrics Grid */}
          <div className="mb-8">
            <MetricsGrid />
          </div>
          
          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Pie Chart - Répartition par thématique */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Répartition par thématique
              </h3>
              <EngagementPieChart />
            </div>
            
            {/* Bar Chart - Heures par mois */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Heures d'engagement par mois
              </h3>
              <HoursBarChart />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart - Évolution dans le temps */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Évolution de l'engagement
              </h3>
              <TrendLineChart />
            </div>
            
            {/* Top Employees */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Top 5 collaborateurs
              </h3>
              <TopEmployeesChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;