import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Award, Clock, Target } from 'lucide-react';

function TopEmployeesChart() {
  const { state } = useDashboard();
  const { filteredMissions, employees } = state;

  // Calculate employee engagement stats
  const employeeStats = employees.map(employee => {
    const employeeMissions = filteredMissions.filter(mission => mission.employeeId === employee.id);
    const totalHours = employeeMissions.reduce((sum, mission) => sum + mission.hours, 0);
    const completedMissions = employeeMissions.filter(mission => mission.status === 'completed').length;
    
    return {
      id: employee.id,
      name: employee.name,
      department: employee.department,
      team: employee.team,
      totalHours,
      missionsCount: employeeMissions.length,
      completedMissions,
      certifications: employee.certifications.length,
      position: employee.position
    };
  })
  .filter(emp => emp.totalHours > 0)
  .sort((a, b) => b.totalHours - a.totalHours)
  .slice(0, 5); // Top 5

  const CustomTooltip = ({ active, payload, label }) => {
    if (
      !active ||
      !payload ||
      !payload.length ||
      !payload[0] ||
      !payload[0].payload
    ) {
      return null;
    }

    const employee = payload[0].payload;

    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 min-w-48">
        <p className="font-medium text-gray-900 dark:text-gray-100 mb-2">{employee.name}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
          {employee.position} • {employee.department} - {employee.team}
        </p>
        <div className="space-y-1">
          <p className="text-sm text-primary-600 dark:text-primary-400">
            {employee.totalHours}h d'engagement
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {employee.missionsCount} missions ({employee.completedMissions} terminées)
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {employee.certifications} certification{employee.certifications > 1 ? 's' : ''}
          </p>
        </div>
      </div>
    );
  };

  if (employeeStats.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-2">🏆</div>
          <p>Aucun collaborateur à afficher</p>
          <p className="text-sm">Ajustez vos filtres pour voir les données</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Detailed List */}
      <div className="space-y-2">
        {employeeStats.map((employee, index) => (
          <div 
            key={employee.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                index === 0 ? 'bg-yellow-500' : 
                index === 1 ? 'bg-gray-400' : 
                index === 2 ? 'bg-orange-600' : 'bg-primary-600'
              }`}>
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                  {employee.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {employee.department} - {employee.team}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1 text-primary-600 dark:text-primary-400">
                <Clock className="h-3 w-3" />
                <span>{employee.totalHours}h</span>
              </div>
              <div className="flex items-center space-x-1 text-success-600 dark:text-success-400">
                <Target className="h-3 w-3" />
                <span>{employee.missionsCount}</span>
              </div>
              <div className="flex items-center space-x-1 text-warning-600 dark:text-warning-400">
                <Award className="h-3 w-3" />
                <span>{employee.certifications}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopEmployeesChart;