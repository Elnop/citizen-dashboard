import React from 'react';
import { useDashboard } from '../../context/DashboardContext';

function TeamFilter() {
  const { state, actions } = useDashboard();
  const { filters, departments } = state;

  const handleDepartmentChange = (departmentName) => {
    actions.setDepartmentFilter(departmentName);
  };

  const handleTeamChange = (teamName) => {
    actions.setTeamFilter(teamName);
  };

  const selectedDepartment = departments.find(dept => dept.name === filters.department);
  const availableTeams = selectedDepartment ? selectedDepartment.teams : [];

  return (
    <div className="space-y-4">
      {/* Department Filter */}
      <div>
        <label className="filter-label">Département</label>
        <select
          value={filters.department}
          onChange={(e) => handleDepartmentChange(e.target.value)}
          className="input-field text-sm"
        >
          <option value="all">Tous les départements</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      {/* Team Filter */}
      {filters.department !== 'all' && availableTeams.length > 0 && (
        <div>
          <label className="filter-label">Équipe</label>
          <select
            value={filters.team}
            onChange={(e) => handleTeamChange(e.target.value)}
            className="input-field text-sm"
          >
            <option value="all">Toutes les équipes</option>
            {availableTeams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Department/Team Statistics */}
      <div className="space-y-2">
        {filters.department !== 'all' && (
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              Collaborateurs - {filters.department}
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {state.employees?.filter(emp => emp.department === filters.department).length || 0}
            </div>
          </div>
        )}

        {filters.team !== 'all' && (
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              Collaborateurs - {filters.team}
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {state.employees?.filter(emp => 
                emp.department === filters.department && emp.team === filters.team
              ).length || 0}
            </div>
          </div>
        )}
      </div>

      {/* Quick Department Buttons */}
      <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
        <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
          Accès rapide
        </div>
        <div className="grid grid-cols-2 gap-1">
          {departments.slice(0, 4).map((dept) => (
            <button
              key={dept.id}
              onClick={() => handleDepartmentChange(dept.name)}
              className={`px-2 py-1 text-xs rounded transition-colors duration-200 ${
                filters.department === dept.name
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamFilter;