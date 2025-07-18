import React from 'react';
import { useDashboard } from '../../context/DashboardContext';

function DateFilter() {
  const { state, actions } = useDashboard();
  const { filters } = state;

  const handleDateRangeChange = (range) => {
    const now = new Date();
    let startDate = null;
    let endDate = null;

    switch (range) {
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'quarter':
        const quarter = Math.floor(now.getMonth() / 3);
        startDate = new Date(now.getFullYear(), quarter * 3, 1);
        endDate = new Date(now.getFullYear(), quarter * 3 + 3, 0);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31);
        break;
      case 'all':
      default:
        startDate = null;
        endDate = null;
        break;
    }

    actions.setDateRange(range, startDate, endDate);
  };

  const dateRangeOptions = [
    { value: 'all', label: 'Toutes les périodes' },
    { value: 'month', label: 'Ce mois' },
    { value: 'quarter', label: 'Ce trimestre' },
    { value: 'year', label: 'Cette année' }
  ];

  return (
    <div className="space-y-3">
      {/* Quick Date Range Buttons */}
      <div className="grid grid-cols-2 gap-2">
        {dateRangeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleDateRangeChange(option.value)}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors duration-200 ${
              filters.dateRange === option.value
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Custom Date Range */}
      <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
        <label className="filter-label">Période personnalisée</label>
        <div className="space-y-2">
          <input
            type="date"
            value={filters.startDate ? filters.startDate.toISOString().split('T')[0] : ''}
            onChange={(e) => {
              const startDate = e.target.value ? new Date(e.target.value) : null;
              actions.setDateRange('custom', startDate, filters.endDate);
            }}
            className="input-field text-xs"
            placeholder="Date de début"
          />
          <input
            type="date"
            value={filters.endDate ? filters.endDate.toISOString().split('T')[0] : ''}
            onChange={(e) => {
              const endDate = e.target.value ? new Date(e.target.value) : null;
              actions.setDateRange('custom', filters.startDate, endDate);
            }}
            className="input-field text-xs"
            placeholder="Date de fin"
          />
        </div>
      </div>

      {/* Current Selection Info */}
      {filters.dateRange !== 'all' && (
        <div className="bg-primary-50 dark:bg-primary-900/20 p-2 rounded-lg">
          <p className="text-xs text-primary-700 dark:text-primary-300">
            {filters.startDate && filters.endDate ? (
              <>
                Du {filters.startDate.toLocaleDateString('fr-FR')} au{' '}
                {filters.endDate.toLocaleDateString('fr-FR')}
              </>
            ) : (
              dateRangeOptions.find(opt => opt.value === filters.dateRange)?.label
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default DateFilter;