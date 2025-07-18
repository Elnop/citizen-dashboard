import React from 'react';
import { Calendar, Tag, Building, Users } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import DateFilter from '../filters/DateFilter';
import ThemeFilter from '../filters/ThemeFilter';
import TeamFilter from '../filters/TeamFilter';

function Sidebar() {
  const { state, actions } = useDashboard();

  return (
    <div className="h-screen overflow-y-auto">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Filtres
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Personnalisez votre vue
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-6 p-4">
        {/* Date Filter */}
        <div className="filter-section">
          <div className="flex items-center space-x-2 mb-3">
            <Calendar className="h-4 w-4 text-gray-500" />
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              Période
            </h3>
          </div>
          <DateFilter />
        </div>

        {/* Theme Filter */}
        <div className="filter-section">
          <div className="flex items-center space-x-2 mb-3">
            <Tag className="h-4 w-4 text-gray-500" />
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              Thématique
            </h3>
          </div>
          <ThemeFilter />
        </div>

        {/* Team Filter */}
        <div className="filter-section">
          <div className="flex items-center space-x-2 mb-3">
            <Building className="h-4 w-4 text-gray-500" />
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              Équipe
            </h3>
          </div>
          <TeamFilter />
        </div>

        {/* Quick Stats */}
        <div className="filter-section">
          <div className="flex items-center space-x-2 mb-3">
            <Users className="h-4 w-4 text-gray-500" />
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              Résumé
            </h3>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Missions filtrées
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {state.filteredMissions?.length || 0}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Collaborateurs actifs
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {state.filteredEmployees?.length || 0}
              </div>
            </div>
          </div>
        </div>

        {/* Reset Filters */}
        <div className="pt-4">
          <button
            onClick={() => {
              actions.setFilters({
                dateRange: 'all',
                theme: 'all',
                department: 'all',
                team: 'all',
                startDate: null,
                endDate: null
              });
            }}
            className="w-full btn-secondary text-sm"
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;