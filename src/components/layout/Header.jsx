import React from 'react';
import { Moon, Sun, Download, Users } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import ExportButton from '../common/ExportButton';

function Header() {
  const { state, actions } = useDashboard();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Dashboard RH
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Engagement Citoyen
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Export Button */}
            <ExportButton />
            
            {/* Dark Mode Toggle */}
            <button
              onClick={actions.toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              title={state.darkMode ? 'Mode clair' : 'Mode sombre'}
            >
              {state.darkMode ? (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>

            {/* User Info */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Admin RH
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;