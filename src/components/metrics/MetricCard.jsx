import React from 'react';

function MetricCard({ title, value, unit, icon: Icon, color, description }) {
  const colorClasses = {
    primary: 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20',
    success: 'text-success-600 dark:text-success-400 bg-success-50 dark:bg-success-900/20',
    warning: 'text-warning-600 dark:text-warning-400 bg-warning-50 dark:bg-warning-900/20',
    danger: 'text-danger-600 dark:text-danger-400 bg-danger-50 dark:bg-danger-900/20'
  };

  const iconColorClasses = {
    primary: 'text-primary-600 dark:text-primary-400',
    success: 'text-success-600 dark:text-success-400',
    warning: 'text-warning-600 dark:text-warning-400',
    danger: 'text-danger-600 dark:text-danger-400'
  };

  return (
    <div className="metric-card group hover:scale-105 transition-transform duration-200">
      {/* Icon */}
      <div className={`inline-flex p-3 rounded-lg ${colorClasses[color]} mb-4`}>
        <Icon className={`h-6 w-6 ${iconColorClasses[color]}`} />
      </div>

      {/* Value */}
      <div className="mb-2">
        <div className="flex items-baseline">
          <span className="metric-value">
            {typeof value === 'number' ? value.toLocaleString('fr-FR') : value}
          </span>
          {unit && (
            <span className="text-lg font-medium text-gray-500 dark:text-gray-400 ml-1">
              {unit}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>

      {/* Hover effect indicator */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className={`w-2 h-2 rounded-full ${colorClasses[color]}`}></div>
      </div>
    </div>
  );
}

export default MetricCard;