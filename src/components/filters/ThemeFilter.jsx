import React from 'react';
import { useDashboard } from '../../context/DashboardContext';

function ThemeFilter() {
  const { state, actions } = useDashboard();
  const { filters, themes } = state;

  const handleThemeChange = (themeId) => {
    actions.setThemeFilter(themeId);
  };

  return (
    <div className="space-y-3">
      {/* All Themes Option */}
      <button
        onClick={() => handleThemeChange('all')}
        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
          filters.theme === 'all'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        Toutes les thématiques
      </button>

      {/* Individual Themes */}
      <div className="space-y-2">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleThemeChange(theme.name)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 flex items-center space-x-3 ${
              filters.theme === theme.name
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {/* Color indicator */}
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: theme.color }}
            ></div>
            
            <div className="flex-1">
              <div className="font-medium">{theme.name}</div>
              <div className={`text-xs ${
                filters.theme === theme.name 
                  ? 'text-primary-100' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {theme.description}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Theme Statistics */}
      {filters.theme !== 'all' && (
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mt-3">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
            Missions dans cette thématique
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {state.filteredMissions?.filter(mission => mission.theme === filters.theme).length || 0}
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeFilter;