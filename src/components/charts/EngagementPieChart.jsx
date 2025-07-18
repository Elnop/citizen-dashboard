import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useDashboard } from '../../context/DashboardContext';

function EngagementPieChart() {
  const { state } = useDashboard();
  const { filteredMissions, themes } = state;

  // Prepare data for pie chart
  const data = themes.map(theme => {
    const themeMissions = filteredMissions.filter(mission => mission.theme === theme.name);
    const totalHours = themeMissions.reduce((sum, mission) => sum + mission.hours, 0);
    
    return {
      name: theme.name,
      value: totalHours,
      count: themeMissions.length,
      color: theme.color,
      percentage: 0 // Will be calculated below
    };
  }).filter(item => item.value > 0);

  // Calculate percentages
  const totalHours = data.reduce((sum, item) => sum + item.value, 0);
  data.forEach(item => {
    item.percentage = totalHours > 0 ? Math.round((item.value / totalHours) * 100) : 0;
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-gray-100">{data.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.value}h ({data.percentage}%)
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {data.count} mission{data.count > 1 ? 's' : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p>Aucune donnée à afficher</p>
          <p className="text-sm">Ajustez vos filtres pour voir les données</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EngagementPieChart;