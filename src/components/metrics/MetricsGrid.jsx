import React from 'react';
import { Clock, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import MetricCard from './MetricCard';

function MetricsGrid() {
  const { state } = useDashboard();
  const { metrics } = state;

  const metricsData = [
    {
      id: 'totalHours',
      title: 'Heures totales',
      value: metrics.totalHours,
      unit: 'h',
      icon: Clock,
      color: 'primary',
      description: 'Temps total consacré aux missions'
    },
    {
      id: 'engagedEmployees',
      title: 'Collaborateurs engagés',
      value: metrics.engagedEmployees,
      unit: '',
      icon: Users,
      color: 'success',
      description: 'Nombre de collaborateurs ayant participé'
    },
    {
      id: 'engagementRate',
      title: 'Taux d\'engagement',
      value: metrics.engagementRate,
      unit: '%',
      icon: TrendingUp,
      color: 'warning',
      description: 'Pourcentage de collaborateurs certifiés'
    },
    {
      id: 'completedMissions',
      title: 'Missions terminées',
      value: metrics.completedMissions,
      unit: `/${metrics.totalMissions}`,
      icon: CheckCircle,
      color: 'success',
      description: 'Missions complétées sur le total'
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Vue d'ensemble
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Indicateurs clés de l'engagement citoyen
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric) => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </div>
    </div>
  );
}

export default MetricsGrid;