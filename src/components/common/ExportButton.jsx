import React, { useState } from 'react';
import { Download, FileText, Check } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

function ExportButton() {
  const { state } = useDashboard();
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const exportToCSV = () => {
    setIsExporting(true);

    // Prepare data for export
    const { filteredMissions, filteredEmployees } = state;
    
    // Create CSV content
    const headers = [
      'Mission',
      'Collaborateur',
      'Département',
      'Équipe',
      'Thématique',
      'Heures',
      'Date',
      'Statut',
      'Lieu'
    ];

    const csvData = filteredMissions.map(mission => {
      const employee = filteredEmployees.find(emp => emp.id === mission.employeeId);
      return [
        mission.title,
        employee ? employee.name : 'N/A',
        employee ? employee.department : 'N/A',
        employee ? employee.team : 'N/A',
        mission.theme,
        mission.hours,
        new Date(mission.date).toLocaleDateString('fr-FR'),
        mission.status === 'completed' ? 'Terminée' : 
        mission.status === 'in-progress' ? 'En cours' : 'Planifiée',
        mission.location
      ];
    });

    // Convert to CSV string
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `engagement-citoyen-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Update UI state
    setTimeout(() => {
      setIsExporting(false);
      setExported(true);
      setTimeout(() => setExported(false), 2000);
    }, 1000);
  };

  return (
    <button
      onClick={exportToCSV}
      disabled={isExporting || state.filteredMissions.length === 0}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        exported
          ? 'bg-success-600 text-white'
          : isExporting
          ? 'bg-gray-400 text-white cursor-not-allowed'
          : state.filteredMissions.length === 0
          ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          : 'bg-primary-600 hover:bg-primary-700 text-white'
      }`}
      title={
        state.filteredMissions.length === 0 
          ? 'Aucune donnée à exporter' 
          : 'Exporter les données en CSV'
      }
    >
      {exported ? (
        <>
          <Check className="h-4 w-4" />
          <span className="text-sm">Exporté !</span>
        </>
      ) : isExporting ? (
        <>
          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Export...</span>
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          <span className="text-sm">Exporter CSV</span>
        </>
      )}
    </button>
  );
}

export default ExportButton;